# middleware/sentiment_analysis.py
# ------------------------------------------------------------
# Fast, CPU-friendly sentiment with batching + INT8 quantization.
# Works with 3-class (neg/neu/pos) and 5-class (★1..★5) models.
# Detects non-English (optimized for Urdu) and translates to English
# for display and/or classification—without any online API calls.
# Produces per-tweet results AND a group-level summary with trend.
#
# Requires: torch, transformers, sentencepiece
# Optional (better lang detect): langdetect
# ------------------------------------------------------------

import os
import re
import json
from typing import List, Dict, Any, Tuple

import torch
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    MarianMTModel,
    MarianTokenizer,
)

# =========================
# Runtime / tuning knobs
# =========================
os.environ.setdefault("TOKENIZERS_PARALLELISM", "true")
torch.set_num_threads(max(1, os.cpu_count() or 1))  # fully use CPU cores

# Choose your model here:
# - 3-class tweets: "cardiffnlp/twitter-xlm-roberta-base-sentiment"
# - 5-class stars : "nlptown/bert-base-multilingual-uncased-sentiment"
MODEL_NAME = "nlptown/bert-base-multilingual-uncased-sentiment"

# Throughput knobs
MAX_LEN = 96               # tweets fit comfortably; smaller => faster
BATCH_SIZE = 128           # increase to 256 on strong CPUs
TREND_THRESHOLD = 0.05     # sensitivity of trend detection

# Translation knobs
TRANSLATE_FOR_DISPLAY = True            # add English in output
CLASSIFY_ON_TRANSLATED = False          # set True to run sentiment on English translation
TRANSLATE_LANG_WHITELIST = {"ur"}       # keep fast and focused; main data is Urdu

# Stable 3-class names we expose downstream
LABELS = ["negative", "neutral", "positive"]

# =========================
# Load sentiment model/tokenizer
# =========================
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)
_model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
_model.eval()

# Dynamic INT8 quantization on CPU linear layers for speed
try:
    _model = torch.quantization.quantize_dynamic(_model, {torch.nn.Linear}, dtype=torch.qint8)
except Exception:
    pass

# 3 or 5 depending on the chosen model
NUM_LABELS = int(getattr(_model.config, "num_labels", 3))

# =========================
# Urdu/English detection
# =========================
# Optional, more accurate detection if installed
try:
    from langdetect import detect as _detect_lang
except Exception:
    _detect_lang = None

_ARABIC_BLOCK = re.compile(r"[\u0600-\u06FF]")  # covers Arabic script used by Urdu

def _quick_detect_lang(text: str) -> str:
    """
    Very fast heuristic:
      - if Arabic-script chars present -> 'ur' (optimized for your dataset)
      - else if langdetect available -> use it
      - else ASCII ratio heuristic -> 'en' or 'ur'
    """
    if not text:
        return "en"
    if _ARABIC_BLOCK.search(text):
        return "ur"  # treat Arabic-script as Urdu for this project
    if _detect_lang is not None:
        try:
            return _detect_lang(text) or "en"
        except Exception:
            return "en"
    # Fallback: ASCII ratio
    ascii_ratio = sum(1 for c in text if c.isascii()) / max(1, len(text))
    return "en" if ascii_ratio > 0.8 else "ur"

def _detect_langs_batch(texts: List[str]) -> List[str]:
    return [_quick_detect_lang(t) for t in texts]

# =========================
# Offline translation (Marian MT, batched and cached)
# =========================
_MARIAN_MODELS = {
    "ur": "Helsinki-NLP/opus-mt-ur-en",
    # Add more as needed, but keep it lean for speed:
    # "hi": "Helsinki-NLP/opus-mt-hi-en",
    # "ar": "Helsinki-NLP/opus-mt-ar-en",
}
_TRANSLATORS: Dict[str, Tuple[MarianTokenizer, MarianMTModel]] = {}

def _get_translator(lang: str):
    if lang not in _MARIAN_MODELS:
        return None
    if lang in _TRANSLATORS:
        return _TRANSLATORS[lang]
    name = _MARIAN_MODELS[lang]
    tok = MarianTokenizer.from_pretrained(name)
    mdl = MarianMTModel.from_pretrained(name)
    mdl.eval()
    try:
        mdl = torch.quantization.quantize_dynamic(mdl, {torch.nn.Linear}, dtype=torch.qint8)
    except Exception:
        pass
    _TRANSLATORS[lang] = (tok, mdl)
    return _TRANSLATORS[lang]

