import { Card } from "@/components/card";
import { ThemedText, ThemedView } from "@/components/Themed";
import { useTheme } from "@/contexts/ThemeContext";
import { ScrollView, Text, View } from "react-native";

export default function Finance() {
    const { theme } = useTheme();
    return (
        <ThemedView className="flex-1 p-4">
            <View>
                <ThemedText className="text-2xl font-bold mb-4 text-center">
                    Carteira
                </ThemedText>
            </View>

            <View
                className="flex-[3] border-2 border-dark-icon"
                style={{ alignItems: "center", justifyContent: "center" }}
            >
                <ThemedText className="text-2xl font-bold mb-4">
                    Pie Chart
                </ThemedText>
            </View>
            <View className="flex-[1]"></View>
            <ScrollView horizontal className="flex-[1]" pagingEnabled>
                    <Card.Regular>
                        <Card.Icon name="cash-outline" flex={1} />
                        <Card.Wrapper flex={0}>
                            <Card.Text>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1000)}</Card.Text>
                            <Card.Title>Despesas</Card.Title>
                        </Card.Wrapper>
                    </Card.Regular>

                    <Card.Regular>
                        <Card.Icon name="cash-outline" flex={1} />
                        <Card.Wrapper flex={0}>
                            <Card.Text>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1000)}</Card.Text>
                            <Card.Title>Entradas</Card.Title>
                        </Card.Wrapper>
                    </Card.Regular>

                    <Card.Regular>
                        <Card.Icon name="cash-outline" flex={1} />
                        <Card.Wrapper flex={0}>
                            <Card.Text>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1000)}</Card.Text>
                            <Card.Title>Investimentos</Card.Title>
                        </Card.Wrapper>
                    </Card.Regular>
                    
            </ScrollView>
        </ThemedView>
    );
}