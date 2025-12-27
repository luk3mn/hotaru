// components/StatusXP.tsx
import { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { FlaskConicalIcon } from 'lucide-react-native';
import { getIconSize } from '@/lib/dimensions';
import { getColorScheme } from '@/lib/color-schema';

interface StatusXPProps {
    currentXP: number;        // Current XP (e.g., 850)
    xpToNextLevel: number;    // XP needed for next level (e.g., 1000)
    showLabel?: boolean;      // Show XP label
    showLevel?: boolean;      // Show level badge
    animated?: boolean;       // Enable animation
    size?: 'small' | 'medium' | 'large';
    onLevelUp?: () => void;   // Callback when leveling up
}

export default function CompactXPBar({
    currentXP,
    xpToNextLevel,
    showLabel = true,
}: StatusXPProps) {
    const widthAnim = useRef(new Animated.Value(0)).current;
    const percentage = (currentXP / xpToNextLevel) * 100;
    const { theme } = useTheme();
    const { schema } = getColorScheme();

    useEffect(() => {
        Animated.spring(widthAnim, {
            toValue: percentage,
            damping: 15,
            useNativeDriver: false,
        }).start();
    }, [percentage]);

    return (
        <View className='mb-2'>
            <View className="flex-row items-center gap-2 px-4 py-1">
                <FlaskConicalIcon color={schema.lavender} size={getIconSize(0.65)} />
                <View className={`flex-1 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-dark-surface1' : 'bg-light-surface1'}`}>
                    <Animated.View
                        style={{
                            height: '100%',
                            width: widthAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                            backgroundColor: schema.lavender,
                        }}
                    />
                </View>
            </View>
            {showLabel && (
                 <View className="flex-row items-center gap-1 absolute top-5 right-4">
                    <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>{currentXP.toLocaleString()}</Text>
                    <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>/</Text>
                    <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>{xpToNextLevel.toLocaleString()}</Text>
                </View>
            )}
        </View>
    );
}
