import { useIconSize } from "@/hooks/use-dimensions";
import { getColorScheme } from "@/lib/color-schema";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function HeaderBack() {
    const { schema } = getColorScheme();
    const { size } = useIconSize(1.5);

    return (
        <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={size} color={schema.rosewater} />
        </TouchableOpacity>
    );
}