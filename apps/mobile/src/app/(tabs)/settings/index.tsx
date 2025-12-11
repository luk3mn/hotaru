import { Modal } from '@/components/modal';
import { Section } from '@/components/section';
import { ThemedText, ThemedView } from '@/components/Themed';
import Toggle from '@/components/Toggle';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
  const [visibleLanguageOptions, setVisibleLanguageOptions] = useState(false);

  const { themePreference, setTheme } = useTheme();
  const { t } = useTranslation();
  const { currentLanguage, availableLanguages, changeLanguage } = useLanguage();

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
          <Section.Redirect onPress={() => setVisibleLanguageOptions(true)} />
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
      <Modal.Root visible={visibleLanguageOptions} onClose={() => setVisibleLanguageOptions(false)}>
        <Modal.Header title={t('settings.general.language')} />
        <Modal.Scroll>
          {availableLanguages.map((language) => {
            const isSelected = language.code === currentLanguage.code;
            
            return (
              <TouchableOpacity
                key={language.code}
                onPress={() => changeLanguage(language.code)}
                style={[
                  {
                    flexDirection: 'row',
                    gap: 10,
                    padding: 10,
                    margin: 5,
                    // width: 40,
                    // height: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  {
                    backgroundColor: isSelected ? '#fff' : 'transparent',
                    borderColor: isSelected ? '#fff' : 'transparent',
                  }
                ]}
              >
                <Text style={{ fontSize: 20 }}>{language.flag}</Text>
                <Text style={{ fontSize: 20 }}>{language.name}</Text>
              </TouchableOpacity>
            );
          })}
        </Modal.Scroll>
      </Modal.Root>
    </ThemedView>
  );
}