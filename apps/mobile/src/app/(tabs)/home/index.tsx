import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { Modal } from '@/components/modal';
import { Progress } from '@/components/progress';
import { ThemedText, ThemedView } from '@/components/themed';
import { useTheme } from '@/contexts/ThemeContext';
import { useIconSize } from '@/hooks/use-dimensions';
import { useTranslation } from '@/contexts/LanguageContext';
import { getColorScheme } from '@/lib/color-schema';
import { router } from 'expo-router';
import { MapIcon, UserCircleIcon } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export default function Home() {
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
  const { size } = useIconSize(1);
  const { schema } = getColorScheme();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const attributes = [
    {
      id: 'physical',
      name: t('home.attributes.physical.name'),
      description: t('home.attributes.physical.description'),
      icon: 'arm-flex' as IconName,
      current: 80,
      max: 100,
      colors: {
        high: schema.green,
        medium: schema.teal,
        low: schema.yellow,
        critical: schema.red,
      },
      gradient: [schema.green, schema.teal] as [string, string],
    },
    {
      id: 'mental',
      name: t('home.attributes.mental.name'),
      description: t('home.attributes.mental.description'),
      icon: 'brain' as IconName,
      current: 70,
      max: 100,
      colors: {
        high: schema.mauve,
        medium: schema.lavender,
        low: schema.peach,
        critical: schema.red,
      },
      gradient: [schema.mauve, schema.lavender] as [string, string],
    },
    {
      id: 'social',
      name: t('home.attributes.social.name'),
      description: t('home.attributes.social.description'),
      icon: 'account-group' as IconName,
      current: 60,
      max: 100,
      colors: {
        high: schema.blue,
        medium: schema.sapphire,
        low: schema.sky,
        critical: schema.red,
      },
      gradient: [schema.blue, schema.sapphire] as [string, string],
    },
    {
      id: 'professional',
      name: t('home.attributes.professional.name'),
      description: t('home.attributes.professional.description'),
      icon: 'briefcase' as IconName,
      current: 75,
      max: 100,
      colors: {
        high: schema.flamingo,
        medium: schema.pink,
        low: schema.maroon,
        critical: schema.red,
      },
      gradient: [schema.flamingo, schema.pink] as [string, string],
    },
    {
      id: 'wellbeing',
      name: t('home.attributes.wellbeing.name'),
      description: t('home.attributes.wellbeing.description'),
      icon: 'spa' as IconName,
      current: 85,
      max: 100,
      colors: {
        high: schema.peach,
        medium: schema.yellow,
        low: schema.maroon,
        critical: schema.red,
      },
      gradient: [schema.peach, schema.yellow] as [string, string],
    },
    {
      id: 'financial',
      name: t('home.attributes.financial.name'),
      description: t('home.attributes.financial.description'),
      icon: 'cash-multiple' as IconName,
      current: 55,
      max: 100,
      colors: {
        high: schema.green,
        medium: schema.yellow,
        low: schema.peach,
        critical: schema.red,
      },
      gradient: [schema.green, schema.yellow] as [string, string],
    },
  ];

  return (
    <ThemedView wrapper='view' className="flex-1">
      <LinearGradient
        colors={[schema.surface2, schema.surface1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className='p-6'
        style={{ paddingTop: StatusBar.currentHeight, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
      >
        <Header.Root>
          <Button.Rounded onPress={() => router.push('/home/map')}>
            <MapIcon size={size} color={'#fff'} />
          </Button.Rounded>
          <Header.Title>{t('home.overview')}</Header.Title>
          <Button.Rounded onPress={() => setVisibleProfile(true)}>
            <UserCircleIcon size={size} color={'#fff'} />
          </Button.Rounded>
        </Header.Root>

        <Header.Status.Root className='bg-transparent pt-6 pb-4'>
          <Header.Wrapper flex={1} direction='column'>
            <Header.Status.HP current={80} max={100} />
            <Header.Status.XP currentXP={405} xpToNextLevel={1000} />
          </Header.Wrapper>
        </Header.Status.Root>
      </LinearGradient>

      {/* Scroll de Atributos */}
      <ScrollView 
        className='flex-1 px-4 pt-6'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Card de Progresso Geral */}
        <View className='mb-6'>
          <LinearGradient
            colors={[schema.mauve + '20', schema.blue + '20']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className={`
              rounded-2xl p-5
              border-2 ${theme === 'dark' ? 'border-dark-overlay1' : 'border-light-overlay1'}
            `}
          >
            <View className='flex-row items-center justify-between mb-3'>
              <View>
                <ThemedText className='text-lg font-bold'>
                  {t('home.overallProgress')}
                </ThemedText>
                <ThemedText className={`text-sm ${theme === 'dark' ? 'text-dark-text/60' : 'text-light-text/60'}`}>
                  {t('home.averageOfAllAttributes')}
                </ThemedText>
              </View>
              <View className='items-center'>
                <ThemedText className='text-3xl font-bold' style={{ color: schema.mauve }}>
                  {Math.round(
                    attributes.reduce((sum, attr) => sum + (attr.current / attr.max) * 100, 0) / 
                    attributes.length
                  )}%
                </ThemedText>
              </View>
            </View>

            <Progress.Root color={schema.mauve}>
              <Progress.Bar 
                current={
                  attributes.reduce((sum, attr) => sum + attr.current, 0) / attributes.length
                } 
                toNextLevel={100} 
              />
            </Progress.Root>
          </LinearGradient>
        </View>

        {/* Título da Seção */}
        <View className='mb-4'>
          <ThemedText className='text-2xl font-bold mb-1'>
            {t('home.yourAttributes')}
          </ThemedText>
          <ThemedText className={`text-sm ${theme === 'dark' ? 'text-dark-text/60' : 'text-light-text/60'}`}>
            {t('home.developAllAreas')}
          </ThemedText>
        </View>

        {/* Grid de Atributos */}
        <View className='gap-4'>
          {attributes.map((attribute) => (
            <View key={attribute.id}>
              {/* Card com Gradiente Sutil */}
              <LinearGradient
                colors={[
                  `${attribute.gradient[0]}15`,
                  `${attribute.gradient[1]}10`,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className={`
                  rounded-2xl p-6
                  border ${theme === 'dark' ? 'border-dark-overlay0' : 'border-light-overlay0'}
                `}
              >
                {/* Header do Card */}
                <View className='flex-row items-center justify-between mb-3'>
                  <View className='flex-row items-center gap-3 flex-1'>
                    {/* Badge do Ícone */}
                    <View 
                      className='w-12 h-12 rounded-full items-center justify-center'
                      style={{ backgroundColor: `${attribute.gradient[0]}30` }}
                    >
                      <Progress.Root color={attribute.colors}>
                        <Progress.Icon 
                          name={attribute.icon} 
                          size={0.8}
                        />
                      </Progress.Root>
                    </View>
                    
                    {/* Nome e Descrição */}
                    <View className='flex-1'>
                      <ThemedText className='text-base font-bold'>
                        {attribute.name}
                      </ThemedText>
                      <ThemedText 
                        className={`text-xs ${theme === 'dark' ? 'text-dark-text/60' : 'text-light-text/60'}`}
                        numberOfLines={1}
                      >
                        {attribute.description}
                      </ThemedText>
                    </View>
                  </View>

                  {/* Nível */}
                  <View className='items-center ml-2'>
                    <ThemedText className={`text-xs ${theme === 'dark' ? 'text-dark-text/60' : 'text-light-text/60'}`}>
                      {t('common.level')}
                    </ThemedText>
                    <ThemedText className='text-lg font-bold'>
                      {Math.floor(attribute.current / 10)}
                    </ThemedText>
                  </View>
                </View>

                {/* Barra de Progresso */}
                <Progress.Root color={attribute.colors}>
                  <Progress.Bar 
                    current={attribute.current} 
                    toNextLevel={attribute.max} 
                  />
                  <Progress.Label 
                    current={attribute.current} 
                    toNextLevel={attribute.max} 
                    position='relative'
                  />
                </Progress.Root>
              </LinearGradient>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal de Perfil */}
      <Modal.Root visible={visibleProfile} onClose={() => setVisibleProfile(false)}>
        <Modal.Header title={t('common.profile')} />
        <Modal.Scroll>
          <ThemedText>{t('common.profile')}</ThemedText>
        </Modal.Scroll>
      </Modal.Root>
    </ThemedView>
  );
}