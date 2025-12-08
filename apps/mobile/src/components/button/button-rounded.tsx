import { useTheme } from "@/contexts/ThemeContext";
import { TouchableOpacity } from "react-native";

interface ButtonRoundedProps {
    children: React.ReactNode
    onPress?: () => void
}
export default function ButtonRounded({ children, onPress }: ButtonRoundedProps) {
    const { theme } = useTheme(); 

    return (
        <TouchableOpacity className={`
            ${theme === 'dark' ? 'bg-dark-icon' : 'bg-light-icon'}
            p-2 rounded-full
        `} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
    
}