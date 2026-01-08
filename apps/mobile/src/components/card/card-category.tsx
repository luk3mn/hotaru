import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { colors } from '@/constants/colors';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { ThemedText } from '../themed';

interface CardCategoryProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  color: string;
  description?: string;
  onPress?: () => void;
}

export function CardCategory({ 
  title, 
  amount, 
  icon, 
  color, 
  description = "Toque para ver detalhes",
  onPress 
}: CardCategoryProps) {
  const { theme } = useTheme();
  const schema = theme === 'dark' ? colors.dark : colors.light;
  const [isPressed, setIsPressed] = useState(false);
  
  const scale = useSharedValue(1);
  const elevation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: interpolate(elevation.value, [0, 1], [0.1, 0.3]),
    shadowRadius: interpolate(elevation.value, [0, 1], [4, 12]),
  }));

  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = withSpring(0.95, { damping: 15 });
    elevation.value = withTiming(1, { duration: 150 });
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1, { damping: 15 });
    elevation.value = withTiming(0, { duration: 150 });
  };

  return (
    <Animated.View 
      style={[
        animatedStyle,
        {
          width: '48%',
          shadowColor: color,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
        }
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          backgroundColor: schema.surface0,
          borderRadius: 16,
          padding: 16,
          borderWidth: 2,
          borderColor: isPressed ? color : 'transparent',
          overflow: 'hidden',
        }}
      >
        {/* Gradiente sutil no topo */}
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            backgroundColor: color,
            opacity: 0.05,
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
          }}
        />

        {/* Ícone com background colorido */}
        <View 
          style={{ 
            backgroundColor: color + '20',
            height: 48,
            width: 48,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <View style={{ backgroundColor: color }} className="h-6 w-6 rounded-lg">
            {icon}
          </View>
        </View>

        {/* Título */}
        <ThemedText className='text-base font-ubuntu-bold mb-1'>
          {title}
        </ThemedText>

        {/* Valor */}
        <Text 
          style={{ 
            color: color,
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 8,
          }}
        >
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          }).format(amount)}
        </Text>

        {/* Descrição */}
        <Text 
          style={{ 
            color: schema.subtext0,
            fontSize: 12,
            lineHeight: 16,
          }}
          numberOfLines={2}
        >
          {description}
        </Text>

        {/* Indicador de clique */}
        <View 
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: color + '15',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: color, fontSize: 10, fontWeight: '600' }}>
            Ver mais →
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}