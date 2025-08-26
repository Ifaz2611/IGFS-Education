import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { SunIcon, MoonIcon } from './icons';

const SettingsPanel: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    // ✅ Hide on small screens, show on md+ screens
    <div className="hidden md:block fixed top-4 right-6 z-[60]">
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        className="bg-blue-800 text-white p-2.5 rounded-full shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {theme === 'light' ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default SettingsPanel;
