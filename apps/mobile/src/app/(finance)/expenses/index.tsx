import { Header } from "@/components/header";
import { Modal } from "@/components/modal";
import FloatButton from "@/components/float-button";
import { ThemedText, ThemedView } from "@/components/themed";
import { getColorScheme } from "@/lib/color-schema";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TransactionFilter = "all" | "income" | "expense" | "transfer";
type TransactionKind = "income" | "expense" | "transfer";
type EntryCategoryType = "expense" | "incoming" | "investment" | "payments" | "goals";
type SummaryCategory = "Shopping" | "Food & Drink" | "Subscription" | "Education" | "Others";

interface ExpenseItem {
  id: string;
  title: string;
  subcategory: string;
  amount: number;
  kind: TransactionKind;
  entryType: EntryCategoryType;
  summaryCategory: SummaryCategory;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  occurredAt: string;
}

const filters: { key: TransactionFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "income", label: "Income" },
  { key: "expense", label: "Expense" },
  { key: "transfer", label: "Transfer" },
];

const entryTypeOptions: EntryCategoryType[] = [
  "expense",
  "incoming",
  "investment",
  "payments",
  "goals",
];

const entryTypeLabel: Record<EntryCategoryType, string> = {
  expense: "Expense",
  incoming: "Incoming",
  investment: "Investment",
  payments: "Payments",
  goals: "Goals",
};

const subcategoryOptions: Record<EntryCategoryType, string[]> = {
  expense: ["Supermarket", "Lunch", "Dinner", "Breakfast", "Transport"],
  incoming: ["Salary", "Freelance", "Bonus", "Gift", "Refund"],
  investment: ["Stocks", "Crypto", "Bonds", "ETF", "Savings"],
  payments: ["Rent", "Credit Card", "Electricity", "Internet", "Insurance"],
  goals: ["Emergency Fund", "Vacation", "New Phone", "Course", "House"],
};

const categoryIconMap: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Subscription: "youtube",
  Salary: "bank-transfer-in",
  Freelance: "briefcase-outline",
  Supermarket: "cart-outline",
  Lunch: "food-fork-drink",
  Dinner: "silverware-fork-knife",
  Breakfast: "coffee-outline",
  Stocks: "chart-line",
  Crypto: "currency-btc",
  Rent: "home-city-outline",
  "Credit Card": "credit-card-outline",
  Electricity: "lightning-bolt-outline",
  "Emergency Fund": "shield-check-outline",
};

const expensesMock: ExpenseItem[] = [
  {
    id: "1",
    title: "Youtube Premium",
    subcategory: "Subscription",
    amount: 44.9,
    kind: "expense",
    entryType: "expense",
    summaryCategory: "Subscription",
    icon: "youtube",
    occurredAt: "2025-12-21",
  },
  {
    id: "2",
    title: "Transfer From Sayuti",
    subcategory: "Salary",
    amount: 3500,
    kind: "income",
    entryType: "incoming",
    summaryCategory: "Others",
    icon: "bank-transfer-in",
    occurredAt: "2025-12-21",
  },
  {
    id: "3",
    title: "Apple Music",
    subcategory: "Subscription",
    amount: 21.9,
    kind: "expense",
    entryType: "expense",
    summaryCategory: "Subscription",
    icon: "music-note",
    occurredAt: "2025-12-20",
  },
  {
    id: "4",
    title: "Transfer From Zahra",
    subcategory: "Freelance",
    amount: 950,
    kind: "income",
    entryType: "incoming",
    summaryCategory: "Others",
    icon: "briefcase-outline",
    occurredAt: "2025-12-20",
  },
  {
    id: "5",
    title: "Twitch Premium",
    subcategory: "Subscription",
    amount: 32.5,
    kind: "expense",
    entryType: "expense",
    summaryCategory: "Subscription",
    icon: "twitch",
    occurredAt: "2025-12-20",
  },
  {
    id: "6",
    title: "Supermarket",
    subcategory: "Supermarket",
    amount: 278.2,
    kind: "expense",
    entryType: "expense",
    summaryCategory: "Shopping",
    icon: "cart-outline",
    occurredAt: "2025-12-19",
  },
  {
    id: "7",
    title: "Course Platform",
    subcategory: "Education",
    amount: 129.9,
    kind: "expense",
    entryType: "goals",
    summaryCategory: "Education",
    icon: "school-outline",
    occurredAt: "2025-12-19",
  },
];

