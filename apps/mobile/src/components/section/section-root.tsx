import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

export default function SectionRoot({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <View className={`${theme === 'dark' ? 'bg-dark-lilac' : 'bg-light-lilac'} flex-row items-center p-4 rounded-2xl gap-2 mb-2 mt-2`}>
            {children}
        </View>
    );
}