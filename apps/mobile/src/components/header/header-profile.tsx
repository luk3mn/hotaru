import { useTheme } from "@/contexts/ThemeContext";
import { getColorScheme } from "@/lib/color-schema";
import { CoinsIcon } from "lucide-react-native";
import { Image, Text, View } from "react-native";

export default function HeaderProfile() {
    const { theme } = useTheme();
    const { schema } = getColorScheme();

    return (
        <View className=" items-center gap-3">
            <View>
                <Image
                    className="w-20 h-20 rounded-full"
                    source={{
                        uri: 'https://img.icons8.com/?size=100&id=g6wNf1i7lGer&format=png&color=000000',
                    }}
                    resizeMode="contain"
                />
                <View className={`
                    ${theme === 'dark' ? 'bg-dark-red' : 'bg-light-red'}
                    absolute bottom-[-5] right-[6] rounded-full px-2 items-center justify-center
                `}>
                    <Text className="text-white text-xs font-bold">Lv. 201</Text>
                </View>
            </View>
            <View className="flex-row items-center gap-1">
                <CoinsIcon color={schema.yellow} size={20} />
                <Text className={`
                    ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                    text-sm font-medium
                `}>
                    1,250
                </Text>
            </View>
        </View>
    )
}