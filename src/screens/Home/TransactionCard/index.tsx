import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/enums/transaction-types";
import { ITransaction } from "@/shared/interfaces/transaction";
import { MaterialIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { format } from "date-fns";
import { Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { RightAction } from "./RightAction";
import { LeftAction } from "./LeftAction";

interface Params {
  transaction: ITransaction;
}

export function TransactionCard({ transaction }: Params) {
  const isExpense = transaction.type.id === TransactionTypes.EXPENSE;

  return (
    <Swipeable
      containerStyle={{
        alignItems: "center",
        alignSelf: "center",
        overflow: "visible",
        width: "90%",
        marginBottom: 16,
      }}
      renderRightActions={() => <RightAction transactionId={transaction.id} />}
      renderLeftActions={() => <LeftAction transaction={transaction}/>}
      overshootLeft={false}
      overshootRight={false}
    >
      <View className="h-[140] bg-background-tertiary rounded-[6] p-6">
        <Text className="text-base text-white">{transaction.description}</Text>
        <Text className={clsx("text-2xl font-bold mt-2", isExpense ? "text-accent-red" : "text-accent-brand-light")}>
          {isExpense && "-"} R${" "}
          {transaction.value.toFixed(2).replace(".", ",")}
        </Text>
        <View className="flex-row w-full justify-between items-center">
          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="label-outline"
              color={colors.gray[700]}
              size={23}
            />
            <Text className="text-gray-700 text-base ml-2">
              {transaction.category.name}
            </Text>
          </View>

          <View className="items-center flex-row mt-3">
            <MaterialIcons
              name="calendar-month"
              color={colors.gray[700]}
              size={20}
            />
            <Text className="text-gray-700 text-base ml-2">
              {format(transaction.createdAt, "dd/MM/yyyy")}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}
