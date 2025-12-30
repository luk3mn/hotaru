import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderRootProps {
    children: React.ReactNode;
    wrapper?: 'safe-area' | 'view';
    className?: string;
}
export default function HeaderRoot({ children, wrapper, className }: HeaderRootProps) {

    const Wrapper = wrapper === 'safe-area' ? SafeAreaView : View;
    return (
        <Wrapper className={`flex-row items-center justify-between ${className || ''}`}>
            {children}
        </Wrapper>
    );
}