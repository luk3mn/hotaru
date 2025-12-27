import { useTheme } from "@/contexts/ThemeContext";
import { Text, View } from "react-native";

export default function ButtonBadge({ children }: { children?: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <View className={`
            ${theme === 'dark' ? 'bg-dark-red' : 'bg-light-red'}
            h-5 w-5 rounded-full absolute top-[-4] right-[-4]
            flex items-center justify-center
        `}>
            <Text className="text-xs font-bold text-white">{children}</Text>
        </View>
    );
}