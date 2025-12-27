import { useTheme } from "@/contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HeaderStatus({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <SafeAreaView className={`${theme === 'dark' ? 'bg-dark-bg' : 'bg-light-bg'} flex-row items-center`}>
            {children}
        </SafeAreaView>
    );
}