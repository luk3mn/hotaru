import { useTheme } from "@/contexts/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

interface ChartPeriodProps {
    children: React.ReactNode,
    selected?: boolean
}

export default function ChartPeriod({ children, selected }: ChartPeriodProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity 
            disabled={selected}
            className={`
                ${selected 
                    ? (theme === 'dark' ? 'bg-dark-surface2' : 'bg-light-surface2') 
                    : (theme === 'dark' ? 'bg-dark-overlay1/40' : 'bg-light-overlay1/40')
                }
                px-4 py-2.5 rounded-full
                ${!selected && 'active:opacity-70'}
            `}
        >
            <Text className={`
                ${selected 
                    ? (theme === 'dark' ? 'text-dark-text' : 'text-light-base') 
                    : (theme === 'dark' ? 'text-dark-text/70' : 'text-light-text/70')
                }
                text-xs font-semibold
            `}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}