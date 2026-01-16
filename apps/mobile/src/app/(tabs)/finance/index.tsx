import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Chart } from "@/components/chart";
import { Header } from "@/components/header";
import { ThemedView } from "@/components/themed";
import { t } from "@/i18n/i18n";
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

    // Dados do gráfico donut - Visão macro das finanças
    const chartData = [
        { label: 'Despesas Essenciais', value: 2500, percentage: 50, color: schema.red },
        { label: 'Despesas Variáveis', value: 800, percentage: 16, color: schema.maroon },
        { label: 'Investimentos', value: 1000, percentage: 20, color: schema.blue },
        { label: 'Pagamentos Fixos', value: 500, percentage: 10, color: schema.peach },
        { label: 'Reserva/Metas', value: 200, percentage: 4, color: schema.mauve },
    ];

    const totalGastos = chartData.reduce((acc, item) => acc + item.value, 0);

    const mainCategories = [
        { 
            title: "Despesas",
            subtitle: "Gastos do dia a dia",
            amount: 3300, // Essenciais + Variáveis
            color: schema.red,
            icon: TrendingDown,
            route: "/finance/expenses" as const,
            description: "Controle seus gastos"
        },
        { 
            title: "Receitas",
            subtitle: "Suas entradas",
            amount: 5000,
            color: schema.green,
            icon: TrendingUp,
            route: "/finance/income" as const,
            description: "Acompanhe sua renda"
        },
        { 
            title: "Investimentos",
            subtitle: "Patrimônio",
            amount: 1000,
            color: schema.blue,
            icon: PiggyBank,
            route: "/finance/investments" as const,
            description: "Faça seu dinheiro crescer"
        },
        { 
            title: "Pagamentos",
            subtitle: "Contas fixas",
            amount: 500,
            color: schema.peach,
            icon: Calendar,
            route: "/finance/payments" as const,
            description: "Nunca perca um vencimento"
        },
        { 
            title: "Metas",
            subtitle: "Objetivos",
            amount: 200,
            color: schema.mauve,
            icon: Target,
            route: "/finance/goals" as const,
            description: "Realize seus sonhos"
        },
    ];

    const handleCategoryPress = (route: string, title: string) => {
        console.log(`Navegar para: ${route} - ${title}`);
        // Type assertion para contornar a validação estrita do Expo Router
        router.push(route as any);
    };

    return (
        <ThemedView className="flex-1">
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
                        totalLegend="Movimentação"
                    >
                        <Chart.Period selected>Semanal</Chart.Period>
                        <Chart.Period>Mensal</Chart.Period>
                        <Chart.Period>Anual</Chart.Period>
                    </Chart.Donut>
                </View>

                <View className="px-4 mt-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold dark:text-dark-text text-light-text">
                            Categorias
                        </Text>
                        <Text className="text-sm dark:text-dark-text/60 text-light-text/60">
                            Toque para detalhes
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
                            Resumo do Mês
                        </Text>
                        
                        <View className="space-y-2">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm dark:text-dark-text/70 text-light-text/70">
                                    💰 Total de Receitas
                                </Text>
                                <Text className="text-sm font-semibold dark:text-dark-green text-light-green">
                                    R$ 5.000,00
                                </Text>
                            </View>
                            
                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm dark:text-dark-text/70 text-light-text/70">
                                    💸 Total de Despesas
                                </Text>
                                <Text className="text-sm font-semibold dark:text-dark-red text-light-red">
                                    R$ 3.300,00
                                </Text>
                            </View>
                            
                            <View className="h-px dark:bg-dark-overlay0 bg-light-overlay0 my-2" />
                            
                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm font-semibold dark:text-dark-text text-light-text">
                                    💵 Saldo do Mês
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