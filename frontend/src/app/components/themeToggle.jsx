import { useTheme } from "../context/themeContext";

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-12 h-6 bg-bg-tertiary border border-border-primary
        rounded-full transition-all duration-300 ease-in-out
        hover:bg-bg-secondary hover:border-border-secondary
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Current theme: ${theme}`}
    >
      {/* Toggle Circle */}
      <span
        className={`
          absolute inline-block w-4 h-4 bg-text-primary rounded-full
          transition-transform duration-300 ease-in-out
          ${isDark ? 'transform translate-x-6' : 'transform translate-x-0'}
        `}
      />
      
      {/* Sun Icon */}
      <svg 
        className={`
          absolute left-1 w-3 h-3 text-warning-500
          transition-opacity duration-300
          ${isDark ? 'opacity-0' : 'opacity-100'}
        `}
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
          clipRule="evenodd" 
        />
      </svg>
      
      {/* Moon Icon */}
      <svg 
        className={`
          absolute right-1 w-3 h-3 text-primary-400
          transition-opacity duration-300
          ${isDark ? 'opacity-100' : 'opacity-0'}
        `}
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" 
        />
      </svg>
    </button>
  );
};

export default ThemeToggle;