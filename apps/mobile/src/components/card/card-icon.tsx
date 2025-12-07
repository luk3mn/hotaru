import { getColorScheme } from '@/lib/color-schema';
import { getIconSize } from '@/lib/dimensions';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

interface CardIconProps {
    size?: number;
    name: ComponentProps<typeof Ionicons>['name'];
    flex?: number;
    onPress?: () => void
}
export default function CardIcon({ name, size, flex, onPress }: CardIconProps) {
    const iconSize = getIconSize(size);
    const { schema } = getColorScheme();
    
    return (
        <Ionicons 
            style={{ flex: flex ?? 0 }} 
            name={name} 
            size={iconSize} 
            color={schema.icon} 
            onPress={onPress}
            // className='bg-dark-sherbet-fade p-2 rounded-full'
        />
    )
}