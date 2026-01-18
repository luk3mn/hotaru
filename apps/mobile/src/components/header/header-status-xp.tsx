// components/StatusXP.tsx
import { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { FlaskConicalIcon } from 'lucide-react-native';
import { getIconSize } from '@/lib/dimensions';
import { getColorScheme } from '@/lib/color-schema';
import { Progress } from '../progress';

interface StatusXPProps {
    currentXP: number;        // Current XP (e.g., 850)
    xpToNextLevel: number;    // XP needed for next level (e.g., 1000)
    showLabel?: boolean;      // Show XP label
    showLevel?: boolean;      // Show level badge
    animated?: boolean;       // Enable animation
    size?: 'small' | 'medium' | 'large';
    onLevelUp?: () => void;   // Callback when leveling up
}

export default function CompactXPBar({
    currentXP,
    xpToNextLevel,
    showLabel = true,
}: StatusXPProps) {
    const { schema } = getColorScheme();

    return (
        <Progress.Root
            color={schema.lavender}
        >
            <Progress.Icon name="star" size={0.6} />
            <Progress.Bar current={currentXP} toNextLevel={xpToNextLevel} />
            <Progress.Label current={currentXP} toNextLevel={xpToNextLevel} position='absolute' />
        </Progress.Root>
    );
}