def _batch_translate(texts: List[str], lang: str, max_length: int = 192, batch_size: int = 64) -> List[str]:
    pair = _get_translator(lang)
    if pair is None:
        return texts
    tok, mdl = pair
    out = [""] * len(texts)
    with torch.inference_mode():
        for i in range(0, len(texts), batch_size):
            chunk = texts[i:i + batch_size]
            inputs = tok(chunk, return_tensors="pt", padding=True, truncation=True, max_length=max_length)
            gen = mdl.generate(**inputs, max_length=max_length, num_beams=2, no_repeat_ngram_size=3)
            decoded = tok.batch_decode(gen, skip_special_tokens=True)
            for j, d in enumerate(decoded):
                out[i + j] = d
    return out

def _translate_for_display(texts: List[str], langs: List[str]) -> List[str]:
    if not TRANSLATE_FOR_DISPLAY:
        return texts
    result = list(texts)
    # Group indices per language (whitelisted only)
    buckets: Dict[str, List[int]] = {}
    for idx, lg in enumerate(langs):
        lg = (lg or "en").lower()
        if lg != "en" and (lg.split("-")[0] in TRANSLATE_LANG_WHITELIST):
            buckets.setdefault(lg.split("-")[0], []).append(idx)
    for lg, idxs in buckets.items():
        batch = [texts[i] for i in idxs]
        translated = _batch_translate(batch, lg)
        for i, t in zip(idxs, translated):
            result[i] = t
    return result

# =========================
# Text cleaning
# =========================
def preprocess_text(text: str) -> str:
    """
    Lightweight tweet cleaning to reduce tokenization/inference time.
    """
    if not text:
        return ""
    text = text.replace("\n", " ")
    text = re.sub(r"http\S+|www\S+", "", text)   # URLs
    text = re.sub(r"@\w+", "", text)             # mentions
    text = re.sub(r"#\w+", "", text)             # hashtags
    text = re.sub(r"\s+", " ", text).strip()
    return text

