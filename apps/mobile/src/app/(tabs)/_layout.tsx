import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/contexts/ThemeContext';
import { colors } from '@/constants/colors';
import { Header } from '@/components/header';

export default function TabLayout() {
    const { height } = Dimensions.get('window');
    const { theme } = useTheme();

    const currentColors = theme === 'dark' ? colors.dark : colors.light;

    return (
        <>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <Tabs
                screenOptions={{
                    headerShown: true,
                    header: () => (
                        <Header.Status.Root>
                            <Header.Profile />
                            <Header.Wrapper flex={1} direction='column'>
                                <Header.Status.HP 
                                    current={87} 
                                    max={100}
                                />
                                <Header.Status.XP 
                                    currentXP={650} 
                                    xpToNextLevel={1000}
                                />
                            </Header.Wrapper>
                        </Header.Status.Root>
                    ),
                    headerShadowVisible: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: currentColors.card,
                        borderTopColor: currentColors.border,
                        borderTopWidth: 1,
                        height: height * 0.08,
                    },
                    tabBarActiveTintColor: currentColors.icon,
                    tabBarInactiveTintColor: currentColors.iconInactive,
                }}
            >
                <Tabs.Screen
                    name="learning"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="book" size={size} color={color} />
                        ),
                        tabBarIconStyle: { marginTop: height * 0.015 },
                    }}
                />
                <Tabs.Screen
                    name="health"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="heart" size={size} color={color} />
                        ),
                        tabBarIconStyle: { marginTop: height * 0.015 },
                    }}
                />
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                        tabBarIconStyle: { marginTop: height * 0.015 },
                    }}
                />
                <Tabs.Screen
                    name="finance"
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="wallet" size={size} color={color} />
                        ),
                        tabBarIconStyle: { marginTop: height * 0.015 },
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="settings" size={size} color={color} />
                        ),
                        tabBarIconStyle: { marginTop: height * 0.015 },
                    }}
                />
                <Tabs.Screen
                    name="index"
                    options={{
                        href: null,
                    }}
                />
            </Tabs>
        </>
    );
}