import { useTheme } from '@/contexts/ThemeContext';
import { View } from 'react-native';

export default function ModalFooter({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <View className={`
            p-5 border-t
            ${theme === 'dark' ? 'border-dark-surface2' : 'border-light-surface2'}
        `}>
            {children}
        </View>
    );
}