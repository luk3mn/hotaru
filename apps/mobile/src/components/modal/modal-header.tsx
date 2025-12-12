import { TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed';
import { X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useModalClose } from './modal-root';
import { getColorScheme } from '@/lib/color-schema';

interface ModalHeaderProps {
    title: string;
}

export default function ModalHeader({ title }: ModalHeaderProps) {
    const { theme } = useTheme();
    const { schema } = getColorScheme();
    const closeModal = useModalClose();

    return (
        <View
            className={`
                flex-row justify-between items-center p-5 border-b
                ${theme === 'dark' ? 'border-dark-icon' : 'border-light-icon'}
            `}
        >
            <ThemedText className="text-xl font-bold">{title}</ThemedText>
            <TouchableOpacity
                onPress={closeModal}
                className={`
                    ${theme === 'dark' ? 'bg-dark-icon/80' : 'bg-light-icon/40'}
                    w-8 h-8 rounded-full items-center justify-center
                `}
                activeOpacity={0.7}
            >
                <X color={schema.text} size={18} />
            </TouchableOpacity>
        </View>
    );
}