import { CardCarousel } from "@/components/card-carousel";
import { Header } from "@/components/header";
import { Modal } from "@/components/modal";
import { ThemedText, ThemedView } from "@/components/themed";
import { useTheme } from "@/contexts/ThemeContext";
import { getIconSize } from "@/lib/dimensions";
import { useMemo, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

interface Song {
    id: string;
    title: string;
    artist: string;
    cover: string;
    duration: string;
}

export default function Expenses() {
    const [modalVisible, setModalVisible] = useState(false);
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

    const ListItem = ({ item }) => {
        const renderRightActions = () => (
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={[styles.button, styles.edit]}>
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.delete]}>
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );

        return (
            <Swipeable renderRightActions={renderRightActions}>
                <View
                    className={`
                                        flex-row items-center p-4 
                                        ${theme === 'dark' ? 'bg-dark-surface2' : 'bg-light-surface2'}
                                    `}
                >
                    <Image
                        source={{ uri: item.cover }}
                        className="w-14 h-14 rounded"
                    />

                    <View className="flex-1 ml-3">
                        <Text
                            className={`
                                                text-base font-semibold
                                                ${theme === 'dark' ? 'text-dark-text' : 'text-light-text'}
                                            `}
                        >
                            {item.title}
                        </Text>
                        <Text
                            className={`
                                                text-sm
                                                ${theme === 'dark' ? 'text-dark-text/60' : 'text-light-text/60'}
                                            `}
                        >
                            {item.artist}
                        </Text>
                    </View>

                    <Text
                        className={`
                                        text-sm
                                        ${theme === 'dark' ? 'text-dark-text/60' : 'text-light-text/60'}
                                        `}
                    >
                        {item.duration}
                    </Text>
                </View>
            </Swipeable>
        );
    };


    const songs: Song[] = [
        {
            id: '1',
            title: '505',
            artist: 'Arctic Monkeys',
            cover: 'https://picsum.photos/60/60?random=1',
            duration: '4:13',
        },
        {
            id: '2',
            title: 'When Our Time is Over',
            artist: 'The Reality of Yourself',
            cover: 'https://picsum.photos/60/60?random=2',
            duration: '3:45',
        },
        {
            id: '3',
            title: 'Back Home',
            artist: 'Blacktop Mojo',
            cover: 'https://picsum.photos/60/60?random=3',
            duration: '5:20',
        },
        {
            id: '4',
            title: 'Stop Crying Your Heart Out',
            artist: 'Oasis',
            cover: 'https://picsum.photos/60/60?random=4',
            duration: '5:03',
        },
        {
            id: '5',
            title: 'Snuff',
            artist: 'Slipknot',
            cover: 'https://picsum.photos/60/60?random=5',
            duration: '4:36',
        },
        {
            id: '6',
            title: 'The Man Who Sold The World',
            artist: 'Deep Purple',
            cover: 'https://picsum.photos/60/60?random=6',
            duration: '6:22',
        },
        {
            id: '7',
            title: 'The Man Who Sold The World',
            artist: 'Deep Purple',
            cover: 'https://picsum.photos/60/60?random=7',
            duration: '6:22',
        },
        {
            id: '8',
            title: 'The Man Who Sold The World',
            artist: 'Deep Purple',
            cover: 'https://picsum.photos/60/60?random=8',
            duration: '6:22',
        },
        {
            id: '9',
            title: 'The Man Who Sold The World',
            artist: 'Deep Purple',
            cover: 'https://picsum.photos/60/60?random=9',
            duration: '6:22',
        },
        {
            id: '10',
            title: 'The Man Who Sold The World',
            artist: 'Deep Purple',
            cover: 'https://picsum.photos/60/60?random=10',
            duration: '6:22',
        },
        {
            id: '11',
            title: 'The Man Who Sold The World',
            artist: 'Deep Purple',
            cover: 'https://picsum.photos/60/60?random=11',
            duration: '6:22',
        },
        {
            id: '12',
            title: 'The Man Who Sold The World',
            artist: 'Deep Purple',
            cover: 'https://picsum.photos/60/60?random=12',
            duration: '6:22',
        },
        {
            id: '13',
            title: 'The Man Who Sold The World',
            artist: 'Deep Purple',
            cover: 'https://picsum.photos/60/60?random=13',
            duration: '6:22',
        },
        {
            id: '14',
            title: 'The Man Who Sold The World',
            artist: 'Deep Purple',
            cover: 'https://picsum.photos/60/60?random=14',
            duration: '6:22',
        },
    ];

    return (
        <ThemedView wrapper="safe-area" className="flex-1">
            <Header.Root className="p-4">
                <Header.Back />
                <Header.Title>Expenses</Header.Title>
                <Header.Wrapper>
                    <Header.Action name="dots-horizontal" size={size} onPress={() => setModalVisible(true)} />
                </Header.Wrapper>
            </Header.Root>

            <Modal.Root visible={modalVisible} onClose={() => setModalVisible(false)}>
                <Modal.Header title="Modal Title" />
                <Modal.View>
                    <FlatList
                        data={songs}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <ListItem item={item} />}
                    />
                </Modal.View>
            </Modal.Root>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        marginBottom: 2,
        backgroundColor: '#555555',
    },
    itemText: {
        fontSize: 15,
        fontWeight: '600',
    },
    actionsContainer: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    button: {
        width: 80,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    edit: {
        backgroundColor: '#ffab00',
    },
    delete: {
        backgroundColor: '#ff1744',
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
