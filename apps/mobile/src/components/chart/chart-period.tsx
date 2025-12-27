import { useTheme } from "@/contexts/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

interface ChartPeriodProps {
    children: React.ReactNode,
    selected?: boolean
}
export default function ChartPeriod({ children, selected }: ChartPeriodProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity disabled={selected} className="p-2">
            <Text className={`
                ${selected ? (theme === 'dark' ? 'bg-dark-surface2 text-dark-text' : 'bg-light-surface2 text-light-base') : (theme === 'dark' ? 'text-dark-text' : 'text-light-text')}
                rounded-full px-2 py-1 text-sm font-bold    
            `}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}