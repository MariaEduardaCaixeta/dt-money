import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { colors } from "@/shared/colors";
import { ICreateTransactionRequest } from "@/shared/interfaces/create-transaction-request";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();

  const [transaction, setTransaction] = useState<ICreateTransactionRequest>({
    description: "",
    typeId: 0,
    categoryId: 0,
    value: 0,
  });

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">Nova transação</Text>
        <MaterialIcons name="close" size={20} color={colors.gray[700]} />
      </TouchableOpacity>
    </View>
  );
}
