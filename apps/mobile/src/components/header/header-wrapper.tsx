import { View } from "react-native";

interface HeaderWrapperProps {
    children: React.ReactNode,
    flex?: number,
    gap?: 0 | 2 | 4 | 6,
    align?: "flex-start" | "flex-end" | "center"
    justify?: "flex-start" | "flex-end" | "center"
}
export default function HeaderWrapper({ children, flex, gap, align, justify }: HeaderWrapperProps) {
    return (
        <View className={`
            gap-${gap ?? 2}
            flex-${flex ?? 0}
            items-${align ?? 'flex-start'}
            justify-${justify ?? 'flex-start'}
            flex-row
        `}>
            {children}
        </View>
    );
}