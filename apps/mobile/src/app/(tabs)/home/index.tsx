import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { Modal } from '@/components/modal';
import { ThemedText, ThemedView } from '@/components/themed';
import { useIconSize } from '@/hooks/use-dimensions';
import { t } from '@/i18n/i18n';
import { router } from 'expo-router';
import { MapIcon, UserCircleIcon } from 'lucide-react-native';
import { useState } from 'react';

export default function Home() {
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
  const { size } = useIconSize(1);

  return (
    <ThemedView wrapper='safe-area' className="flex-1 p-4">
      <Header.Root>
        <Button.Rounded onPress={() => router.push('/home/map')}>
          <MapIcon size={size} color={'#fff'} />
        </Button.Rounded>
        <Header.Title>OVERVIEW</Header.Title>
        <Button.Rounded onPress={() => setVisibleProfile(true)}>
          <UserCircleIcon size={size} color={'#fff'} />
        </Button.Rounded>
      </Header.Root>

      <Header.Status.Root>
        <Header.Wrapper flex={1} direction='column'>
          <Header.Status.HP
            current={80}
            max={100}
          />
          <Header.Status.XP
            currentXP={465}
            xpToNextLevel={1000}
          />
        </Header.Wrapper>
      </Header.Status.Root>

      <Modal.Root visible={visibleProfile} onClose={() => setVisibleProfile(false)}>
        <Modal.Header title={t('settings.general.language')} />
        <Modal.Scroll>
          <ThemedText>Profile</ThemedText>
        </Modal.Scroll>
      </Modal.Root>

    </ThemedView>
  );
}