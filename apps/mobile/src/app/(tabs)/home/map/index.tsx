import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed";

export default function Map() {
    return (
        <ThemedView wrapper="safe-area" className="flex-1 p-4">
            <Header.Root>
                <Header.Back />
                <Header.Title>Map</Header.Title>
                <Header.Wrapper/>
            </Header.Root>
        </ThemedView>
    );
}