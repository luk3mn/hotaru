import { getColorScheme } from "@/lib/color-schema";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function HeaderBack() {
    const { schema } = getColorScheme();

    return (
        <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={40} color={schema.icon} />
        </TouchableOpacity>
    );
}