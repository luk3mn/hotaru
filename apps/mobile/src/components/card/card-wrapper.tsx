import { View } from "react-native";

interface CardWrapperProps {
    children: React.ReactNode,
    flex?: number,
    direction?: "row" | "column"
    gap?: number
}
export default function CardWrapper({ children, flex, direction, gap }: CardWrapperProps) {
    return (
        <View className={`
            gap-${gap ?? 2}
            flex-${flex ?? 0}
            flex-${direction ?? 'column'}
        `}>
            {children}
        </View>
    );
}