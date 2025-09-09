from flask import Flask, jsonify
from middleware.sentiment_analysis import analyze_tweets

app = Flask(__name__)

@app.route('/hello/<name>')
def hello_name(name):
    return f'Hello {name}!'

@app.route("/analyze_tweets", methods=["GET"])
def analyze_tweets_route():
    input_file = "tweets.json"
    output_file = "results.json"

    try:
        results = analyze_tweets(input_file, output_file)
    except FileNotFoundError:
        return jsonify({"error": f"{input_file} not found"}), 404

    return jsonify({
        "status": "✅ Sentiment analysis complete",
        "input_file": input_file,
        "output_file": output_file,
        "processed_tweets": len(results)
    })

if __name__ == '__main__':
    # For real use, run via gunicorn/uvicorn workers; Flask dev server is single-process.
    app.run(debug=True)
