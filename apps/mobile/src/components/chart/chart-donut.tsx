import { useTheme } from "@/contexts/ThemeContext";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface ChartDonutProps {
    data: { label: string; value: number; percentage: number; color: string }[];
    onPress?: () => void;
}

export default function ChartDonut({ data, onPress }: ChartDonutProps) {
    const { theme } = useTheme();

    const totalSpent = 1244.65;
    const size = 280;
    const strokeWidth = 30;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    // Calculate arc paths
    let accumulatedPercentage = 0;

    const arcs = data.map((item) => {
        const segmentLength = (item.percentage / 100) * circumference;
        const dashArray = `${segmentLength} ${circumference}`;
        
        // Offset by the accumulated length of previous segments
        const dashOffset = -accumulatedPercentage * circumference / 100;
        
        accumulatedPercentage += item.percentage;

        return {
            ...item,
            dashArray,
            dashOffset,
        };
    });

    return (
        <View className="items-center justify-center">
            <Svg width={size} height={size}>
                {arcs.map((arc, index) => (
                    <Circle
                        key={index}
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={arc.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={arc.dashArray}
                        strokeDashoffset={arc.dashOffset}
                        fill="none"
                        strokeLinecap="round"
                        transform={`rotate(-90 ${center} ${center})`}
                        onPress={onPress}
                    />
                ))}
            </Svg>

            {/* Center text */}
            <View className="absolute items-center justify-center">
                <Text className={`
                    ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                    text-md    
                `}>Economia</Text>
                <Text className={`
                    ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                    text-2xl font-bold text-center    
                `}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSpent)}</Text>
            </View>
    
            {/* Percentage labels around the circle */}
            <View className="absolute top-0 left-0 right-0 bottom-0">
                {data.map((item, index) => {
                // Calculate position for each label
                const angle = -90 + (data.slice(0, index).reduce((sum, d) => sum + d.percentage, 0) + item.percentage / 2) * 3.6;
                const radian = (angle * Math.PI) / 180;
                const labelRadius = radius + strokeWidth / 2 + 25;
                const x = center + labelRadius * Math.cos(radian);
                const y = center + labelRadius * Math.sin(radian);
    
                return (
                    <View
                        key={index}
                        style={[ { left: x-25, top: y-20 } ]}
                        className={`
                            ${theme === 'dark' ? 'bg-light-bg/10' : 'bg-dark-bg/10'}
                            p-2 rounded-full
                            absolute items-center justify-center
                            w-1/4 h-1/1
                        `}
                    >
                        <Text className={`
                            ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                            text-2sm font-bold
                        `}>
                            {item.percentage}%
                        </Text>
                    </View>
                );
                })}
            </View>
        </View>
    )
}