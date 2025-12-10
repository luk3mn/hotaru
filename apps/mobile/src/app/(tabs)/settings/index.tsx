import { Section } from '@/components/section';
import { ThemedText, ThemedView } from '@/components/Themed';
import Toggle from '@/components/Toggle';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { View } from 'react-native';

export default function Settings() {

  const { themePreference, setTheme } = useTheme();
  const { t } = useTranslation();

  const toggleTheme = () => {
    if (themePreference === 'system') {
      setTheme('light');
    } else if (themePreference === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemedView className="flex-1 p-4">
      <View className='items-center'>
        <ThemedText className='text-2xl font-bold mb-4'>{t('settings.title')}</ThemedText>
      </View>

      <View className='mt-4 mb-4'>
        <ThemedText className='text-xl font-bold ml-2'>Geral</ThemedText>
        <Section.Root>
          <Section.Icon name={useTheme().theme === 'dark' ? 'moon-outline' : 'sunny-outline'} />
          <Section.Text>{t('settings.general.theme')}</Section.Text>
          <Toggle status={useTheme().theme === 'dark' ? 'on' : 'off'} onPress={toggleTheme} />
        </Section.Root>

        <Section.Root>
          <Section.Icon name={'language-outline'} />
          <Section.Text>{t('settings.general.language')}</Section.Text>
          <Section.Redirect onPress={() => { }} />
        </Section.Root>
      </View>

      <View className='mt-4 mb-4'>
        <ThemedText className='text-xl font-bold ml-2'>Alertas</ThemedText>
        <Section.Root>
          <Section.Icon name="notifications-outline" />
          <Section.Text>{t('settings.alerts.notification')}</Section.Text>
          <Toggle status={'off'} onPress={() => { }} />
        </Section.Root>
      </View>

      <View className='mt-4 mb-4'>
        <ThemedText className='text-xl font-bold ml-2'>{t('settings.others.title')}</ThemedText>
        <Section.Root>
          <Section.Icon name="alert-circle-outline" />
          <Section.Text>{t('settings.others.about')}</Section.Text>
          <Section.Redirect onPress={() => { }} />
        </Section.Root>
      </View>
    </ThemedView>
  );
}