import { createContext, useContext, ReactNode, useState } from "react";
import { getColorScheme } from "@/lib/color-schema";

type ColorConfig = 
    | string  // Cor única
    | {       // Cores baseadas em porcentagem
        high?: string;      // >= 80%
        medium?: string;    // >= 50%
        low?: string;       // >= 25%
        critical?: string;  // < 25%
    };

type ProgressContextType = {
    color: ColorConfig;
    percentage: number;
    setPercentage: (value: number) => void;
    getBarColor: (percentage?: number) => string;
    currentColor: string;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within ProgressProvider');
    }
    return context;
}

interface ProgressProviderProps {
    children: ReactNode;
    color?: ColorConfig;
}

export const ProgressProvider = ({ children, color }: ProgressProviderProps) => {
    const { schema } = getColorScheme();
    const [percentage, setPercentage] = useState(0);

    const getBarColor = (percentageOverride?: number): string => {
        const percent = percentageOverride ?? percentage;
        
        if (typeof color === 'string') {
            return color;
        }

        if (color && typeof color === 'object') {
            if (percent >= 80 && color.high) return color.high;
            if (percent >= 50 && color.medium) return color.medium;
            if (percent >= 25 && color.low) return color.low;
            if (color.critical) return color.critical;
        }

        if (percent >= 80) return schema.green;
        if (percent >= 50) return schema.yellow;
        if (percent >= 25) return schema.peach;
        return schema.red;
    };

    const currentColor = getBarColor();

    return (
        <ProgressContext.Provider value={{ 
            color: color || schema.lavender, 
            percentage,
            setPercentage,
            getBarColor,
            currentColor
        }}>
            {children}
        </ProgressContext.Provider>
    )
}