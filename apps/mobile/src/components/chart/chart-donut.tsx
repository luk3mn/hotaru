import { useTheme } from "@/contexts/ThemeContext";
import { Text, View, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface ChartDonutProps {
    children?: React.ReactNode;
    data: { label: string; value: number; percentage: number; color: string }[];
    total: number;
    totalLegend?: string;
    onPress?: () => void;
}

export default function ChartDonut({ children, data, onPress, total, totalLegend }: ChartDonutProps) {
    const { theme } = useTheme();
    const screenWidth = Dimensions.get('window').width;

    const size = Math.min(screenWidth * 0.75, 280);
    const strokeWidth = size * 0.11;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    let accumulatedPercentage = 0;

    const arcs = data.map((item) => {
        const segmentLength = (item.percentage / 100) * circumference;
        const dashArray = `${segmentLength} ${circumference}`;
        
        const dashOffset = -accumulatedPercentage * circumference / 100;
        
        accumulatedPercentage += item.percentage;

        return {
            ...item,
            dashArray,
            dashOffset,
        };
    });

    return (
        <View className="items-center justify-center w-full">
            <View className="relative" style={{ width: size, height: size }}>
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

                <View className="absolute inset-0 items-center justify-center">
                    <Text className={`
                        ${theme === 'dark' ? 'text-dark-text/70' : 'text-light-text/70'}
                        text-sm font-medium mb-1
                    `}>
                        {totalLegend ?? 'Total'}
                    </Text>
                    <Text className={`
                        ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                        text-3xl font-bold text-center
                    `}>
                        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total ?? 0)}
                    </Text>
                </View>
        
                {data.map((item, index) => {
                    const angle = -90 + (data.slice(0, index).reduce((sum, d) => sum + d.percentage, 0) + item.percentage / 2) * 3.6;
                    const radian = (angle * Math.PI) / 180;
                    const labelRadius = radius + strokeWidth / 2 + (size * 0.12);
                    const x = center + labelRadius * Math.cos(radian);
                    const y = center + labelRadius * Math.sin(radian);
        
                    return (
                        <View
                            key={index}
                            style={{
                                position: 'absolute',
                                left: x - (size * 0.08),
                                top: y - (size * 0.08),
                                width: size * 0.16,
                                height: size * 0.16,
                            }}
                            className={`
                                ${theme === 'dark' ? 'bg-dark-overlay2/60' : 'bg-light-overlay2/60'}
                                backdrop-blur-sm
                                rounded-full
                                items-center justify-center
                                shadow-lg
                            `}
                        >
                            <Text className={`
                                ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                                text-xs font-bold
                            `}>
                                {item.percentage}%
                            </Text>
                        </View>
                    );
                })}
            </View>

            {children && (
                <View className="flex-row gap-4 mt-20">
                    {children}
                </View>
            )}
        </View>
    )
}