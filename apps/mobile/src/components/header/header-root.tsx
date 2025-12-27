import { SafeAreaView } from "react-native-safe-area-context";

export default function HeaderRoot({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView className="flex-row items-center justify-between">
            {children}
        </SafeAreaView>
    );
}