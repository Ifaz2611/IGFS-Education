import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface AppContextType {
  theme: Theme;
  fontSize: number;
  toggleTheme: () => void;
  setFontSize: (size: number) => void;
  setFontSizePercentage: (percentage: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const BASE_FONT_SIZE = 16; // Corresponds to Tailwind's `text-base`

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [fontSize, setFontSize] = useState<number>(BASE_FONT_SIZE);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedFontSize = localStorage.getItem('fontSize');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    setFontSize(savedFontSize ? parseFloat(savedFontSize) : BASE_FONT_SIZE);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const setFontSizePercentage = (percentage: number) => {
      setFontSize(BASE_FONT_SIZE * (percentage / 100));
  }

  const value = { theme, fontSize, toggleTheme, setFontSize, setFontSizePercentage };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
