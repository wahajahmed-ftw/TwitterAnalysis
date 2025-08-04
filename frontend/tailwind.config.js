module.exports = {
content: [
  './src/**/*.{js,jsx,ts,tsx}',
  './pages/**/*.{js,jsx,ts,tsx}',
  './components/**/*.{js,jsx,ts,tsx}',
  './app/**/*.{js,jsx,ts,tsx}',
  './public/index.html',
],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // ===============================================
        // PRIMARY BRAND COLORS
        // ===============================================
        primary: {
          50: 'rgb(var(--primary-50) / <alpha-value>)',
          100: 'rgb(var(--primary-100) / <alpha-value>)',
          200: 'rgb(var(--primary-200) / <alpha-value>)',
          300: 'rgb(var(--primary-300) / <alpha-value>)',
          400: 'rgb(var(--primary-400) / <alpha-value>)',
          500: 'rgb(var(--primary-500) / <alpha-value>)',
          600: 'rgb(var(--primary-600) / <alpha-value>)',
          700: 'rgb(var(--primary-700) / <alpha-value>)',
          800: 'rgb(var(--primary-800) / <alpha-value>)',
          900: 'rgb(var(--primary-900) / <alpha-value>)',
          950: 'rgb(var(--primary-950) / <alpha-value>)',
        },

        // ===============================================
        // SECONDARY COLORS
        // ===============================================
        secondary: {
          50: 'rgb(var(--secondary-50) / <alpha-value>)',
          100: 'rgb(var(--secondary-100) / <alpha-value>)',
          200: 'rgb(var(--secondary-200) / <alpha-value>)',
          300: 'rgb(var(--secondary-300) / <alpha-value>)',
          400: 'rgb(var(--secondary-400) / <alpha-value>)',
          500: 'rgb(var(--secondary-500) / <alpha-value>)',
          600: 'rgb(var(--secondary-600) / <alpha-value>)',
          700: 'rgb(var(--secondary-700) / <alpha-value>)',
          800: 'rgb(var(--secondary-800) / <alpha-value>)',
          900: 'rgb(var(--secondary-900) / <alpha-value>)',
          950: 'rgb(var(--secondary-950) / <alpha-value>)',
        },

        // ===============================================
        // STATUS COLORS
        // ===============================================
        success: {
          50: 'rgb(var(--success-50) / <alpha-value>)',
          100: 'rgb(var(--success-100) / <alpha-value>)',
          200: 'rgb(var(--success-200) / <alpha-value>)',
          300: 'rgb(var(--success-300) / <alpha-value>)',
          400: 'rgb(var(--success-400) / <alpha-value>)',
          500: 'rgb(var(--success-500) / <alpha-value>)',
          600: 'rgb(var(--success-600) / <alpha-value>)',
          700: 'rgb(var(--success-700) / <alpha-value>)',
          800: 'rgb(var(--success-800) / <alpha-value>)',
          900: 'rgb(var(--success-900) / <alpha-value>)',
        },
        warning: {
          50: 'rgb(var(--warning-50) / <alpha-value>)',
          100: 'rgb(var(--warning-100) / <alpha-value>)',
          200: 'rgb(var(--warning-200) / <alpha-value>)',
          300: 'rgb(var(--warning-300) / <alpha-value>)',
          400: 'rgb(var(--warning-400) / <alpha-value>)',
          500: 'rgb(var(--warning-500) / <alpha-value>)',
          600: 'rgb(var(--warning-600) / <alpha-value>)',
          700: 'rgb(var(--warning-700) / <alpha-value>)',
          800: 'rgb(var(--warning-800) / <alpha-value>)',
          900: 'rgb(var(--warning-900) / <alpha-value>)',
        },
        error: {
          50: 'rgb(var(--error-50) / <alpha-value>)',
          100: 'rgb(var(--error-100) / <alpha-value>)',
          200: 'rgb(var(--error-200) / <alpha-value>)',
          300: 'rgb(var(--error-300) / <alpha-value>)',
          400: 'rgb(var(--error-400) / <alpha-value>)',
          500: 'rgb(var(--error-500) / <alpha-value>)',
          600: 'rgb(var(--error-600) / <alpha-value>)',
          700: 'rgb(var(--error-700) / <alpha-value>)',
          800: 'rgb(var(--error-800) / <alpha-value>)',
          900: 'rgb(var(--error-900) / <alpha-value>)',
        },
        info: {
          50: 'rgb(var(--info-50) / <alpha-value>)',
          100: 'rgb(var(--info-100) / <alpha-value>)',
          200: 'rgb(var(--info-200) / <alpha-value>)',
          300: 'rgb(var(--info-300) / <alpha-value>)',
          400: 'rgb(var(--info-400) / <alpha-value>)',
          500: 'rgb(var(--info-500) / <alpha-value>)',
          600: 'rgb(var(--info-600) / <alpha-value>)',
          700: 'rgb(var(--info-700) / <alpha-value>)',
          800: 'rgb(var(--info-800) / <alpha-value>)',
          900: 'rgb(var(--info-900) / <alpha-value>)',
        },

        // ===============================================
        // NEUTRAL COLORS
        // ===============================================
        neutral: {
          50: 'rgb(var(--neutral-50) / <alpha-value>)',
          100: 'rgb(var(--neutral-100) / <alpha-value>)',
          200: 'rgb(var(--neutral-200) / <alpha-value>)',
          300: 'rgb(var(--neutral-300) / <alpha-value>)',
          400: 'rgb(var(--neutral-400) / <alpha-value>)',
          500: 'rgb(var(--neutral-500) / <alpha-value>)',
          600: 'rgb(var(--neutral-600) / <alpha-value>)',
          700: 'rgb(var(--neutral-700) / <alpha-value>)',
          800: 'rgb(var(--neutral-800) / <alpha-value>)',
          900: 'rgb(var(--neutral-900) / <alpha-value>)',
          950: 'rgb(var(--neutral-950) / <alpha-value>)',
        },

        // ===============================================
        // SEMANTIC COLORS (Theme-aware)
        // ===============================================
        bg: {
          primary: 'rgb(var(--bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--bg-tertiary) / <alpha-value>)',
          card: 'rgb(var(--bg-card) / <alpha-value>)',
          sidebar: 'rgb(var(--bg-sidebar) / <alpha-value>)',
          header: 'rgb(var(--bg-header) / <alpha-value>)',
          modal: 'rgb(var(--bg-modal) / <alpha-value>)',
          overlay: 'rgb(var(--bg-overlay) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--text-tertiary) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
          accent: 'rgb(var(--text-accent) / <alpha-value>)',
          inverse: 'rgb(var(--text-inverse) / <alpha-value>)',
        },
        border: {
          primary: 'rgb(var(--border-primary) / <alpha-value>)',
          secondary: 'rgb(var(--border-secondary) / <alpha-value>)',
          accent: 'rgb(var(--border-accent) / <alpha-value>)',
          focus: 'rgb(var(--border-focus) / <alpha-value>)',
        },

        // ===============================================
        // CHART COLORS (Analytics)
        // ===============================================
        chart: {
          1: 'rgb(var(--chart-1) / <alpha-value>)',
          2: 'rgb(var(--chart-2) / <alpha-value>)',
          3: 'rgb(var(--chart-3) / <alpha-value>)',
          4: 'rgb(var(--chart-4) / <alpha-value>)',
          5: 'rgb(var(--chart-5) / <alpha-value>)',
          6: 'rgb(var(--chart-6) / <alpha-value>)',
          7: 'rgb(var(--chart-7) / <alpha-value>)',
          8: 'rgb(var(--chart-8) / <alpha-value>)',
          9: 'rgb(var(--chart-9) / <alpha-value>)',
          10: 'rgb(var(--chart-10) / <alpha-value>)',
        },

        // ===============================================
        // SOCIAL MEDIA COLORS
        // ===============================================
        social: {
          twitter: 'rgb(var(--social-twitter) / <alpha-value>)',
          verified: 'rgb(var(--social-verified) / <alpha-value>)',
          bot: 'rgb(var(--social-bot) / <alpha-value>)',
          influencer: 'rgb(var(--social-influencer) / <alpha-value>)',
        },

        // ===============================================
        // SENTIMENT ANALYSIS COLORS
        // ===============================================
        sentiment: {
          positive: 'rgb(var(--sentiment-positive) / <alpha-value>)',
          negative: 'rgb(var(--sentiment-negative) / <alpha-value>)',
          neutral: 'rgb(var(--sentiment-neutral) / <alpha-value>)',
        },
      },

      // ===============================================
      // TYPOGRAPHY
      // ===============================================
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', 'monospace'],
      },

      // ===============================================
      // SPACING
      // ===============================================
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // ===============================================
      // BOX SHADOWS (Using CSS variables)
      // ===============================================
      boxShadow: {
        'sm': 'rgba(var(--shadow-color), var(--shadow-opacity-sm)) 0px 1px 2px 0px',
        'DEFAULT': 'rgba(var(--shadow-color), var(--shadow-opacity-base)) 0px 1px 3px 0px, rgba(var(--shadow-color), var(--shadow-opacity-base)) 0px 1px 2px -1px',
        'md': 'rgba(var(--shadow-color), var(--shadow-opacity-md)) 0px 4px 6px -1px, rgba(var(--shadow-color), var(--shadow-opacity-md)) 0px 2px 4px -2px',
        'lg': 'rgba(var(--shadow-color), var(--shadow-opacity-lg)) 0px 10px 15px -3px, rgba(var(--shadow-color), var(--shadow-opacity-lg)) 0px 4px 6px -4px',
        'xl': 'rgba(var(--shadow-color), var(--shadow-opacity-xl)) 0px 20px 25px -5px, rgba(var(--shadow-color), var(--shadow-opacity-xl)) 0px 8px 10px -6px',
        '2xl': 'rgba(var(--shadow-color), 0.5) 0px 25px 50px -12px',
        'inner': 'rgba(var(--shadow-color), var(--shadow-opacity-base)) 0px 2px 4px 0px inset',
        
        // Custom shadows for analytics
        'card': 'rgba(var(--shadow-color), var(--shadow-opacity-sm)) 0px 1px 3px 0px, rgba(var(--shadow-color), var(--shadow-opacity-sm)) 0px 1px 2px -1px',
        'card-hover': 'rgba(var(--shadow-color), var(--shadow-opacity-md)) 0px 4px 6px -1px, rgba(var(--shadow-color), var(--shadow-opacity-md)) 0px 2px 4px -2px',
        'dashboard': 'rgba(var(--shadow-color), var(--shadow-opacity-lg)) 0px 10px 15px -3px, rgba(var(--shadow-color), var(--shadow-opacity-lg)) 0px 4px 6px -4px',
        'modal': 'rgba(var(--shadow-color), 0.4) 0px 20px 25px -5px, rgba(var(--shadow-color), 0.4) 0px 8px 10px -6px',
        
        // Glow effects for focus states
        'glow-primary': '0 0 0 1px rgb(var(--primary-500)), 0 0 20px rgba(var(--primary-500), 0.3)',
        'glow-secondary': '0 0 0 1px rgb(var(--secondary-500)), 0 0 20px rgba(var(--secondary-500), 0.3)',
        'glow-success': '0 0 0 1px rgb(var(--success-500)), 0 0 20px rgba(var(--success-500), 0.3)',
        'glow-error': '0 0 0 1px rgb(var(--error-500)), 0 0 20px rgba(var(--error-500), 0.3)',
      },

      // ===============================================
      // BORDER RADIUS
      // ===============================================
      borderRadius: {
        'xs': '0.125rem',  // 2px
        'sm': '0.25rem',   // 4px
        'DEFAULT': '0.375rem', // 6px
        'md': '0.375rem',  // 6px
        'lg': '0.5rem',    // 8px
        'xl': '0.75rem',   // 12px
        '2xl': '1rem',     // 16px
        '3xl': '1.5rem',   // 24px
      },

      // ===============================================
      // ANIMATIONS
      // ===============================================
      animation: {
        // Fade animations
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-out': 'fadeOut 0.5s ease-out forwards',
        
        // Slide animations
        'slide-in-up': 'slideInUp 0.3s ease-out forwards',
        'slide-in-down': 'slideInDown 0.3s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        
        // Scale animations
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'scale-out': 'scaleOut 0.2s ease-out forwards',
        
        // Custom analytics animations
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        
        // Chart animations
        'chart-fade-in': 'chartFadeIn 1s ease-out forwards',
        'chart-slide-up': 'chartSlideUp 0.8s ease-out forwards',
      },

      // ===============================================
      // KEYFRAMES
      // ===============================================
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        chartFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        chartSlideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },

      // ===============================================
      // BACKDROP BLUR
      // ===============================================
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px',
      },

      // ===============================================
      // GRADIENT STOPS
      // ===============================================
      gradientColorStops: {
        // Primary gradients
        'primary-gradient-start': 'rgb(var(--primary-500))',
        'primary-gradient-end': 'rgb(var(--primary-700))',
        
        // Secondary gradients
        'secondary-gradient-start': 'rgb(var(--secondary-500))',
        'secondary-gradient-end': 'rgb(var(--secondary-700))',
        
        // Analytics gradients
        'analytics-gradient-start': 'rgb(var(--primary-500))',
        'analytics-gradient-end': 'rgb(var(--secondary-500))',
        
        // Sentiment gradients
        'positive-gradient-start': 'rgb(var(--sentiment-positive))',
        'positive-gradient-end': 'rgb(var(--success-600))',
        
        'negative-gradient-start': 'rgb(var(--sentiment-negative))',
        'negative-gradient-end': 'rgb(var(--error-600))',
      },

      // ===============================================
      // SCREENS (Responsive breakpoints)
      // ===============================================
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // ===============================================
      // Z-INDEX
      // ===============================================
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },
    },
  },
  plugins: [
    // Essential Tailwind plugins
    require('@tailwindcss/forms')({
      strategy: 'class', // Use form classes instead of base styles
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    
    // Custom plugin for additional utilities
    function({ addUtilities, addComponents, theme }) {
      // Custom utilities
      addUtilities({
        // Scrollbar utilities
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgb(var(--bg-tertiary))',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(var(--border-secondary))',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgb(var(--text-muted))',
          },
        },
        
        // Glass morphism utilities
        '.glass': {
          backgroundColor: 'rgba(var(--bg-card), 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(var(--border-primary), 0.2)',
        },
        '.glass-dark': {
          backgroundColor: 'rgba(var(--bg-card), 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(var(--border-primary), 0.1)',
        },
      });

      // Custom components
      addComponents({
        // Analytics card component
        '.analytics-card': {
          backgroundColor: 'rgb(var(--bg-card))',
          border: '1px solid rgb(var(--border-primary))',
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.card'),
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: theme('boxShadow.card-hover'),
            borderColor: 'rgb(var(--border-accent))',
          },
        },
        
        // Button variants
        '.btn-primary': {
          backgroundColor: 'rgb(var(--primary-600))',
          color: 'rgb(var(--text-inverse))',
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.sm'),
          border: '1px solid rgb(var(--primary-600))',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgb(var(--primary-700))',
            borderColor: 'rgb(var(--primary-700))',
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.md'),
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:disabled': {
            opacity: '0.6',
            cursor: 'not-allowed',
            '&:hover': {
              backgroundColor: 'rgb(var(--primary-600))',
              transform: 'none',
            },
          },
        },
        
        '.btn-secondary': {
          backgroundColor: 'rgb(var(--bg-secondary))',
          color: 'rgb(var(--text-primary))',
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.sm'),
          border: '1px solid rgb(var(--border-primary))',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgb(var(--bg-tertiary))',
            borderColor: 'rgb(var(--border-secondary))',
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.md'),
          },
        },
        
        // Form input
        '.form-input': {
          width: '100%',
          padding: `${theme('spacing.2')} ${theme('spacing.3')}`,
          backgroundColor: 'rgb(var(--bg-secondary))',
          border: '1px solid rgb(var(--border-primary))',
          borderRadius: theme('borderRadius.md'),
          fontSize: theme('fontSize.sm'),
          color: 'rgb(var(--text-primary))',
          transition: 'all 0.2s ease',
          '&:focus': {
            outline: 'none',
            borderColor: 'rgb(var(--border-focus))',
            boxShadow: '0 0 0 3px rgba(var(--primary-500), 0.1)',
          },
          '&::placeholder': {
            color: 'rgb(var(--text-muted))',
          },
        },
      });
    },
  ],
}

