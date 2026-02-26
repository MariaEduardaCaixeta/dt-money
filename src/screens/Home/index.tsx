import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export function Home() {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loading,
    loadMoreTransactions,
  } = useTransactionContext();
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

  const handleFetchInitialTransactions = async () => {
    try {
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(
        error,
        "Não foi possível carregar as transações. Por favor, tente novamente mais tarde.",
      );
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions();
    } catch (error) {
      handleError(
        error,
        "Não foi possível carregar mais transações. Por favor, tente novamente mais tarde.",
      );
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      await refreshTransactions();
    } catch (error) {
      handleError(
        error,
        "Não foi possível atualizar as transações. Por favor, tente novamente mais tarde.",
      );
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchInitialTransactions(),
        handleFetchCategories(),
      ]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={<ListHeader />}
        data={transactions}
        keyExtractor={({ id }) => `transaction=${id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefreshTransactions}
          />
        }
        onEndReached={() => {
          handleLoadMoreTransactions();
        }}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
