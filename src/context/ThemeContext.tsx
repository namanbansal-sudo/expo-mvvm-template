import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, ThemeMode } from '../types/theme';
import { lightTheme, darkTheme } from '../utils/theme';
import { Storage } from '../utils/storage';

const THEME_MODE_KEY = 'theme_mode';

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    loadThemeMode();
  }, []);

  useEffect(() => {
    updateTheme(mode);
  }, [mode]);

  const loadThemeMode = async () => {
    try {
      const storedMode = await Storage.getItem<ThemeMode>(THEME_MODE_KEY);
      if (storedMode) {
        setModeState(storedMode);
      }
    } catch (error) {
      console.error('Error loading theme mode:', error);
    }
  };

  const updateTheme = (newMode: ThemeMode) => {
    let newTheme: Theme;

    if (newMode === 'system') {
      // For now, default to light theme for system
      // In a real app, you'd detect the system theme
      newTheme = lightTheme;
    } else if (newMode === 'dark') {
      newTheme = darkTheme;
    } else {
      newTheme = lightTheme;
    }

    setTheme(newTheme);
  };

  const setMode = async (newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      await Storage.setItem(THEME_MODE_KEY, newMode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const value: ThemeContextType = {
    theme,
    mode,
    setMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
