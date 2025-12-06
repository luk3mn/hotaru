import { useTheme } from "@/contexts/ThemeContext";
import { Text } from "react-native";

type CardTitleProps = {
    children: React.ReactNode;
    flex?: number;
}

export default function CardTitle({ children, flex }: CardTitleProps) {
    const { theme } = useTheme();

    return (
        <Text className={`
            text-sm font-bold 
            ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
            ${`flex-${flex ?? 0}`}
        `}>
            {children}
        </Text>
    );
}