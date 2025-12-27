import { useTheme } from "@/contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HeaderStatus({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <SafeAreaView className={`${theme === 'dark' ? 'bg-dark-base' : 'bg-light-base'} flex-row items-center`}>
            {children}
        </SafeAreaView>
    );
}