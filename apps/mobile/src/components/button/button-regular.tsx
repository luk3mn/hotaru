import { TouchableOpacity } from "react-native";

export default function ButtonRegular({ children }: { children: React.ReactNode }) {
    return (
        <TouchableOpacity>
            {children}
        </TouchableOpacity>
    );
}