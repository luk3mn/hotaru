import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export function useLoadFonts() {
  const [loaded, error] = useFonts({
    // Ubuntu Regular
    'Ubuntu-Light': require('@/assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-Regular': require('@/assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Medium': require('@/assets/fonts/Ubuntu-Medium.ttf'),
    'Ubuntu-Bold': require('@/assets/fonts/Ubuntu-Bold.ttf'),

    // Ubuntu Italic
    'Ubuntu-LightItalic': require('@/assets/fonts/Ubuntu-LightItalic.ttf'),
    'Ubuntu-Italic': require('@/assets/fonts/Ubuntu-Italic.ttf'),
    'Ubuntu-MediumItalic': require('@/assets/fonts/Ubuntu-MediumItalic.ttf'),
    'Ubuntu-BoldItalic': require('@/assets/fonts/Ubuntu-BoldItalic.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return { loaded, error };
}