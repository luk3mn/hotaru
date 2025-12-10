// i18n/i18n.ts
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Translation files
 */
import en from './locales/en.json';
import pt from './locales/pt.json';

// Create i18n instance
export const i18n = new I18n({
  en,
  pt,
});

// Available languages
export const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
//   { code: 'es', name: 'Español', flag: '🇪🇸' },
//   { code: 'fr', name: 'Français', flag: '🇫🇷' },
//   { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
//   { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

// Storage key
const LANGUAGE_STORAGE_KEY = '@hotaru:language';

/**
 * Initialize i18n
 * - Load saved language preference
 * - Fall back to device language
 * - Default to English
 */
export const initializeI18n = async () => {
  try {
    // Check for saved language preference
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    
    if (savedLanguage) {
      i18n.locale = savedLanguage;
      console.log('📱 Loaded saved language:', savedLanguage);
    } else {
      // Use device language
      const locales = getLocales();
      const deviceLanguage = locales[0]?.languageCode || 'en'; // Get language code without region
      const supportedLanguage = availableLanguages.find(
        lang => lang.code === deviceLanguage
      );
      
      i18n.locale = supportedLanguage ? deviceLanguage : 'en';
      console.log('📱 Using device language:', i18n.locale);
    }
    
    // Enable fallback to English
    i18n.enableFallback = true;
    i18n.defaultLocale = 'en';
    
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    i18n.locale = 'en';
  }
};

/**
 * Change language
 */
export const changeLanguage = async (languageCode: string) => {
  try {
    i18n.locale = languageCode;
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    console.log('✅ Language changed to:', languageCode);
    return true;
  } catch (error) {
    console.error('Failed to change language:', error);
    return false;
  }
};

/**
 * Get current language
 */
export const getCurrentLanguage = () => {
  return availableLanguages.find(lang => lang.code === i18n.locale) || availableLanguages[0];
};

/**
 * Translate function with type safety
 */
export const t = (key: string, options?: any): string => {
  return i18n.t(key, options);
};

/**
 * Format currency with locale
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  const locale = i18n.locale === 'pt' ? 'pt-BR' : 
                 i18n.locale === 'es' ? 'es-ES' :
                 i18n.locale === 'fr' ? 'fr-FR' :
                 i18n.locale === 'de' ? 'de-DE' :
                 i18n.locale === 'ja' ? 'ja-JP' : 'en-US';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format date with locale
 */
export const formatDate = (date: Date | string, format: 'short' | 'long' = 'short'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const locale = i18n.locale === 'pt' ? 'pt-BR' : 
                 i18n.locale === 'es' ? 'es-ES' :
                 i18n.locale === 'fr' ? 'fr-FR' :
                 i18n.locale === 'de' ? 'de-DE' :
                 i18n.locale === 'ja' ? 'ja-JP' : 'en-US';
  
  const options: Intl.DateTimeFormatOptions = format === 'long' 
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'short', day: 'numeric' };
  
  return new Intl.DateTimeFormat(locale, options).format(d);
};

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return t('time.justNow');
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return t('time.minutesAgo', { count: minutes });
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return t('time.hoursAgo', { count: hours });
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return t('time.daysAgo', { count: days });
  } else {
    return formatDate(d);
  }
};