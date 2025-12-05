import { colors } from "@/constants/colors";
import { useTheme } from "@/contexts/ThemeContext";

export function getColorScheme() {
    const { theme } = useTheme();
    return { schema: colors[theme] };
}