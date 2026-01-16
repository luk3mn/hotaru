import { Dimensions } from "react-native";

export function useIconSize(size?: number) {
    const { width } = Dimensions.get('window');
    
    return { size: Math.round((width * 0.06) * (size ?? 1.5)) };
}

export function useImageSize(width: number, height: number) {
    return {
        width: Math.round(Dimensions.get('window').width * width),
        height: Math.round(Dimensions.get('window').width * height),
    };
}
