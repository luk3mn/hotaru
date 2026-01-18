import { View } from "react-native";
import { ProgressProvider } from "./progress-context";

type ColorConfig = 
    | string  // Cor única
    | {       // Cores baseadas em porcentagem
        high?: string;      // >= 80%
        medium?: string;    // >= 50%
        low?: string;       // >= 25%
        critical?: string;  // < 25%
    };

export interface ProgressRootProps {
    children: React.ReactNode;
    className?: string;
    color?: ColorConfig;
}

export default function ProgressRoot({ children, className, color }: ProgressRootProps) {
    return (
        <ProgressProvider color={color}>
            <View className={`my-2 flex-row items-center ${className || ''}`}>
                {children}
            </View>
        </ProgressProvider>
    )
}