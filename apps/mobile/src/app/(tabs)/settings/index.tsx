import { ThemedText, ThemedView } from '@/components/Themed';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { View, Text, StyleSheet } from 'react-native';

export default function Settings() {

  return (
    <ThemedView className="flex-1 p-4">
      <ThemedText className="text-2xl font-bold mb-4">
        Settings
      </ThemedText>

      <ThemeToggle />
    </ThemedView>
  );
}