import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { EmptyList } from "./EmptyList";

export function Home() {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    loadMoreTransactions,
    handleLoadings,
    loadings
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    try {
      handleLoadings({ key: "initial", value: true });
      await fetchCategories();
    } catch (error) {
      handleError(
        error,
        "Não foi possível carregar as categorias de transação. Por favor, tente novamente mais tarde.",
      );
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleFetchInitialTransactions = async () => {
    try {
      handleLoadings({ key: "initial", value: true });
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(
        error,
        "Não foi possível carregar as transações. Por favor, tente novamente mais tarde.",
      );
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      handleLoadings({ key: "loadMore", value: true });
      await loadMoreTransactions();
    } catch (error) {
      handleError(
        error,
        "Não foi possível carregar mais transações. Por favor, tente novamente mais tarde.",
      );
    } finally {
      handleLoadings({ key: "loadMore", value: false });
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      handleLoadings({ key: "refresh", value: true });
      await refreshTransactions();
    } catch (error) {
      handleError(
        error,
        "Não foi possível atualizar as transações. Por favor, tente novamente mais tarde.",
      );
    } finally {
      handleLoadings({ key: "refresh", value: false });
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
            onRefresh={handleRefreshTransactions}
            refreshing={loadings.refresh}
          />
        }
        onEndReached={() => {
          handleLoadMoreTransactions();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ loadings.initial ? null : <EmptyList /> }
      />
    </SafeAreaView>
  );
}
