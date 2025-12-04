import { ThemedText, ThemedView } from "@/components/Themed";
import { Text, View } from "react-native";

export default function Health() {
    return (
        <ThemedView className="flex-1 p-4">
            <ThemedText className="text-2xl font-bold mb-4">
                Health
            </ThemedText>
        </ThemedView>
    );
}