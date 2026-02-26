import { useTransactionContext } from "@/context/transaction.context";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import Checkbox from "expo-checkbox";
import { View, Text, TouchableOpacity } from "react-native";

export function TypeFilter() {
  const { filters, handleFilters } = useTransactionContext();

  const selectType = (typeId: TransactionTypes) => {
    handleFilters({ key: "typeId", value: typeId });
  };

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">
        Tipo de transação
      </Text>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionTypes.REVENUE)}
      >
        <Checkbox
          className="mr-4"
          value={filters.typeId === TransactionTypes.REVENUE}
          onValueChange={() => selectType(TransactionTypes.REVENUE)}
        />
        <Text className="text-lg text-white">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionTypes.EXPENSE)}
      >
        <Checkbox
          className="mr-4"
          value={filters.typeId === TransactionTypes.EXPENSE}
          onValueChange={() => selectType(TransactionTypes.EXPENSE)}
        />
        <Text className="text-lg text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  );
}
