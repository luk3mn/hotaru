import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type HeaderActionProps = {
    name: keyof typeof MaterialCommunityIcons.glyphMap;
    onPress: () => void;
    size?: number;
    color?: string;
};

export default function HeaderAction({ name, onPress, size, color }: HeaderActionProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons name={name} size={size ?? 24} color={color ?? '#fff'} />
        </TouchableOpacity>
    );
}