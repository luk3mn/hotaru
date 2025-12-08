import { Text, TouchableOpacity } from "react-native";

interface ChartPeriodProps {
    children: React.ReactNode,
    selected?: boolean
}
export default function ChartPeriod({ children, selected }: ChartPeriodProps) {
    return (
        <TouchableOpacity disabled={selected} className="p-2">
            <Text className={`
                ${selected ? 'text-dark-text bg-dark-icon' : 'text-dark-text'}
                rounded-full px-2 py-1 text-sm font-bold    
            `}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}