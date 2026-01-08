import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Chart } from "@/components/chart";
import { Header } from "@/components/header";
import { ThemedText, ThemedView } from "@/components/themed";
import { t } from "@/i18n/i18n";
import { getColorScheme } from "@/lib/color-schema";
import { router } from "expo-router";
import { Bell, HandCoins, ShoppingBagIcon, UserCircleIcon } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Finance() {
    const { schema } = getColorScheme();


    const data = [
        { label: 'Gastos Essenciais', value: 447.84, percentage: 36, color: schema.blue },
        { label: 'Payments', value: 248.8, percentage: 20, color: schema.flamingo },
        { label: 'Expenses', value: 149.28, percentage: 12, color: schema.maroon },
        { label: 'Subscriptions', value: 99.52, percentage: 8, color: schema.teal },
        { label: 'Other', value: 299.21, percentage: 24, color: schema.pink },
    ];

    const handleCategoryPress = (category: string) => {
        console.log(`Abrir modal para: ${category}`);
        // Aqui você vai abrir o modal
    };

    return (
        <ThemedView className="flex-1 px-4 py-2">
            <ScrollView>
                <Header.Root>
                    <Header.Title>{t('finance.title')}</Header.Title>
                    <Header.Wrapper>
                        <Button.Rounded>
                            <Button.Badge>1</Button.Badge>
                            <Bell size={25} color={'#fff'} />
                        </Button.Rounded>
                        <Button.Rounded>
                            <UserCircleIcon size={25} color={'#fff'} />
                        </Button.Rounded>
                    </Header.Wrapper>
                </Header.Root>

                <View className="flex-[3] justify-center items-center">
                    <Chart.Donut data={data} total={1000} totalLegend={t('finance.chart.title')}>
                        <Chart.Period selected>{t('finance.chart.period.weekly')}</Chart.Period>
                        <Chart.Period>{t('finance.chart.period.monthly')}</Chart.Period>
                        <Chart.Period>{t('finance.chart.period.yearly')}</Chart.Period>
                    </Chart.Donut>
                </View>

                {/* <View className="mt-12 flex-row flex-wrap gap-3">
                    <Card.Category.Regular
                        title="Compras"
                        amount={1000}
                        color={schema.mauve}
                        icon={null} // Você pode passar um ícone aqui
                        description="Ver todas as transações de compras"
                        onPress={() => handleCategoryPress('compras')}
                    />

                    <Card.Category.Regular
                        title="Educação"
                        amount={1500}
                        color={schema.blue}
                        icon={null}
                        description="Investimentos em cursos e livros"
                        onPress={() => handleCategoryPress('educacao')}
                    />

                    <Card.Category.Regular
                        title="Alimentação"
                        amount={800}
                        color={schema.green}
                        icon={null}
                        description="Gastos com restaurantes e mercado"
                        onPress={() => handleCategoryPress('alimentacao')}
                    />

                    <Card.Category.Regular
                        title="Transporte"
                        amount={450}
                        color={schema.peach}
                        icon={null}
                        description="Uber, gasolina e manutenção"
                        onPress={() => handleCategoryPress('transporte')}
                    />
                </View> */}

                <View className="flex-row flex-wrap gap-3">
                    <Card.Category.Simple
                        title="Compras"
                        amount={1000}
                        color={schema.mauve}
                        onPress={() => console.log('Abrir modal Compras')}
                    />

                    <Card.Category.Simple
                        title="Educação"
                        amount={1500}
                        color={schema.blue}
                        onPress={() => console.log('Abrir modal Educação')}
                    />

                    <Card.Category.Simple
                        title="Alimentação"
                        amount={800}
                        color={schema.green}
                        onPress={() => console.log('Abrir modal Alimentação')}
                    />

                    <Card.Category.Simple
                        title="Transporte"
                        amount={450}
                        color={schema.peach}
                        onPress={() => console.log('Abrir modal Transporte')}
                    />
                </View>
            </ScrollView>
        </ThemedView>
    );
}