import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";

export function Home() {
  const { fetchCategories, fetchTransactions } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(
        error,
        "Não foi possível carregar as categorias de transação. Por favor, tente novamente mais tarde.",
      );
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([fetchTransactions(), handleFetchCategories()]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={<ListHeader />}
        data={[]}
        renderItem={() => <></>}
      />
    </SafeAreaView>
  );
}
