// components/StatusXP.tsx
import { useEffect, useRef, useState } from 'react';
import { Animated, View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Flashlight, FlaskConicalIcon, ZapIcon } from 'lucide-react-native';
import { getIconSize } from '@/lib/dimensions';

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
                <FlaskConicalIcon color={'#8b5cf6'} size={getIconSize(0.65)} />
                <View className={`flex-1 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-dark-surface-alt' : 'bg-light-surface-alt'}`}>
                    <Animated.View
                        style={{
                            height: '100%',
                            width: widthAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                        }}
                    >
                        <LinearGradient
                            colors={['#8b5cf6', '#6366f1']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flex: 1 }}
                        />
                    </Animated.View>
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
