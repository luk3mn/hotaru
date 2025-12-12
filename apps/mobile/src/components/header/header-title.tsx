import { ThemedText } from "../themed";



export default function HeaderTitle({ children }: { children: React.ReactNode }) {
    return (
        <ThemedText className="text-2xl mt-1 font-bold">
            {children}
        </ThemedText>
    );
}