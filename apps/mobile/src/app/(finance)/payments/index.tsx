import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed";

export default function Payments() {
    return (
        <ThemedView wrapper="safe-area" className="flex-1 p-4">
            <Header.Root>
                <Header.Back />
                <Header.Title>Payments</Header.Title>
                <Header.Wrapper/>
            </Header.Root>
        </ThemedView>
    );
}