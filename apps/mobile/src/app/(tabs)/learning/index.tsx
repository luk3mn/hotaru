import { ThemedText, ThemedView } from "@/components/themed";
import { Text, View } from "react-native";

export default function Learning() {
    return (
        <ThemedView className="flex-1 p-4">
            <ThemedText className="text-2xl font-bold mb-4">
                Learning
            </ThemedText>
        </ThemedView>
    );
}