# =========================
# Logits → 3-class scores
# =========================
def _probrow_to_tri_scores(prob_row: torch.Tensor) -> List[float]:
    """
    Map model probabilities to [neg, neu, pos].
    - 3-class: pass-through.
    - 5-class (★1..★5): (1★+2★)=neg, 3★=neu, (4★+5★)=pos.
    - Other sizes: coarse thirds.
    """
    if NUM_LABELS == 3:
        v = prob_row.tolist()
        return [float(v[0]), float(v[1]), float(v[2])]
    if NUM_LABELS == 5:
        neg = float(prob_row[0] + prob_row[1])
        neu = float(prob_row[2])
        pos = float(prob_row[3] + prob_row[4])
        return [neg, neu, pos]
    v = prob_row.tolist()
    k = len(v)
    third = max(1, k // 3)
    neg = sum(v[:third])
    neu = sum(v[third:2 * third])
    pos = sum(v[2 * third:])
    return [float(neg), float(neu), float(pos)]

# =========================
# Batched sentiment
# =========================
def sentiment_analysis_batch(texts: List[str], batch_size: int = BATCH_SIZE) -> List[Dict[str, Any]]:
    """
    Runs sentiment in batches. If non-English (esp. Urdu), adds English translation.
    If CLASSIFY_ON_TRANSLATED = True, runs classification on the English version.
    """
    cleaned = [preprocess_text(t) for t in texts]
    langs = _detect_langs_batch(cleaned)

    # English text for output display (and optionally for classification)
    text_en = _translate_for_display(cleaned, langs)

    # Choose input for sentiment
    classify_texts = text_en if CLASSIFY_ON_TRANSLATED else cleaned

    results: List[Dict[str, Any]] = [{} for _ in cleaned]
    with torch.inference_mode():
        for i in range(0, len(classify_texts), batch_size):
            chunk = classify_texts[i:i + batch_size]
            nonempty_idx = [j for j, x in enumerate(chunk) if x]
            if not nonempty_idx:
                for j in range(len(chunk)):
                    g = i + j
                    results[g] = {
                        "text_original": cleaned[g],
                        "text": text_en[g],        # English (or original if en)
                        "lang": langs[g],
                        "label": "neutral",
                        "confidence": 0.0,
                        "scores": {lab: 0.0 for lab in LABELS},
                    }
                continue

            inputs = tokenizer(
                [chunk[j] for j in nonempty_idx],
                return_tensors="pt",
                padding=True,
                truncation=True,
                max_length=MAX_LEN,
            )
            outputs = _model(**inputs)
            probs = torch.softmax(outputs.logits, dim=-1)

            for row, j in enumerate(nonempty_idx):
                g = i + j
                tri = _probrow_to_tri_scores(probs[row])
                pred_idx = int(max(range(3), key=lambda k: tri[k]))
                results[g] = {
                    "text_original": cleaned[g],
                    "text": text_en[g],     # always English here if translated
                    "lang": langs[g],
                    "label": LABELS[pred_idx],
                    "confidence": float(tri[pred_idx]),
                    "scores": {lab: float(s) for lab, s in zip(LABELS, tri)},
                }

            # Fill empties
            empty_idx = set(range(len(chunk))) - set(nonempty_idx)
            for j in empty_idx:
                g = i + j
                results[g] = {
                    "text_original": cleaned[g],
                    "text": text_en[g],
                    "lang": langs[g],
                    "label": "neutral",
                    "confidence": 0.0,
                    "scores": {lab: 0.0 for lab in LABELS},
                }
    return results

# =========================
# Group summary + trend
# =========================
def _compute_trend(idx_series: List[float], threshold: float = TREND_THRESHOLD) -> Dict[str, Any]:
    m = len(idx_series)
    if m < 3:
        return {"direction": "neutral", "delta": 0.0}
    if m >= 6:
        k = max(1, m // 3)
        first = idx_series[:k]
        last = idx_series[-k:]
    else:
        k = max(1, m // 2)
        first = idx_series[:k]
        last = idx_series[-k:]
    first_avg = sum(first) / len(first)
    last_avg = sum(last) / len(last)
    delta = last_avg - first_avg
    if   delta > threshold:  direction = "positive"
    elif delta < -threshold: direction = "negative"
    else:                    direction = "neutral"
    return {"direction": direction, "delta": float(delta)}

def summarize_group(items: List[Dict[str, Any]]) -> Dict[str, Any]:
    total = {"negative": 0.0, "neutral": 0.0, "positive": 0.0}
    counts = {"negative": 0, "neutral": 0, "positive": 0}
    idx_series: List[float] = []
    n = 0
    for it in items:
        an = it.get("analysis", {})
        sc = an.get("scores")
        if not sc:
            continue
        n += 1
        for k in total.keys():
            total[k] += float(sc.get(k, 0.0))
        lbl = an.get("label")
        if lbl in counts:
            counts[lbl] += 1
        idx_series.append(float(sc.get("positive", 0.0)) - float(sc.get("negative", 0.0)))
    if n == 0:
        return {
            "overall": {"label": "neutral", "confidence": 0.0, "avg_scores": total},
            "counts": counts,
            "n_tweets": 0,
            "trend": {"direction": "neutral", "delta": 0.0},
        }
    avg_scores = {k: v / n for k, v in total.items()}
    overall_label = max(avg_scores, key=avg_scores.get)
    overall_conf = float(avg_scores[overall_label])
    trend = _compute_trend(idx_series, TREND_THRESHOLD)
    return {
        "overall": {"label": overall_label, "confidence": overall_conf, "avg_scores": avg_scores},
        "counts": counts,
        "n_tweets": n,
        "trend": trend,
    }

# =========================
# JSON I/O entrypoint
# =========================
def analyze_tweets(input_file: str, output_file: str):
    """
    Reads tweets from input_file (array of objects with tweetDetails.text & tweet_id),
    runs batched sentiment (with Urdu→English translation for display),
    computes summary, and writes a payload:
      {
        "summary": {...},
        "results": [
          {"tweet_id": ..., "analysis": {
              "text_original": "...",   # cleaned original
              "text": "...",            # English (translated if needed)
              "lang": "ur"|"en"|...,
              "label": "negative|neutral|positive",
              "confidence": 0.xx,
              "scores": {...}
          }},
          ...
        ]
      }
    """
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    tweet_ids: List[Any] = []
    texts: List[str] = []
    for obj in data:
        tweet = obj.get("tweetDetails", {})
        tweet_ids.append(tweet.get("tweet_id"))
        texts.append(tweet.get("text", ""))

    batch_results = sentiment_analysis_batch(texts, batch_size=BATCH_SIZE)

    items = [{"tweet_id": tid, "analysis": res} for tid, res in zip(tweet_ids, batch_results)]
    summary = summarize_group(items)
    payload = {"summary": summary, "results": items}

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    return payload
