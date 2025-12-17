import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themePreference: Theme;
  setTheme: (theme: Theme) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@hotaru:theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] = useState<Theme>('system');
  const [isLoading, setIsLoading] = useState(true);

  // Carregar tema salvo ao iniciar
  useEffect(() => {
    loadTheme();
  }, []);

  // Calcular tema atual baseado na preferência
  const theme = themePreference === 'system' 
    ? (systemColorScheme || 'light') 
    : themePreference;

  // Carregar tema do AsyncStorage
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemePreference(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar tema no AsyncStorage
  const setTheme = async (newTheme: Theme) => {
    try {
      setThemePreference(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      console.log('✅ Theme saved:', newTheme);
    } catch (error) {
      console.error('❌ Failed to save theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      themePreference,
      setTheme,
      isLoading,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
/**

import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('mocha');
  const theme = getTheme(themeMode);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

*/