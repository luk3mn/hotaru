import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Chart } from "@/components/chart";
import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed";
import { useTranslation } from "@/contexts/LanguageContext";
import { getColorScheme } from "@/lib/color-schema";
import { router } from "expo-router";
import {
    Bell,
    UserCircleIcon,
    TrendingDown,
    TrendingUp,
    PiggyBank,
    Calendar,
    Target
} from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function Finance() {
    const { schema } = getColorScheme();
    const { t } = useTranslation();

    // Dados do gráfico donut - Visão macro das finanças
    const chartData = [
        { 
            label: t('finance.chartData.essentialExpenses'), 
            value: 2500, 
            percentage: 50, 
            color: schema.red 
        },
        { 
            label: t('finance.chartData.variableExpenses'), 
            value: 800, 
            percentage: 16, 
            color: schema.maroon 
        },
        { 
            label: t('finance.chartData.investments'), 
            value: 1000, 
            percentage: 20, 
            color: schema.blue 
        },
        { 
            label: t('finance.chartData.fixedPayments'), 
            value: 500, 
            percentage: 10, 
            color: schema.peach 
        },
        { 
            label: t('finance.chartData.reserveGoals'), 
            value: 200, 
            percentage: 4, 
            color: schema.mauve 
        },
    ];

    const totalGastos = chartData.reduce((acc, item) => acc + item.value, 0);

    const mainCategories = [
        { 
            title: t('finance.categories.expenses.title'),
            subtitle: t('finance.categories.expenses.subtitle'),
            amount: 3300, // Essenciais + Variáveis
            color: schema.red,
            icon: TrendingDown,
            route: "/(finance)/expenses" as const,
            description: t('finance.categories.expenses.description')
        },
        { 
            title: t('finance.categories.income.title'),
            subtitle: t('finance.categories.income.subtitle'),
            amount: 5000,
            color: schema.green,
            icon: TrendingUp,
            route: "/(finance)/income" as const,
            description: t('finance.categories.income.description')
        },
        { 
            title: t('finance.categories.investments.title'),
            subtitle: t('finance.categories.investments.subtitle'),
            amount: 1000,
            color: schema.blue,
            icon: PiggyBank,
            route: "/(finance)/investments" as const,
            description: t('finance.categories.investments.description')
        },
        { 
            title: t('finance.categories.payments.title'),
            subtitle: t('finance.categories.payments.subtitle'),
            amount: 500,
            color: schema.peach,
            icon: Calendar,
            route: "/(finance)/payments" as const,
            description: t('finance.categories.payments.description')
        },
        { 
            title: t('finance.categories.goals.title'),
            subtitle: t('finance.categories.goals.subtitle'),
            amount: 200,
            color: schema.mauve,
            icon: Target,
            route: "/(finance)/goals" as const,
            description: t('finance.categories.goals.description')
        },
    ];

    const handleCategoryPress = (route: string, title: string) => {
        console.log(`Navegar para: ${route} - ${title}`);
        router.push(route as any);
    };

    return (
        <ThemedView wrapper="safe-area" className="flex-1">
            <ScrollView 
                className="flex-1"
                contentContainerClassName="pb-6"
                showsVerticalScrollIndicator={false}
            >
                <View className="px-4 pt-2 pb-4">
                    <Header.Root className="p-2">
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
                </View>

                <View className="py-6 px-4">
                    <Chart.Donut 
                        data={chartData} 
                        total={totalGastos} 
                        totalLegend={t('finance.chart.totalLegend')}
                    >
                        <Chart.Period selected>{t('finance.chart.period.weekly')}</Chart.Period>
                        <Chart.Period>{t('finance.chart.period.monthly')}</Chart.Period>
                        <Chart.Period>{t('finance.chart.period.yearly')}</Chart.Period>
                    </Chart.Donut>
                </View>

                <View className="px-4 mt-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold dark:text-dark-text text-light-text">
                            {t('finance.categories.title')}
                        </Text>
                        <Text className="text-sm dark:text-dark-text/60 text-light-text/60">
                            {t('finance.categories.tapForDetails')}
                        </Text>
                    </View>
                    
                    <View className="flex-row flex-wrap gap-3">
                        {mainCategories.map((category, index) => (
                            <Card.Category.Simple
                                key={index}
                                title={category.title}
                                amount={category.amount}
                                color={category.color}
                                onPress={() => handleCategoryPress(category.route, category.title)}
                            />
                        ))}
                    </View>
                </View>

                <View className="px-4 mt-6">
                    <View className="dark:bg-dark-surface0 bg-light-surface0 rounded-2xl p-4">
                        <Text className="text-base font-semibold dark:text-dark-text text-light-text mb-3">
                            {t('finance.summary.title')}
                        </Text>
                        
                        <View className="space-y-2">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm dark:text-dark-text/70 text-light-text/70">
                                    💰 {t('finance.summary.totalIncome')}
                                </Text>
                                <Text className="text-sm font-semibold dark:text-dark-green text-light-green">
                                    R$ 5.000,00
                                </Text>
                            </View>
                            
                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm dark:text-dark-text/70 text-light-text/70">
                                    💸 {t('finance.summary.totalExpenses')}
                                </Text>
                                <Text className="text-sm font-semibold dark:text-dark-red text-light-red">
                                    R$ 3.300,00
                                </Text>
                            </View>
                            
                            <View className="h-px dark:bg-dark-overlay0 bg-light-overlay0 my-2" />
                            
                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm font-semibold dark:text-dark-text text-light-text">
                                    💵 {t('finance.summary.monthBalance')}
                                </Text>
                                <Text className="text-base font-bold dark:text-dark-blue text-light-blue">
                                    R$ 1.700,00
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
}