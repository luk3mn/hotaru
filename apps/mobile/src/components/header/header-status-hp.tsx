// components/StatusHealth.tsx
import { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import { getIconSize } from '@/lib/dimensions';
import { useTheme } from '@/contexts/ThemeContext';
import { Heart } from 'lucide-react-native';
import { getColorScheme } from '@/lib/color-schema';

interface StatusHealthProps {
    current: number;      // Current health (e.g., 75)
    max: number;          // Max health (e.g., 100)
    showLabel?: boolean;  // Show percentage label
    animated?: boolean;   // Enable animation
    size?: 'small' | 'medium' | 'large';
}

export default function CompactHealthBar({ current, max, showLabel = true, animated = true, size = 'medium' }: StatusHealthProps) {
    const widthAnim = useRef(new Animated.Value(0)).current;
    const percentage = (current / max) * 100;
    const { theme } = useTheme();
    const { schema } = getColorScheme();

    useEffect(() => {
        Animated.spring(widthAnim, {
            toValue: percentage,
            damping: 15,
            useNativeDriver: false,
        }).start();
    }, [percentage]);

    const getBarColor = () => {
        if (percentage >= 80) return schema.green;
        if (percentage >= 50) return schema.yellow;
        if (percentage >= 25) return schema.peach;
        return schema.red;
    };

    return (
        <View className='mb-2'>
            <View className="flex-row items-center gap-2 px-4 py-1">
                <Heart color={getBarColor()} size={getIconSize(0.65)} />
                <View className={`flex-1 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-dark-surface1' : 'bg-light-surface1'}`}>
                    <Animated.View
                        style={{
                            height: '100%',
                            width: widthAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                            backgroundColor: getBarColor(),
                        }}
                    />
                </View>
            </View>
            {showLabel && (
                <View className="flex-row items-center gap-1 absolute top-5 right-4">
                    <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>{current}</Text>
                    <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>/</Text>
                    <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>{max}</Text>
                </View>
            )}
        </View>
    );
}