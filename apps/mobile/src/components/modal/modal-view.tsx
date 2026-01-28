import { useWindowDimensions, View } from 'react-native';

interface ModalViewProps {
    children: React.ReactNode
    className?: string,
    height?: number
}

export default function ModalView({ children, className, height }: ModalViewProps) {
    const { height: screenHeight } = useWindowDimensions();
    
    return (
        <View className={className} style={{ height: height ?? screenHeight*0.5 }}>
            {children}
        </View>
    );
}