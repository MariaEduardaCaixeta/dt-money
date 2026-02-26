import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useState } from "react";
import { format, isValid } from "date-fns";
import { useTransactionContext } from "@/context/transaction.context";
import { ptBR } from "date-fns/locale";
import clsx from "clsx";

export function DateFilter() {
  const { filters, handleFilters } = useTransactionContext();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartCancel = () => {
    setShowStartDatePicker(false);
  };

  const onStartConfirm = (date: Date) => {
    handleFilters({ key: "from", value: date });
    setShowStartDatePicker(false);
  };

  const onEndConfirm = (date: Date) => {
    handleFilters({ key: "to", value: date });
    setShowEndDatePicker(false);
  };

  const onEndCancel = () => {
    setShowEndDatePicker(false);
  };

  const formatDate = (date: Date) => {
    if(!date || !isValid(date)) return "Selecionar data";
    return format(date, "dd/MM/yyyy", {
        locale: ptBR
    });
  };

  return (
    <>
      <Text className="text-gray-700 text-lg mb-6">Data</Text>
      <View className="flex-row justify-between mb-6">
        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md p-2 border-b border-gray-800"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text className={clsx("text-lg", filters.from ? "text-white" : "text-gray-700")}>
              {filters.from ? formatDate(filters.from) : "De"}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md p-2 border-b border-gray-800"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text className={clsx("text-lg", filters.to ? "text-white" : "text-gray-700")}>
              {filters.to ? formatDate(filters.to) : "Até"}
            </Text>
          </TouchableOpacity>
        </View>

        <DateTimePicker
          isVisible={showStartDatePicker}
          date={filters.from}
          onConfirm={onStartConfirm}
          onCancel={onStartCancel}
          mode="date"
          confirmTextIOS="Confirmar"
          cancelTextIOS="Cancelar"
          locale="pt_BR"
        />

        <DateTimePicker
          isVisible={showEndDatePicker}
          date={filters.to}
          onConfirm={onEndConfirm}
          onCancel={onEndCancel}
          mode="date"
          confirmTextIOS="Confirmar"
          cancelTextIOS="Cancelar"
          locale="pt_BR"
        />
      </View>
    </>
  );
}
