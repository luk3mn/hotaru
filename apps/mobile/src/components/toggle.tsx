import { getIconSize } from "@/lib/dimensions";
import { TouchableOpacity } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming,
  interpolateColor
} from "react-native-reanimated";
import { useEffect } from "react";
import { getColorScheme } from "@/lib/color-schema";

interface ToggleProps {
    status: 'on' | 'off';
    size?: number;
    flex?: number;
    onPress?: () => void
}

export default function Toggle({ status, size, flex, onPress }: ToggleProps) {
    const iconSize = getIconSize(size);
    const { schema } = getColorScheme();
    
    // Shared value for animation (0 = off, 1 = on)
    const progress = useSharedValue(status === 'on' ? 1 : 0);

    useEffect(() => {
        progress.value = withSpring(status === 'on' ? 1 : 0, {
            damping: 45,
            stiffness: 150,
        });
    }, [status]);

    // Animate the toggle ball position
    const ballAnimatedStyle = useAnimatedStyle(() => {
        // Calculate the distance the ball needs to travel
        const ballSize = iconSize / 2;
        const containerWidth = iconSize * 2;
        const padding = iconSize / 8;
        const travelDistance = containerWidth - ballSize - (padding * 2);
        
        return {
            transform: [
                { 
                    translateX: withSpring(
                        progress.value * travelDistance, 
                        { damping: 15, stiffness: 150 }
                    ) 
                },
                { 
                    scale: withSpring(
                        progress.value === 1 ? 1.1 : 1, 
                        { damping: 10 }
                    )
                }
            ],
        };
    });

    // Animate background color
    const backgroundAnimatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ['hsl(0, 0%, 39%)', 'hsl(256, 40%, 76%)'] // gray-500 to green-500, adjust to your theme
        );
        
        return {
            backgroundColor: withTiming(backgroundColor, { duration: 200 }),
        };
    });

    return (
        <TouchableOpacity
            style={{ flex: flex ?? 0, width: iconSize * 2, height: iconSize }}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Animated.View
                style={[
                    {
                        width: iconSize * 2,
                        height: iconSize,
                        borderRadius: iconSize / 2,
                        padding: iconSize / 8,
                        justifyContent: 'center',
                    },
                    backgroundAnimatedStyle
                ]}
            >
                <Animated.View
                    style={[
                        {
                            width: iconSize / 2,
                            height: iconSize / 2,
                            borderRadius: iconSize / 4,
                            backgroundColor: '#ffffff',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        },
                        ballAnimatedStyle
                    ]}
                />
            </Animated.View>
        </TouchableOpacity>
    )
}