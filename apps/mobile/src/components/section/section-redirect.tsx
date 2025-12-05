import { getColorScheme } from '@/lib/color-schema';
import { getIconSize } from '@/lib/dimensions';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface SectionRedirectProps { 
    onPress: () => void,
    size?: number,
    flex?: number,
}

export default function SectionRedirect({ onPress, size, flex }: SectionRedirectProps) {
    const iconSize = getIconSize(size);
    const { schema } = getColorScheme();

    return <MaterialCommunityIcons style={{ flex: flex ?? 0 }} name={'chevron-right'} onPress={onPress} size={iconSize} color={schema.icon} />
}