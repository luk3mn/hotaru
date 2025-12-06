import { Section } from '@/components/section';
import { ThemedText, ThemedView } from '@/components/Themed';
import Toggle from '@/components/Toggle';
import { useTheme } from '@/contexts/ThemeContext';
import { View } from 'react-native';

export default function Settings() {

  const { themePreference, setTheme } = useTheme();

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
        <ThemedText className='text-2xl font-bold mb-4'>Configurações</ThemedText>
      </View>

      <View className='mt-4 mb-4'>
        <ThemedText className='text-xl font-bold ml-2'>Geral</ThemedText>
        <Section.Root>
          <Section.Icon name={useTheme().theme === 'dark' ? 'moon-outline' : 'sunny-outline'} />
          <Section.Text>Modo Escuro</Section.Text>
          <Toggle status={useTheme().theme === 'dark' ? 'on' : 'off'} onPress={toggleTheme} />
        </Section.Root>

        <Section.Root>
          <Section.Icon name={'language-outline'} />
          <Section.Text>Idioma</Section.Text>
          <Section.Redirect onPress={() => { }} />
        </Section.Root>
      </View>

      <View className='mt-4 mb-4'>
        <ThemedText className='text-xl font-bold ml-2'>Alertas</ThemedText>
        <Section.Root>
          <Section.Icon name="notifications-outline" />
          <Section.Text>Notificação</Section.Text>
          <Toggle status={'off'} onPress={() => { }} />
        </Section.Root>
      </View>

      <View className='mt-4 mb-4'>
        <ThemedText className='text-xl font-bold ml-2'>Outros</ThemedText>
        <Section.Root>
          <Section.Icon name="alert-circle-outline" />
          <Section.Text>Sobre</Section.Text>
          <Section.Redirect onPress={() => { }} />
        </Section.Root>
      </View>
    </ThemedView>
  );
}