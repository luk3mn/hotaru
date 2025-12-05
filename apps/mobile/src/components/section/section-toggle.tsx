import { getColorScheme } from '@/lib/color-schema';
import { getIconSize } from '@/lib/dimensions';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface SectionToggleProps { 
    onPress: () => void,
    size?: number,
    flex?: number,
    status: 'on' | 'off'
}

export default function SectionToggle({ onPress, size, flex, status }: SectionToggleProps) {
    const iconSize = getIconSize(size);
    const { schema } = getColorScheme();

    return <MaterialCommunityIcons style={{ flex: flex ?? 0 }} name={status === 'on' ? 'toggle-switch' : 'toggle-switch-off'} onPress={onPress} size={iconSize} color={schema.icon} />
}