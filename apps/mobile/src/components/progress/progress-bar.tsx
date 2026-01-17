import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { getColorScheme } from '@/lib/color-schema';

interface ProgressBarProps {
    current: number;
    toNextLevel: number;
    size?: 'small' | 'medium' | 'large';
    onLevelUp?: () => void;
}

export default function ProgressBar({
    current,
    toNextLevel,
}: ProgressBarProps) {
    const widthAnim = useRef(new Animated.Value(0)).current;
    const percentage = (current / toNextLevel) * 100;
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
        </View>
    );
}
