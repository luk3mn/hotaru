import { ScrollView } from 'react-native';

export default function ModalScroll({ children }: { children: React.ReactNode }) {
    return (
        <ScrollView
            className="px-4"
            showsVerticalScrollIndicator={false}
        >
            {children}
        </ScrollView>
    );
}