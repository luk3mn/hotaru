import { ThemeProvider } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import "../../global.css";

export default function RootLayout() {
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