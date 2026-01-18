// components/StatusHealth.tsx
import { getColorScheme } from '@/lib/color-schema';
import { Progress } from '../progress';

interface StatusHealthProps {
    current: number;
    max: number;
}

export default function CompactHealthBar({ current, max }: StatusHealthProps) {
    const { schema } = getColorScheme();

    return (
        <Progress.Root
            color={{
                high: schema.green,
                medium: schema.yellow,
                low: schema.peach,
                critical: schema.red,
            }}
        >
            <Progress.Icon name="flash" size={0.6} />
            <Progress.Bar current={current} toNextLevel={max} />
            <Progress.Label current={current} toNextLevel={max} position='absolute' />
        </Progress.Root>
    );
}