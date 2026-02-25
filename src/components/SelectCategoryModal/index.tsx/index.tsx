import { useTransactionContext } from "@/context/transaction.context";
import clsx from "clsx";
import { useMemo, useState } from "react";
import {
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from "react-native";
import Checkbox from "expo-checkbox";

interface Props {
  selectedCategory: number;
  onSelectCategory: (categoryId: number) => void;
}

export function SelectCategoryModal({
  selectedCategory,
  onSelectCategory,
}: Props) {
  const [showModal, setShowModal] = useState(false);

  const { categories } = useTransactionContext();

  const handleModal = () => setShowModal((prev) => !prev);

  const selected = useMemo(
    () => categories.find(({ id }) => id === selectedCategory),
    [selectedCategory, categories],
  );

  const handleSelect = (categoryId: number) => {
    onSelectCategory(categoryId);
    setShowModal(false);
  }

  return (
    <>
      <TouchableOpacity
        className="h-[50] bg-background-primary my-2 rounded-[6] pl-4 justify-center"
        onPress={handleModal}
      >
        <Text className={clsx("text-lg", selected ? "text-white" : "text-gray-700")}>{selected?.name ?? "Categoria"}</Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[90%] bg-background-secondary p-4 rounded-xl">
              <Text className="text-white text-lg mb-4">
                Selecione uma categoria
              </Text>

              <FlatList
                data={categories}
                keyExtractor={(item) => `category-${item.id}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-row items-center bg-gray-800 rounded-lg mb-2 p-4"
                    onPress={() => handleSelect(item.id)}
                  >
                    <Checkbox value={selected?.id === item.id} onValueChange={() => handleSelect(item.id)}
                    className="mr-2"
                    />
                    <Text className="text-white text-lg">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