function formatGroupDate(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return {
    day: date.getDate(),
    weekday,
    fullDate: `${month}.${year}`,
  };
}

function formatHeaderDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatInputDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function mapSubcategoryToSummaryCategory(subcategory: string): SummaryCategory {
  const shopping = ["Supermarket", "Transport"];
  const food = ["Lunch", "Dinner", "Breakfast"];
  const subscription = ["Subscription", "Internet", "Insurance", "Credit Card"];
  const education = ["Course", "Education"];

  if (shopping.includes(subcategory)) return "Shopping";
  if (food.includes(subcategory)) return "Food & Drink";
  if (subscription.includes(subcategory)) return "Subscription";
  if (education.includes(subcategory)) return "Education";
  return "Others";
}

export default function Expenses() {
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>("all");
  const [transactions, setTransactions] = useState<ExpenseItem[]>(expensesMock);
  const [modalVisible, setModalVisible] = useState(false);

  const [entryType, setEntryType] = useState<EntryCategoryType>("expense");
  const [subCategory, setSubCategory] = useState(subcategoryOptions.expense[0]);
  const [name, setName] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const { schema } = getColorScheme();

  const categoryColors = useMemo(
    () => ({
      Shopping: schema.blue,
      "Food & Drink": schema.green,
      Subscription: schema.yellow,
      Education: schema.red,
      Others: schema.overlay0,
    }),
    [schema]
  );

  const filteredData = useMemo(() => {
    if (activeFilter === "all") return transactions;
    return transactions.filter((item) => item.kind === activeFilter);
  }, [activeFilter, transactions]);

  const totalSpend = useMemo(() => {
    return filteredData
      .filter((item) => item.kind === "expense")
      .reduce((sum, item) => sum + item.amount, 0);
  }, [filteredData]);

  const groupedByDay = useMemo(() => {
    const groups = new Map<string, ExpenseItem[]>();

    filteredData.forEach((item) => {
      if (!groups.has(item.occurredAt)) {
        groups.set(item.occurredAt, []);
      }
      groups.get(item.occurredAt)?.push(item);
    });

    return [...groups.entries()].sort(
      (a, b) => new Date(`${b[0]}T00:00:00`).getTime() - new Date(`${a[0]}T00:00:00`).getTime()
    );
  }, [filteredData]);

  const categoryTotals = useMemo(() => {
    const totals: Record<SummaryCategory, number> = {
      Shopping: 0,
      "Food & Drink": 0,
      Subscription: 0,
      Education: 0,
      Others: 0,
    };

    filteredData
      .filter((item) => item.kind === "expense")
      .forEach((item) => {
        totals[item.summaryCategory] += item.amount;
      });

    return totals;
  }, [filteredData]);

  const totalForBars = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);

  const formIsValid = name.trim().length > 0 && Number(amountInput.replace(",", ".")) > 0;

  const openCreateModal = () => {
    setModalVisible(true);
  };

  const changeDateByDays = (delta: number) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + delta);
    setSelectedDate(next);
  };

  const onEntryTypeChange = (type: EntryCategoryType) => {
    setEntryType(type);
    setSubCategory(subcategoryOptions[type][0]);
  };

  const handleAddTransaction = () => {
    const parsedAmount = Number(amountInput.replace(",", "."));
    if (!name.trim() || !parsedAmount || parsedAmount <= 0) return;

    const occurredAt = selectedDate.toISOString().slice(0, 10);
    const summaryCategory = mapSubcategoryToSummaryCategory(subCategory);

    const newItem: ExpenseItem = {
      id: `${Date.now()}`,
      title: name.trim(),
      subcategory: subCategory,
      amount: parsedAmount,
      kind: entryType === "incoming" ? "income" : "expense",
      entryType,
      summaryCategory,
      icon: categoryIconMap[subCategory] || "cash-multiple",
      occurredAt,
    };

    setTransactions((prev) => [newItem, ...prev]);
    setModalVisible(false);

    setEntryType("expense");
    setSubCategory(subcategoryOptions.expense[0]);
    setName("");
    setAmountInput("");
    setSelectedDate(new Date());
  };

  return (
    <ThemedView wrapper="safe-area" className="flex-1">
      <View className="px-4 pt-2 pb-1">
        <Header.Root className="px-0 py-2">
          <Header.Back />
          <Header.Title>Expenses</Header.Title>
          <TouchableOpacity className="p-2 rounded-full dark:bg-dark-surface1 bg-light-surface1">
            <MaterialCommunityIcons name="magnify" size={22} color={schema.text} />
          </TouchableOpacity>
        </Header.Root>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between mt-2">
          <TouchableOpacity className="w-11 h-11 rounded-full items-center justify-center dark:bg-dark-surface1 bg-light-surface1">
            <MaterialCommunityIcons name="calendar-month-outline" size={22} color={schema.overlay2} />
          </TouchableOpacity>

          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons name="chevron-left" size={22} color={schema.overlay2} />
            <ThemedText className="text-lg font-semibold">{formatHeaderDate(new Date("2025-12-21"))}</ThemedText>
            <MaterialCommunityIcons name="chevron-right" size={22} color={schema.overlay2} />
          </View>

          <View className="w-11 h-11" />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2 mt-4"
        >
          {filters.map((filter) => {
            const selected = filter.key === activeFilter;
            return (
              <TouchableOpacity
                key={filter.key}
                onPress={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 rounded-full border ${
                  selected
                    ? "dark:bg-dark-crust dark:border-dark-crust bg-light-text border-light-text"
                    : "dark:bg-dark-surface1 dark:border-dark-surface2 bg-light-surface1 border-light-surface2"
                }`}
              >
                <Text
                  className={`text-sm ${
                    selected ? "text-white dark:text-white" : "dark:text-dark-text/80 text-light-text/80"
                  }`}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <ThemedText className="text-base">Total Spend</ThemedText>
            <ThemedText className="text-2xl font-bold">
              {Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalSpend)}
            </ThemedText>
          </View>

          <View className="w-full h-7 rounded-xl overflow-hidden flex-row dark:bg-dark-surface1 bg-light-surface1">
            {Object.entries(categoryTotals).map(([category, amount]) => {
              const width = totalForBars === 0 ? 0 : (amount / totalForBars) * 100;
              if (width <= 0) return null;
              return (
                <View
                  key={category}
                  style={{
                    width: `${width}%`,
                    backgroundColor: categoryColors[category as keyof typeof categoryColors],
                  }}
                />
              );
            })}
          </View>

          <View className="flex-row flex-wrap gap-x-6 gap-y-2 mt-3">
            {Object.entries(categoryColors).map(([category, color]) => (
              <View key={category} className="flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <ThemedText className="text-sm">{category}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-6">
          {groupedByDay.map(([dateKey, items]) => {
            const dateInfo = formatGroupDate(dateKey);
            return (
              <View key={dateKey} className="mb-6">
                <View className="flex-row items-center mb-4">
                  <ThemedText className="text-3xl font-bold mr-2">{dateInfo.day}</ThemedText>
                  <ThemedText className="text-base">{dateInfo.weekday}</ThemedText>
                  <ThemedText className="text-base ml-2">{dateInfo.fullDate}</ThemedText>
                  <View className="flex-1 h-px ml-3 dark:bg-dark-surface2 bg-light-surface2" />
                </View>

                {items.map((item) => {
                  const isIncome = item.kind === "income";
                  const amountColor = isIncome ? schema.green : schema.text;
                  return (
                    <View key={item.id} className="flex-row items-center mb-4">
                      <View className="w-12 h-12 rounded-full items-center justify-center dark:bg-dark-surface1 bg-light-surface1">
                        <MaterialCommunityIcons
                          name={item.icon}
                          size={23}
                          color={categoryColors[item.summaryCategory]}
                        />
                      </View>

                      <View className="flex-1 ml-3">
                        <ThemedText className="text-xl font-medium">{item.title}</ThemedText>
                        <ThemedText className="text-base opacity-70">{item.subcategory}</ThemedText>
                      </View>

                      <Text style={{ color: amountColor, fontSize: 16, fontWeight: "700" }}>
                        {isIncome ? "+" : "-"}
                        {Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.amount)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <FloatButton onPress={openCreateModal} />

      <Modal.Root visible={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Header title="Add Transaction" />

        <Modal.Scroll contentContainerClassName="px-4" showsVerticalScrollIndicator={false}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
              {entryTypeOptions.map((option) => {
                const selected = option === entryType;
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() => onEntryTypeChange(option)}
                    className={`px-4 py-2 rounded-full border ${
                      selected
                        ? "dark:bg-dark-mauve dark:border-dark-mauve bg-light-blue border-light-blue"
                        : "dark:bg-dark-surface1 dark:border-dark-surface2 bg-light-surface1 border-light-surface2"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        selected ? "text-white" : "dark:text-dark-text/80 text-light-text/80"
                      }`}
                    >
                      {entryTypeLabel[option]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View>
              <ThemedText className="text-sm opacity-70 mb-2">Amount</ThemedText>
              <View className="rounded-2xl p-4 dark:bg-dark-surface1 bg-light-surface1">
                <TextInput
                  placeholder="0.00"
                  placeholderTextColor={schema.overlay1}
                  keyboardType="decimal-pad"
                  value={amountInput}
                  onChangeText={setAmountInput}
                  className="text-5xl font-bold dark:text-dark-text text-light-text"
                />
              </View>
            </View>

            <View>
              <ThemedText className="text-sm opacity-70 mb-2">Name</ThemedText>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Type transaction name"
                placeholderTextColor={schema.overlay1}
                className="rounded-xl px-4 py-3 dark:bg-dark-surface1 bg-light-surface1 dark:text-dark-text text-light-text"
              />
            </View>

            <View>
              <ThemedText className="text-sm opacity-70 mb-2">Subcategory</ThemedText>
              <View className="flex-row flex-wrap gap-2">
                {subcategoryOptions[entryType].map((option) => {
                  const selected = option === subCategory;
                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => setSubCategory(option)}
                      className={`px-3 py-2 rounded-lg border ${
                        selected
                          ? "dark:bg-dark-blue/25 dark:border-dark-blue bg-light-blue/20 border-light-blue"
                          : "dark:bg-dark-surface1 dark:border-dark-surface2 bg-light-surface1 border-light-surface2"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          selected
                            ? "dark:text-dark-text text-light-text"
                            : "dark:text-dark-text/70 text-light-text/70"
                        }`}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View>
              <ThemedText className="text-sm opacity-70 mb-2">Date</ThemedText>
              <View className="flex-row items-center justify-between rounded-xl px-3 py-3 dark:bg-dark-surface1 bg-light-surface1">
                <TouchableOpacity
                  onPress={() => changeDateByDays(-1)}
                  className="w-9 h-9 rounded-full items-center justify-center dark:bg-dark-surface2 bg-light-surface2"
                >
                  <MaterialCommunityIcons name="chevron-left" size={20} color={schema.text} />
                </TouchableOpacity>

                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons name="calendar-month-outline" size={19} color={schema.text} />
                  <ThemedText className="text-base font-medium">{formatInputDate(selectedDate)}</ThemedText>
                </View>

                <TouchableOpacity
                  onPress={() => changeDateByDays(1)}
                  className="w-9 h-9 rounded-full items-center justify-center dark:bg-dark-surface2 bg-light-surface2"
                >
                  <MaterialCommunityIcons name="chevron-right" size={20} color={schema.text} />
                </TouchableOpacity>
              </View>
            </View>
        </Modal.Scroll>

        <Modal.Footer>
          <TouchableOpacity
            onPress={handleAddTransaction}
            disabled={!formIsValid}
            className={`w-full py-4 rounded-full items-center ${
              formIsValid
                ? "dark:bg-dark-mauve bg-light-blue"
                : "dark:bg-dark-surface2 bg-light-surface2"
            }`}
          >
            <Text className={`text-base font-semibold ${formIsValid ? "text-white" : "dark:text-dark-text/50 text-light-text/50"}`}>
              Add Transaction
            </Text>
          </TouchableOpacity>
        </Modal.Footer>
      </Modal.Root>
    </ThemedView>
  );
}
