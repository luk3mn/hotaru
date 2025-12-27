import { useTheme } from "@/contexts/ThemeContext";
import { Image, Text, View } from "react-native";

export default function HeaderProfile() {
    const { theme } = useTheme();

    return (
        <View className="ml-2">
            <Image
                className="w-16 h-16 rounded-full"
                source={{
                    uri: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
                }}
                resizeMode="contain"
            />
            <View className={`absolute bottom-[-5] right-5 rounded-full ${theme === 'dark' ? 'bg-dark-mint' : 'bg-light-mint'}`}>
                <Text className="text-white text-xs font-bold">12</Text>
            </View>
        </View>
    )
}