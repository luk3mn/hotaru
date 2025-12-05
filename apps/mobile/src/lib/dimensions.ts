import { Dimensions } from "react-native";


export function getIconSize(size?: number) {
    const { width } = Dimensions.get('window');
    return Math.round((width * 0.06) * (size || 1));
}

export function getFontSize(size?: number) {
    const { width } = Dimensions.get('window');
    return Math.round((width * 0.06) * (size || 1));
}

export function getPadding(size?: number) {
    const { width } = Dimensions.get('window');
    return Math.round((width * 0.06) * (size || 1));
}

