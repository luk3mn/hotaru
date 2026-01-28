import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

interface SwipeableListProps {
    swipeableItem: (item: any) => React.ReactNode;
    renderRightActions: () => React.ReactNode;
    data: Array<{ id: string;[key: string]: any }>;
}

export default function SwipeableList({ swipeableItem, renderRightActions, data }: SwipeableListProps) {
    const ListItem = ({ item }: { item: any }) => {
        return (
            <Swipeable renderRightActions={renderRightActions}>
                {swipeableItem(item)}
            </Swipeable>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ListItem item={item} />}
            />
        </GestureHandlerRootView>
    )
}