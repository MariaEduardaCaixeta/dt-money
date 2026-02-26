import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { DateFilter } from "./DateFilter";
import { CategoryFilter } from "./CategoryFilter";
import { TypeFilter } from "./TypeFilter";
import { AppButton } from "@/components/AppButton";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

export const TransactionFilters = () => {
  const { closeBottomSheet } = useBottomSheetContext();
  const { fetchTransactions, handleLoadings, resetFilters } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });

      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error);
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  };

  const handleResetFilters = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      resetFilters();
    } catch (error) {
      handleError(error, "Não foi possível resetar os filtros");
    } finally {
      handleLoadings({ key: "refresh", value: false });
      closeBottomSheet();
    }
  };

  return (
    <View className="flex-1 bg-gray-1000 p-6">
      <View className="flex-row justify-between">
        <Text className="text-xl font-bold mb-5 text-white">
          Filtrar transações
        </Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>

      <DateFilter />

      <CategoryFilter />

      <TypeFilter />

      <View className="flex-row gap-4 mt-8">
        <AppButton mode="outline" widthFull={false} className="flex-1" onPress={handleResetFilters}>
          Limpar filtros
        </AppButton>
        <AppButton widthFull={false} className="flex-1" onPress={handleFetchTransactions}>
          Filtrar
        </AppButton>
      </View>
    </View>
  );
};
