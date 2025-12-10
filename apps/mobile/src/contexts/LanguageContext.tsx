// contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  i18n, 
  changeLanguage, 
  getCurrentLanguage, 
  availableLanguages, 
  initializeI18n,
  formatCurrency,
  formatDate,
  formatRelativeTime,
} from '../i18n/i18n';

interface LanguageContextType {
  currentLanguage: typeof availableLanguages[0];
  availableLanguages: typeof availableLanguages;
  changeLanguage: (languageCode: string) => Promise<void>;
  t: (key: string, options?: any) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  formatDate: (date: Date | string, format?: 'short' | 'long') => string;
  formatRelativeTime: (date: Date | string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState(availableLanguages[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        await initializeI18n();
        setCurrentLanguage(getCurrentLanguage());
        console.log('✅ Language loaded:', getCurrentLanguage().name);
      } catch (error) {
        console.error('❌ Failed to load language:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLanguage();
  }, []);

  const handleChangeLanguage = async (languageCode: string) => {
    try {
      const success = await changeLanguage(languageCode);
      if (success) {
        setCurrentLanguage(getCurrentLanguage());
        // Force re-render of all components using translations
        forceUpdate(prev => prev + 1);
        console.log('✅ Language changed to:', getCurrentLanguage().name);
      }
    } catch (error) {
      console.error('❌ Failed to change language:', error);
    }
  };

  const t = (key: string, options?: any): string => {
    try {
      return i18n.t(key, options);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    availableLanguages,
    changeLanguage: handleChangeLanguage,
    t,
    formatCurrency,
    formatDate,
    formatRelativeTime,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

/**
 * Hook for translations only (simpler interface)
 */
export const useTranslation = () => {
  const { t } = useLanguage();
  return { t };
};

/**
 * Hook for formatting functions
 */
export const useFormatting = () => {
  const { formatCurrency, formatDate, formatRelativeTime } = useLanguage();
  return { formatCurrency, formatDate, formatRelativeTime };
};