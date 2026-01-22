import { CardCarousel } from "@/components/card-carousel";
import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed";
import { useTheme } from "@/contexts/ThemeContext";
import { getIconSize } from "@/lib/dimensions";
import { useMemo } from "react";
import { View, Text } from "react-native";

export default function Expenses() {
    const size = getIconSize(1.4);
    const { theme } = useTheme();

    const renderItem = useMemo(() => {
        return (item: any) => (
            <View className={`
                ${theme === 'dark' ? 'bg-dark-surface2' : 'bg-light-surface2'}
                p-4 mx-2 rounded-lg
            `}>
                <Text>{item.title}</Text>
            </View>
        );
    }, []);

    return (
        <ThemedView wrapper="safe-area" className="flex-1">
            <Header.Root className="p-4">
                <Header.Back />
                <Header.Title>Expenses</Header.Title>
                <Header.Wrapper>
                    <Header.Action name="dots-horizontal" size={size} onPress={() => {}} />
                </Header.Wrapper>
            </Header.Root>
            <View className="flex-1">
                
                <CardCarousel
                    data={[{
                        id: 1,
                        title: "Teste",
                        subtitle: "R$ 100,00",
                        icon: "home"
                    }, {
                        id: 2,
                        title: "Teste",
                        subtitle: "R$ 100,00",
                        icon: "home"
                    }]}
                    renderItem={renderItem}
                    autoPlay={false}
                    showPagination={false}
                />
            </View>
        </ThemedView>
    );
}