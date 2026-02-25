import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { colors } from "@/shared/colors";
import { ICreateTransactionRequest } from "@/shared/interfaces/create-transaction-request";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, ActivityIndicator } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { TransactionTypeSelector } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal/index.tsx";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { transactionSchema } from "./schema";
import * as yup from "yup";
import { AppButton } from "../AppButton";
import { ErrorMessage } from "../ErrorMessage";
import { useTransactionContext } from "@/context/transaction.context";

type ValidationErrorsType = Record<keyof ICreateTransactionRequest, string>;

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();
  const { createTransaction } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState<ICreateTransactionRequest>({
    description: "",
    typeId: 0,
    categoryId: 0,
    value: 0,
  });

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorsType>();

  const handleCreateTransaction = async () => {
    try {
      setLoading(true);
      await transactionSchema.validate(transaction, { abortEarly: false });
      await createTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {} as ValidationErrorsType;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof ICreateTransactionRequest] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        handleError(error, "Não foi possível criar a transação. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <AppButton onPress={handleCreateTransaction}>
            {
              loading ? <ActivityIndicator color={colors.white} /> : "Registrar"
            }
          </AppButton>
        </View>
      </View>
    </View>
  );
}
