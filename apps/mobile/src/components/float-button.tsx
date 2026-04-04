import { Calendar, ChevronDown, Delete, Dot, GalleryVerticalEnd, PlusIcon } from "lucide-react-native";
import { Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Modal } from "./modal";
import { useState } from "react";
import { formatCurrency } from "@/i18n/i18n";
import { getColorScheme } from "@/lib/color-schema";

function normalizeAmountInput(value: string) {
    const sanitized = value.replace(/[^0-9.]/g, "");
    const [integerPart = "", ...decimalParts] = sanitized.split(".");
    const decimalPart = decimalParts.join("").slice(0, 2);
    const normalizedInteger = integerPart.replace(/^0+(?=\d)/, "") || "0";

    if (sanitized.includes(".")) {
        return `${normalizedInteger}.${decimalPart}`;
    }

    return normalizedInteger;
}

export default function FloatButton({ onPress }: { onPress?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [digits, setDigits] = useState("0");
    const hasValue = Number(digits) > 0;
    const { schema } = getColorScheme();
    const { height } = useWindowDimensions();

    const handleOpen = () => {
        setIsOpen(true);
        onPress?.();
    };

    const handleAppendDigit = (value: string) => {
        setDigits((prev) => {
            if (value === ".") {
                if (prev.includes(".")) return prev;
                return `${prev}.`;
            }

            if (prev === "0") {
                return value;
            }

            if (prev.includes(".")) {
                const [integer, decimal = ""] = prev.split(".");

                if (decimal.length >= 2) return prev;

                return `${integer}.${decimal}${value}`;
            }

            return normalizeAmountInput(`${prev}${value}`);
        });
    };

    const handleDelete = () => {
        if (!hasValue) return;

        setDigits((prev) => {
            const next = prev.slice(0, -1);
            if (!next.length) return "0";
            if (next.endsWith(".")) return next;
            return normalizeAmountInput(next);
        });
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = () => {
        if (!hasValue) return;
        setIsOpen(false);
    };

    return (
        <>
            <TouchableOpacity onPress={handleOpen} className="absolute opacity-85 bottom-10 right-10 mb-4 bg-light-flamingo dark:bg-dark-mauve text-white rounded-full p-4 shadow-lg">
                <PlusIcon size={24} color="#fff" />
            </TouchableOpacity>
            <Modal.Root visible={isOpen} onClose={handleClose}>
                <Modal.Header title="Add Transaction" />

                <Modal.View height={height * 0.57} >
                    <View className="items-center justify-center p-12">
                        <Text className="font-ubuntu-bold text-2xl text-light-text dark:text-dark-text">{formatCurrency(Number(digits))}</Text>
                    </View>
                    <View className="flex-row items-center justify-center gap-2">
                        <TouchableOpacity className="w-[46%] flex-row justify-between p-4 gap-2 rounded-2xl bg-light-surface1 dark:bg-dark-surface1">
                            <GalleryVerticalEnd size={20} color={schema.lavender} />
                            <Text className="text-light-lavender dark:text-dark-lavender text-md">Subscription</Text>
                            <ChevronDown size={20} color={schema.lavender} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[46%] flex-row justify-between p-4 gap-2 rounded-2xl bg-light-surface1 dark:bg-dark-surface1">
                            <Calendar size={20} color={schema.lavender} />
                            <Text className="text-light-lavender dark:text-dark-lavender text-md">{new Date().toLocaleDateString()}</Text>
                            <ChevronDown size={20} color={schema.lavender} />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row flex-wrap justify-center gap-4 mx-3 mt-6">
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                            <TouchableOpacity key={num} onPress={() => handleAppendDigit(num.toString())} className="w-[30%] py-6 items-center justify-center bg-dark-text/5 dark:bg-dark-text/5 text-white rounded-2xl">
                                <Text className="text-light-lavender dark:text-dark-lavender text-md">{num}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => handleAppendDigit('.')} className="w-[30%] py-6 items-center justify-center bg-dark-text/5 dark:bg-dark-text/5 text-white rounded-2xl">
                            <Dot size={20} color={schema.lavender} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAppendDigit('0')} className="w-[30%] py-6 items-center justify-center bg-dark-text/5 dark:bg-dark-text/5 text-white rounded-2xl">
                            <Text className="text-light-lavender dark:text-dark-lavender text-md">0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete()} className="w-[30%] py-6 items-center justify-center bg-dark-text/5 dark:bg-dark-text/5 text-white rounded-2xl">
                            <Delete size={20} color={schema.lavender} />
                        </TouchableOpacity>
                    </View>
                </Modal.View>

                <Modal.Footer>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={!hasValue}
                        className={`w-full py-4 rounded-full items-center justify-center ${hasValue ? "bg-light-flamingo dark:bg-dark-mauve" : "bg-light-surface1 dark:bg-dark-surface1"}`}
                    >
                        <Text className={`text-base font-semibold ${hasValue ? "text-white" : "dark:text-dark-text/50 text-light-text/50"}`}>
                            Add Transaction
                        </Text>
                    </TouchableOpacity>
                </Modal.Footer>
            </Modal.Root>
        </>
    );
}
