import { ReactNode } from "react";
import { ThemedText } from "../themed";

interface SectionTextProps {
    children: ReactNode,
    flex?: number
}
export default function SectionText({ children, flex }: SectionTextProps) {
    return <ThemedText style={{ flex: flex ?? 1 }} className='text-xl font-bold'>{children}</ThemedText>
}