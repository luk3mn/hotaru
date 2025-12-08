import { View } from "react-native";

export default function HeaderRoot({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-row items-center justify-between">
            {children}
        </View>
    );
}