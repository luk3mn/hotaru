import { ThemeProvider } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import React from 'react';
import "./../../global.css";
import { LanguageProvider } from '@/contexts/LanguageContext';
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