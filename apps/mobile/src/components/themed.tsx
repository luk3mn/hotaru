import { Text, ViewProps, TextProps, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ThemedViewProps extends ViewProps {
  className?: string;
  wrapper?: 'safe-area' | 'view';
}

export function ThemedView({ className = '', wrapper = 'view', ...props }: ThemedViewProps) {
  const { theme } = useTheme();
  const themeClasses = theme === 'dark' ? 'bg-dark-base' : 'bg-light-base';

  const Wrapper = wrapper === 'view' ? View : SafeAreaView;
  
  return <Wrapper className={`${themeClasses} ${className}`} {...props} />;
}

export function ThemedText({ className = '', ...props }: TextProps & { className?: string }) {
  const { theme } = useTheme();
  const themeClasses = theme === 'dark' ? 'text-dark-text' : 'text-light-text';
  
  return <Text className={`${themeClasses} ${className}`} {...props} />;
}