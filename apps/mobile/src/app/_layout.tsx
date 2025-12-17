import { ThemeProvider } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import "../../global.css";
import { useLoadFonts } from '@/hooks/use-fonts';

export default function RootLayout() {
  const { loaded, error } = useLoadFonts();

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
      </LanguageProvider>
    </ThemeProvider>
  );
}