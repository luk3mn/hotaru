import { ScrollView, ScrollViewProps } from 'react-native';

interface ModalScrollProps extends ScrollViewProps {
  children: React.ReactNode;
}

export default function ModalScroll({ children, ...props }: ModalScrollProps) {
  return (
    <ScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      // Configurações para permitir gestos horizontais (Swipeable)
      horizontal={false}
      scrollEnabled={true}
      // IMPORTANTE: Permite que componentes filhos capturem gestos
      directionalLockEnabled={false}
      // Permite scroll aninhado
      nestedScrollEnabled={true}
    >
      {children}
    </ScrollView>
  );
}