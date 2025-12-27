import { useTheme } from "@/contexts/ThemeContext";
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";

interface CardRegularProps {
    children: React.ReactNode,
    onPress?: () => void,
}
export default function CardRegular({ children, onPress }: CardRegularProps) {
    const { theme } = useTheme();
    const { width } = Dimensions.get('window');

    return (
        <Pressable 
            style={{ width: width * 0.9 }}
            className={` 
                p-4 m-2 rounded-lg 
                ${theme === 'dark' ? 'bg-dark-surface1' : 'bg-light-surface1'} 
            `} 
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
}