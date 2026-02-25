import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  setTransactionType: (type: TransactionTypes) => void;
  typeId: number;
}

export function TransactionTypeSelector({ setTransactionType, typeId }: Props) {
  return (
    <View className="flex-row justify-between gap-2 mt-4">
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionTypes.REVENUE)}
        className={clsx(
          'flex-row items-center p-2 flex-1 justify-center h-[58px] rounded-md',
          typeId === TransactionTypes.REVENUE
            ? 'bg-accent-brand-background-primary'
            : 'bg-background-tertiary',
        )}
      >
        <MaterialIcons
          name="arrow-circle-up"
          color={
            typeId === TransactionTypes.REVENUE
              ? colors.white
              : colors['accent-brand-light']
          }
          size={24}
          className="mr-2"
        />
        <Text className="text-white">Entrada</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTransactionType(TransactionTypes.EXPENSE)}
        className={clsx(
          'flex-row items-center p-2 flex-1 justify-center h-[58px] rounded-md',
          typeId === TransactionTypes.EXPENSE
            ? 'bg-accent-red-background-primary'
            : 'bg-background-tertiary',
        )}
      >
        <MaterialIcons
          name="arrow-circle-down"
          color={
            typeId === TransactionTypes.EXPENSE
              ? colors.white
              : colors['accent-red']
          }
          size={24}
          className="mr-2"
        />
        <Text className="text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  );
}
