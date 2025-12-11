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
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchEnabled, setTouchEnabled] = useState(false);
  const { height } = Dimensions.get('window');
  const { theme } = useTheme();

  // Handle Android back button
  useEffect(() => {
    if (!visible) return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleClose();
      return true;
    });

    return () => backHandler.remove();
  }, [visible]);

  useEffect(() => {
    if (visible) {
      // Show modal immediately
      setIsRendered(true);
      setIsAnimating(true);
      setTouchEnabled(false);

      // Small delay to ensure modal is rendered before animating
      requestAnimationFrame(() => {
        // Animate in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnim, {
            toValue: 1,
            damping: 25,
            stiffness: 200,
            mass: 0.8,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setIsAnimating(false);
          // Enable touches after animation completes
          setTouchEnabled(true);
        });
      });
    } else if (isRendered) {
      // Animate out
      setIsAnimating(true);
      setTouchEnabled(false);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsRendered(false);
        setIsAnimating(false);
      });
    }
  }, [visible]);

  const handleClose = () => {
    if (isAnimating) return; // Prevent multiple close triggers
    onClose();
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
    extrapolate: 'clamp',
  });

  const overlayOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.7],
    extrapolate: 'clamp',
  });

  // Don't render anything if modal shouldn't be visible
  if (!isRendered && !visible) return null;

  return (
    <ModalProvider>
      <Modal
        visible={isRendered}
        transparent={true}
        animationType="none"
        onRequestClose={handleClose}
        statusBarTranslucent
        hardwareAccelerated
      >
        <StatusBar style="light" backgroundColor="transparent" />
        
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {/* Animated Overlay */}
          <TouchableWithoutFeedback onPress={handleClose}>
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

          {/* Modal Content Panel */}
          <Animated.View
            style={{
              transform: [{ translateY }],
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 24,
            }}
            className={`
              ${theme === 'dark' ? 'bg-dark-sherbet' : 'bg-light-sherbet'} 
              rounded-t-[24px] max-h-[70%]
            `}
            pointerEvents={touchEnabled ? 'auto' : 'none'}
          >
            <ModalCloseProvider onClose={handleClose}>
              {children}
            </ModalCloseProvider>
          </Animated.View>
        </View>
      </Modal>
    </ModalProvider>
  );
}

// Context for close function
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