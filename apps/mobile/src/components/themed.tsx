import { Text, ViewProps, TextProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ThemedView({ className = '', ...props }: ViewProps & { className?: string }) {
  const { theme } = useTheme();
  const themeClasses = theme === 'dark' ? 'bg-dark-base' : 'bg-light-base';
  
  return <SafeAreaView className={`${themeClasses} ${className}`} {...props} />;
}

export function ThemedText({ className = '', ...props }: TextProps & { className?: string }) {
  const { theme } = useTheme();
  const themeClasses = theme === 'dark' ? 'text-dark-text' : 'text-light-text';
  
  return <Text className={`${themeClasses} ${className}`} {...props} />;
}