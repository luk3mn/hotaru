import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Chart } from "@/components/chart";
import { Header } from "@/components/header";
import { ThemedText, ThemedView } from "@/components/themed";
import { t } from "@/i18n/i18n";
import { getColorScheme } from "@/lib/color-schema";
import { router } from "expo-router";
import { Bell, HandCoins, LucideCircleFadingPlus, ShoppingCartIcon, UserCircleIcon } from "lucide-react-native";
import { ScrollView, View } from "react-native";

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
            <Header.Root>
                <Header.Wrapper flex={1}>
                    <Header.Title>{t('finance.title')}</Header.Title>
                </Header.Wrapper>
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

            <Card.Regular>
                <Card.Wrapper direction="row" align="center">
                    <Card.Wrapper direction="row" align="center" flex={1}>
                        <Button.Rounded>
                            <HandCoins size={25} color={'#fff'} />
                        </Button.Rounded>
                        <Button.Rounded onPress={() => router.push('/finance/shopping')}>
                            <ShoppingCartIcon size={25} color={'#fff'} />
                        </Button.Rounded>
                    </Card.Wrapper>
                    <LucideCircleFadingPlus size={25} color={schema.icon} />
                </Card.Wrapper>
            </Card.Regular>
            <ScrollView horizontal className="flex-[1]" pagingEnabled>
                    <Card.Regular>
                        <Card.Icon name="cash-outline" flex={1} />
                        <Card.Wrapper flex={0}>
                            <Card.Text>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1000)}</Card.Text>
                            <Card.Title>{t('finance.category.expenses')}</Card.Title>
                        </Card.Wrapper>
                    </Card.Regular>

                    <Card.Regular>
                        <Card.Icon name="cash-outline" flex={1} />
                        <Card.Wrapper flex={0}>
                            <Card.Text>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1000)}</Card.Text>
                            <Card.Title>{t('finance.category.incomes')}</Card.Title>
                        </Card.Wrapper>
                    </Card.Regular>

                    <Card.Regular>
                        <Card.Icon name="cash-outline" flex={1} />
                        <Card.Wrapper flex={0}>
                            <Card.Text>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1000)}</Card.Text>
                            <Card.Title>{t('finance.category.investments')}</Card.Title>
                        </Card.Wrapper>
                    </Card.Regular>
                    
            </ScrollView>
        </ThemedView>
    );
}