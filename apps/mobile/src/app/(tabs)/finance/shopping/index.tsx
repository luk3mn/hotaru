import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { ThemedText, ThemedView } from "@/components/Themed";
import { UserCircleIcon } from "lucide-react-native";

export default function Shopping() {
    return (
        <ThemedView className="flex-1 p-4">
            <Header.Root>
                <Header.Wrapper flex={1}>
                    <Header.Back />
                    <Header.Title>COMPRAS</Header.Title>
                </Header.Wrapper>
                <Header.Wrapper>
                    <Button.Rounded>
                        <UserCircleIcon size={25} color={'#fff'} />
                    </Button.Rounded>
                </Header.Wrapper>
            </Header.Root>
        </ThemedView>
    );
}