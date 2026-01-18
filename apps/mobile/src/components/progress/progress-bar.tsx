import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useProgress } from './progress-context';

interface ProgressBarProps {
    current: number;
    toNextLevel: number;
    color?: string; // Cor override opcional
}

export default function ProgressBar({
    current,
    toNextLevel,
    color
}: ProgressBarProps) {
    const widthAnim = useRef(new Animated.Value(0)).current;
    const percentage = (current / toNextLevel) * 100;
    const { theme } = useTheme();
    const { setPercentage, currentColor } = useProgress();

    // Atualiza a porcentagem no contexto sempre que mudar
    useEffect(() => {
        setPercentage(percentage);
    }, [percentage, setPercentage]);

    // Usa cor override ou cor do context
    const barColor = color || currentColor;

    useEffect(() => {
        Animated.spring(widthAnim, {
            toValue: percentage,
            damping: 15,
            useNativeDriver: false,
        }).start();
    }, [percentage]);

    return (
        <View className='flex-1'>
            <View className="flex-row items-center gap-2 px-4 py-1">
                <View className={`flex-1 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-dark-surface1' : 'bg-light-surface1'}`}>
                    <Animated.View
                        style={{
                            height: '100%',
                            width: widthAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ['0%', '100%'],
                            }),
                            backgroundColor: barColor,
                        }}
                    />
                </View>
            </View>
        </View>
    );
}