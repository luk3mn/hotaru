import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed";
import { UserCircleIcon } from "lucide-react-native";

export default function Investiments() {
    return (
        <ThemedView className="flex-1 p-4">
            <Header.Root>
                <Header.Wrapper flex={1}>
                    <Header.Back />
                    <Header.Title>Investiments</Header.Title>
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