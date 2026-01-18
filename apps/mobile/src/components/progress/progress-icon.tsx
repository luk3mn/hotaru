import { getIconSize } from "@/lib/dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { useProgress } from "./progress-context";

interface ProgressIconProps {
    name: ComponentProps<typeof MaterialCommunityIcons>['name'];
    size?: number;
    color?: string;
    useContextColor?: boolean;
}

export default function ProgressIcon({ 
    name, 
    size, 
    color, 
    useContextColor = true 
}: ProgressIconProps) {
    const iconSize = getIconSize(size);
    const { currentColor } = useProgress();
    
    const finalColor = color || (useContextColor ? currentColor : undefined);
    
    return (
        <MaterialCommunityIcons 
            name={name} 
            size={iconSize} 
            color={finalColor} 
        />
    );
}