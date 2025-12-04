import { ThemedText, ThemedView } from '@/components/Themed';
import { useTheme } from '@/contexts/ThemeContext';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <ThemedView className="flex-1 p-4">
      <ThemedText className="text-2xl font-bold mb-4">
        Welcome to Zoratria
      </ThemedText>

      {/* Card with mint background */}
      <View className={`p-4 rounded-lg ${
        theme === 'dark' ? 'bg-dark-mint' : 'bg-light-mint'
      }`}>
        <Text className={theme === 'dark' ? 'text-dark-text' : 'text-light-text'}>
          This is a mint-colored card
        </Text>
      </View>

      {/* Button with lilac background */}
      <Pressable 
        className={`mt-4 p-4 rounded-lg ${
          theme === 'dark' ? 'bg-dark-lilac' : 'bg-light-lilac'
        }`}
        onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <Text className={`text-center ${
          theme === 'dark' ? 'text-dark-icon' : 'text-light-icon'
        }`}>
          Toggle Theme
        </Text>
      </Pressable>

      {/* Divider with underline color */}
      <View className={`h-px my-4 ${
        theme === 'dark' ? 'bg-dark-underline' : 'bg-light-underline'
      }`} />

      {/* Card with sherbet background */}
      <View className={`p-4 rounded-lg ${
        theme === 'dark' ? 'bg-dark-sherbet' : 'bg-light-sherbet'
      }`}>
        <ThemedText>Sherbet colored section</ThemedText>
      </View>
    </ThemedView>
  );
}