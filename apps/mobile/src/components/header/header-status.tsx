import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderStatusProps {
    children: React.ReactNode,
    className?: string,
    wrapper?: 'safe-area' | 'view'
}
export default function HeaderStatus({ children, wrapper, className }: HeaderStatusProps) {
    const { theme } = useTheme();

    const Wrapper = wrapper === 'safe-area' ? SafeAreaView : View;

    return (
        <Wrapper className={`${theme === 'dark' ? 'bg-dark-base' : 'bg-light-base'} flex-row items-center px-2 ${className || ''}`}>
            {children}
        </Wrapper>
    );
}