import { ThemedText } from "../themed";

interface HeaderTitleProps {
    children: React.ReactNode;
    align?: 'left' | 'center' | 'right';
}

export default function HeaderTitle({ children, align = 'left' }: HeaderTitleProps) {
    return (
        <ThemedText className={`text-2xl font-ubuntu-bold uppercase ${align === 'center' ? 'self-center' : align === 'right' ? 'self-end' : 'self-start'}`}>
            {children}
        </ThemedText>
    );
}