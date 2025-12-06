import { getColorScheme } from '@/lib/color-schema';
import { getIconSize } from '@/lib/dimensions';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

interface SectionIconProps {
    size?: number;
    name: ComponentProps<typeof Ionicons>['name'];
    flex?: number
}
export default function SectionIcon({ name, size, flex }: SectionIconProps) {
    const iconSize = getIconSize(size);
    const { schema } = getColorScheme();
    
    return <Ionicons style={{ flex: flex ?? 0 }} name={name} size={iconSize} color={schema.icon} />
}