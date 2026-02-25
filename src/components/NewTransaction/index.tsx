import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { colors } from "@/shared/colors";
import { ICreateTransactionRequest } from "@/shared/interfaces/create-transaction-request";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import CurrencyInput from "react-native-currency-input";

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();

  const [transaction, setTransaction] = useState<ICreateTransactionRequest>({
    description: "",
    typeId: 0,
    categoryId: 0,
    value: 0,
  });

  const setTransactionData = (
    key: keyof ICreateTransactionRequest,
    value: string | number,
  ) => {
    setTransaction((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" size={20} color={colors.gray[700]} />
      </TouchableOpacity>

      <View className="flex-1 mt-8 mb-8">
        <TextInput
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData("description", text)}
        />

        <CurrencyInput 
            className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
            value={transaction.value}
            onChangeValue={(value) => setTransactionData("value", value ?? 0)}
            prefix="R$ "
            delimiter="."
            separator=","
            minValue={0}
            precision={2}
        />
      </View>
    </View>
  );
}
