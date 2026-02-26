import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, ActivityIndicator } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import * as yup from "yup";
import { useTransactionContext } from "@/context/transaction.context";
import { AppButton } from "@/components/AppButton";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SelectCategoryModal } from "@/components/SelectCategoryModal/index.tsx";
import { TransactionTypeSelector } from "@/components/SelectType";
import { transactionSchema } from "./schema";
import { IUpdateTransactionRequest } from "@/shared/interfaces/update-transaction-request";

type ValidationErrorsType = Record<keyof IUpdateTransactionRequest, string>;

interface Params {
    transaction: IUpdateTransactionRequest;
}

export function EditTransactionForm({ transaction: transactionToUpdate }: Params) {
  const { closeBottomSheet } = useBottomSheetContext();
  const { updateTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState<IUpdateTransactionRequest>({
    id: transactionToUpdate.id,
    description: transactionToUpdate.description,
    typeId: transactionToUpdate.typeId,
    categoryId: transactionToUpdate.categoryId,
    value: transactionToUpdate.value,
  });

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsType>();

  const handleUpdateTransaction = async () => {
    try {
      setLoading(true);
      await transactionSchema.validate(transaction, { abortEarly: false });
      await updateTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {} as ValidationErrorsType;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof IUpdateTransactionRequest] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        handleError(error, "Não foi possível atualizar a transação. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  const setTransactionData = (
    key: keyof IUpdateTransactionRequest,
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
        <Text className="text-white text-xl font-bold">Editar transação</Text>
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
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}

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
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelectCategory={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />

        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}

        <TransactionTypeSelector
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
          typeId={transaction.typeId}
        />

        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}

        <View className="my-4">
          <AppButton onPress={handleUpdateTransaction}>
            {
              loading ? <ActivityIndicator color={colors.white} /> : "Atualizar"
            }
          </AppButton>
        </View>
      </View>
    </View>
  );
}
