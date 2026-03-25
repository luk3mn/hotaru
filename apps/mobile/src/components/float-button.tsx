import { PlusIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function FloatButton({ onPress }: { onPress?: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} className="absolute opacity-85 bottom-10 right-10 mb-4 bg-light-flamingo dark:bg-dark-mauve text-white rounded-full p-4 shadow-lg">
            <PlusIcon size={24} color="#fff" />
        </TouchableOpacity>
    );
}