import { Card } from "@/components/card";
import { Chart } from "@/components/chart";
import { ThemedText, ThemedView } from "@/components/Themed";
import { getColorScheme } from "@/lib/color-schema";
import { Bell, Car, UserCircleIcon } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function Finance() {
    const { schema } = getColorScheme();


    const data = [
        { label: 'Gastos Essenciais', value: 447.84, percentage: 36, color: schema.chartOne },
        { label: 'Payments', value: 248.8, percentage: 20, color: schema.chartTwo },
        { label: 'Expenses', value: 149.28, percentage: 12, color: schema.chartThree },
        { label: 'Subscriptions', value: 99.52, percentage: 8, color: schema.chartFour },
        { label: 'Other', value: 299.21, percentage: 24, color: schema.chartFive },
    ];

    return (
        <ThemedView className="flex-1 p-4">
            <View className="flex-row justify-between items-center">
                <ThemedText className="text-2xl font-bold mb-4 text-center">
                    Carteira
                </ThemedText>

                <View className="flex-row items-center gap-2">
                    <Bell size={25} color={schema.icon} />
                    <UserCircleIcon size={30} color={schema.icon} />
                </View>
            </View>

            <View className="flex-[3] justify-center items-center">
                <Chart.Donut data={data} />
            </View>

            <Card.Regular>
                <Card.Wrapper direction="row">
                    <Card.Wrapper direction="row" flex={1}>
                        <Card.Icon name="pie-chart-outline" />
                        <Card.Icon name="cash-outline" />
                        <Card.Icon name="cash-outline" />
                    </Card.Wrapper>
                    <Card.Icon name="add-circle" onPress={() => console.log("OPENNED")} />
                </Card.Wrapper>
            </Card.Regular>
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