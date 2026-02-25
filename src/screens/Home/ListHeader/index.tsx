import { AppHeader } from "@/components/AppHeader";
import { ScrollView, View } from "react-native";
import { TransactionCard } from "./TransactionCard";

export function ListHeader() {
  return (
    <>
      <AppHeader />

      <View className="h-[150] w-full">
        <View className="h-[50] bg-background-primary" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141]"
        >
          <TransactionCard type="total" amount={0} />
        </ScrollView>
      </View>
    </>
  );
}
