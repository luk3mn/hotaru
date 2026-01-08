import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { colors } from '@/constants/colors';
import { ThemedText } from '../themed';

interface SimpleCategoryCardProps {
  title: string;
  amount: number;
  color: string;
  onPress?: () => void;
}

export function SimpleCategoryCard({ 
  title, 
  amount, 
  color,
  onPress 
}: SimpleCategoryCardProps) {
  const { theme } = useTheme();
  const schema = theme === 'dark' ? colors.dark : colors.light;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: '48%',
        backgroundColor: schema.surface0,
        borderRadius: 16,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: color,
        gap: 12,
      }}
    >
      {/* Indicador colorido */}
      <View 
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: color + '20',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View 
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: color,
          }}
        />
      </View>

      <ThemedText className='text-sm font-ubuntu-medium'>
        {title}
      </ThemedText>

      {/* Valor */}
      <View>
        <Text 
          style={{ 
            color: schema.text,
            fontSize: 22,
            fontWeight: '700',
          }}
        >
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL',
            minimumFractionDigits: 0,
          }).format(amount)}
        </Text>
      </View>

      {/* Footer com seta */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Text style={{ color: color, fontSize: 11, fontWeight: '600' }}>
          Ver detalhes
        </Text>
        <Text style={{ color: color, fontSize: 11 }}>→</Text>
      </View>
    </TouchableOpacity>
  );
}
