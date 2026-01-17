import { useTheme } from "@/contexts/ThemeContext";
import { Text, View } from "react-native";

interface ProgressLabelProps {
    current: number,
    toNextLevel: number
}
export function ProgressLabel({  current, toNextLevel }: ProgressLabelProps) {
    const { theme } = useTheme();
    
    return (
        <View className="flex-row items-center gap-1 absolute top-5 right-4">
            <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>{current.toLocaleString()}</Text>
            <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>/</Text>
            <Text className={`text-xs font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}`}>{toNextLevel.toLocaleString()}</Text>
        </View>
    );
}