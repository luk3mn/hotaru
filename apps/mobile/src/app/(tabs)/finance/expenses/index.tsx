import { Header } from "@/components/header";
import { Modal } from "@/components/modal";
import SwipeableList from "@/components/swipeable-list";
import { ThemedText, ThemedView } from "@/components/themed";
import { useTheme } from "@/contexts/ThemeContext";
import { getIconSize } from "@/lib/dimensions";
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@/components/button";
import { Bell } from "lucide-react-native";

interface ExpensesProps {
    id: string;
    title: string;
    dueDate: string;
    price?: number;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export default function Expenses() {
    const [modalVisible, setModalVisible] = useState(false);
    const size = getIconSize(1.4);
    const { theme } = useTheme();

    const incomingBills: ExpensesProps[] = [
        {
            id: '1',
            title: 'Spotify',
            icon: 'spotify',
            price: 6.89,
            dueDate: '2023-01-01',
        },
        {
            id: '2',
            title: 'Crunchyroll',
            icon: 'animation-outline',
            price: 5,
            dueDate: '2023-01-05',
        },
        {
            id: '3',
            title: 'Rental',
            icon: 'home',
            price: 200,
            dueDate: '2023-01-10',
        },
        {
            id: '4',
            title: 'Credit Card',
            icon: 'credit-card',
            price: 120,
            dueDate: '2023-01-15',
        },
        {
            id: '5',
            title: 'Electricity Bill',
            icon: 'lightning-bolt',
            price: 100,
            dueDate: '2023-01-20',
        },
       
    ];

    return (
        <ThemedView wrapper="safe-area" className="flex-1">
            <Header.Root className="p-4">
                <Header.Back />
                <Header.Title>Expenses</Header.Title>
                <Header.Wrapper>
                    <Button.Rounded onPress={() => setModalVisible(true)}>
                        <Button.Badge>1</Button.Badge>
                        <Bell size={25} color={'#fff'} />
                    </Button.Rounded>
                </Header.Wrapper>
            </Header.Root>

            <Modal.Root visible={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Header title="Incoming Bills" />
                <Modal.View>
                    <SwipeableList
                        data={incomingBills}
                        renderRightActions={() => (
                            <View className="flex-row items-center p-4 m-1 rounded-lg">
                                <TouchableOpacity className={`${theme === 'dark' ? 'bg-dark-rosewater' : 'bg-light-rosewater'} p-3 rounded-lg mr-2`}>
                                    <MaterialCommunityIcons name="pencil" size={24} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity className={`${theme === 'dark' ? 'bg-dark-green' : 'bg-light-green'} p-3 rounded-lg`}>
                                    <MaterialCommunityIcons name="check-all" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        )}
                        swipeableItem={(item: ExpensesProps) => (
                            <View
                                className={`
                                    flex-row items-center p-4 m-4 rounded-lg 
                                    ${theme === 'dark' ? 'bg-dark-surface2' : 'bg-light-surface2'}
                                `}
                            >
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={size}
                                    color={theme === 'dark' ? '#fff' : '#000'}
                                />

                                <View className="flex-1 ml-3">
                                    <ThemedText className="text-base font-medium">{item.title}</ThemedText>
                                    <ThemedText className="text-sm">{new Date(item.dueDate).toLocaleDateString()}</ThemedText>
                                </View>

                                <ThemedText className="text-base font-semibold">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'BRL' }).format(item.price || 0)}</ThemedText>
                            </View>
                        )}
                    />
                </Modal.View>
            </Modal.Root>
        </ThemedView>
    );
}
