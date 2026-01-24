import { useTheme } from '@/contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  View,
  BackHandler,
} from 'react-native';
import { ModalProvider } from './modal-context';

interface ModalRootProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

export default function ModalRoot({ children, visible, onClose }: ModalRootProps) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isRendered, setIsRendered] = useState(false);
  const { height } = Dimensions.get('window');
  const { theme } = useTheme();

  // Handle Android back button
  useEffect(() => {
    if (!visible) return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });

    return () => backHandler.remove();
  }, [visible, onClose]);

  useEffect(() => {
    if (visible) {
      // Show modal
      setIsRendered(true);
      
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 1,
          damping: 20,
          stiffness: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (isRendered) {
      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsRendered(false);
      });
    }
  }, [visible, isRendered]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const overlayOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  if (!isRendered && !visible) return null;

  return (
    <ModalProvider>
      <Modal
        visible={isRendered}
        transparent={true}
        animationType="none"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <StatusBar style="light" />
        
        {/* Container Principal */}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {/* Overlay com Fade */}
          <TouchableWithoutFeedback onPress={onClose}>
            <Animated.View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#000',
                opacity: overlayOpacity,
              }}
            />
          </TouchableWithoutFeedback>

          {/* Panel do Modal - SEM pointerEvents restritivos */}
          <Animated.View
            style={{
              transform: [{ translateY }],
              maxHeight: '80%',
            }}
            className={`
              ${theme === 'dark' ? 'bg-dark-surface0' : 'bg-light-surface0'} 
              rounded-t-3xl
              shadow-2xl
            `}
          >
            <ModalCloseProvider onClose={onClose}>
              {children}
            </ModalCloseProvider>
          </Animated.View>
        </View>
      </Modal>
    </ModalProvider>
  );
}

// Context para função de fechar
const ModalCloseContext = React.createContext<(() => void) | undefined>(undefined);

export const useModalClose = () => {
  const context = useContext(ModalCloseContext);
  if (!context) {
    throw new Error('useModalClose must be used within ModalRoot');
  }
  return context;
};

function ModalCloseProvider({ 
  children, 
  onClose 
}: { 
  children: React.ReactNode; 
  onClose: () => void;
}) {
  return (
    <ModalCloseContext.Provider value={onClose}>
      {children}
    </ModalCloseContext.Provider>
  );
}