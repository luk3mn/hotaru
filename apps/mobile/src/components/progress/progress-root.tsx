import { View } from "react-native";

interface ProgressRootProps {
    children: React.ReactNode,
    className?: string
}

export default function ProgressRoot({ children, className }: ProgressRootProps) {
    return (
        <View className={className}>
            {children}
        </View>
    )
}