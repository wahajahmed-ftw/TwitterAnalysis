import { useTheme } from "../context/themeContext";

const ThemeSelector = () => {
  const { theme, setLightTheme, setDarkTheme } = useTheme();

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      icon: '☀️',
      description: 'Clean and bright interface',
      preview: 'bg-white border-gray-200',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: '🌙',
      description: 'Easy on the eyes',
      preview: 'bg-gray-900 border-gray-700',
    },
  ];

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'light') {
      setLightTheme();
    } else if (newTheme === 'dark') {
      setDarkTheme();
    }
  };

  return (
    <div className="bg-bg-card border border-border-primary rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Choose Theme
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleThemeChange(option.value)}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-200
              hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500
              ${theme === option.value
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-border-primary bg-bg-secondary text-text-secondary hover:border-border-accent'
              }
            `}
          >
            {/* Selection indicator */}
            {theme === option.value && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            <div className="text-center">
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium mb-1">{option.label}</div>
              <div className="text-sm opacity-70">{option.description}</div>
            </div>
            
            {/* Theme preview */}
            <div className={`
              mt-3 h-8 rounded border-2 ${option.preview}
              flex items-center justify-center text-xs font-medium
            `}>
              Preview
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export { ThemeSelector };