/*
===============================================
USAGE EXAMPLES:

Theme Toggle (React Context):
```jsx
const { theme, toggleTheme } = useTheme();

// Toggle between light and dark
<button onClick={toggleTheme} className="btn-primary">
  {theme === 'dark' ? '☀️' : '🌙'} Toggle Theme
</button>
```

Analytics Dashboard:
```jsx
<div className="bg-bg-primary min-h-screen p-6">
  <div className="analytics-card">
    <h3 className="text-text-primary font-semibold mb-4">Tweet Analytics</h3>
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-sentiment-positive">1.2K</div>
        <div className="text-text-tertiary text-sm">Positive</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-sentiment-negative">342</div>
        <div className="text-text-tertiary text-sm">Negative</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-sentiment-neutral">891</div>
        <div className="text-text-tertiary text-sm">Neutral</div>
      </div>
    </div>
  </div>
</div>
```

Chart Colors:
```jsx
<div className="w-full h-64 bg-chart-1"></div>
<div className="w-full h-64 bg-chart-2"></div>
<div className="w-full h-64 bg-chart-3"></div>
```

Social Media Elements:
```jsx
<div className="flex items-center gap-2">
  <div className="w-3 h-3 bg-social-twitter rounded-full"></div>
  <span className="text-text-secondary">Twitter Verified</span>
</div>
```

Status Badges:
```jsx
<span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-700">
  Active Campaign
</span>
<span className="px-2 py-1 text-xs font-medium rounded-full bg-error-100 text-error-700">
  Bot Detected
</span>
```

Form Elements:
```jsx
<input 
  type="search"
  placeholder="Search tweets..."
  className="form-input"
/>
```

Navigation:
```jsx
<nav className="bg-bg-header border-b border-border-primary">
  <div className="flex items-center justify-between px-6 py-4">
    <h1 className="text-xl font-bold text-text-primary">OSINT Analyzer</h1>
    <button className="btn-secondary">Settings</button>
  </div>
</nav>
```

Sidebar:
```jsx
<aside className="bg-bg-sidebar border-r border-border-primary w-64">
  <div className="p-4 space-y-2">
    <a className="block px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-md transition-colors">
      Dashboard
    </a>
  </div>
</aside>
```
===============================================
*/