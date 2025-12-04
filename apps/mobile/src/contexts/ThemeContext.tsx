// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react'
import { useColorScheme } from 'react-native'

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themePreference: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] = useState<Theme>('system');

  const theme = themePreference === 'system' 
    ? (systemColorScheme || 'light') 
    : themePreference;

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      themePreference,
      setTheme: setThemePreference 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};