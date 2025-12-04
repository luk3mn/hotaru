import { ThemeProvider } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import "./../../global.css"
export default function RootLayout() {
  return (
    <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
    </ThemeProvider>
  );
}