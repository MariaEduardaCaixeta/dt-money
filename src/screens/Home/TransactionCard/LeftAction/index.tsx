import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { colors } from "@/shared/colors";
import { ITransaction } from "@/shared/interfaces/transaction";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

interface Params {
    transaction: ITransaction;
}

export function LeftAction({ transaction }: Params) {
    const { openBottomSheet } = useBottomSheetContext();
  return (
    <Pressable onPress={() => {
        openBottomSheet(<></>, 1)
    }}>
        <View className="h-[140] bg-accent-blue w-[80] rounded-l-[6] items-center justify-center">
            <MaterialIcons name="edit" size={30} color={colors.white}/>
        </View>
    </Pressable>
  );
}