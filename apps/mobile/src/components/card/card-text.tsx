import { useTheme } from "@/contexts/ThemeContext";
import { Text } from "react-native";

type CardTextProps = {
    children: React.ReactNode;
    flex?: number;
}

export default function CardText({ children, flex }: CardTextProps) {
    const { theme } = useTheme();

    return (
        <Text className={`
            text-sm
            ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
            ${`flex-${flex ?? 0}`}
        `}>
            {children}
        </Text>
    );
}