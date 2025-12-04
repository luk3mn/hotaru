// src/components/ThemeToggle.tsx
import { Pressable, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, themePreference, setTheme } = useTheme();

  const toggleTheme = () => {
    if (themePreference === 'system') {
      setTheme('light');
    } else if (themePreference === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  return (
    <Pressable 
      onPress={toggleTheme}
      className={`px-4 py-2 rounded-full ${
        theme === 'dark' ? 'bg-dark-icon' : 'bg-light-icon'
      }`}
    >
      <Text className={theme === 'dark' ? 'text-dark-bg' : 'text-light-bg'}>
        {themePreference === 'system' ? '🌓' : theme === 'dark' ? '🌙' : '☀️'}
      </Text>
    </Pressable>
  );
}