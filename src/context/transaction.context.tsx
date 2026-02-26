import { ITransactionCategoriesResponse } from "@/shared/interfaces/https/transaction-categories-response";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { ICreateTransactionRequest } from "@/shared/interfaces/create-transaction-request";
import { ITransaction } from "@/shared/interfaces/transaction";
import { ITotalTransactions } from "@/shared/interfaces/total-transactions";
import { IUpdateTransactionRequest } from "@/shared/interfaces/update-transaction-request";
import { ref } from "yup";
import { IFilters, IPagination } from "@/shared/interfaces/https/get-transaction-request";

interface FetchTransactionsParams {
  page?: number;
  perPage?: number;
  searchText?: string;
  typeId?: string;
  categoryIds?: string[];
  from?: Date;
  to?: Date;
  orderId?: string;
}

interface Loadings {
  initial: boolean;
  refresh: boolean;
  loadMore: boolean;
}

interface HandleLoadingsParams {
  key: keyof Loadings;
  value: boolean;
}

interface HandleFiltersParams {
  key: keyof IFilters;
  value: boolean | number | Date;
}

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  createTransaction: (
    transactionData: ICreateTransactionRequest,
  ) => Promise<void>;
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>;
  updateTransaction: (
    transactionData: IUpdateTransactionRequest,
  ) => Promise<void>;
  refreshTransactions: () => Promise<void>;
  loadMoreTransactions: () => Promise<void>;
  handleLoadings: (params: HandleLoadingsParams) => void;
  setSearchText: (text: string) => void;
  handleFilters: (params: HandleFiltersParams) => void;
  handleCategoryFilter: (categoryId: number) => void;
  searchText: string;
  categories: ITransactionCategoriesResponse[];
  totalTransactions: ITotalTransactions;
  transactions: ITransaction[];
  loadings: Loadings;
  pagination: IPagination;
  filters: IFilters;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<
    ITransactionCategoriesResponse[]
  >([]);

  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    refresh: false,
    loadMore: false,
  });

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<IFilters>({
    typeId: undefined,
    categoryIds: {},
    from: undefined,
    to: undefined,
  });
  
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    perPage: 10,
    totalRows: 0,
    totalPages: 0,
  });
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [totalTransactions, setTotalTransactions] =
    useState<ITotalTransactions>({
      expense: 0,
      revenue: 0,
      total: 0,
    });

  const handleLoadings = ({ key, value }: HandleLoadingsParams) => {
    setLoadings((prevLoadings) => ({
      ...prevLoadings,
      [key]: value,
    }));
  };

  const refreshTransactions = useCallback(async () => {
    async () => {
      const { page, perPage } = pagination;
      const transactions = await transactionService.getTransactions({
        page: 1,
        perPage: page * perPage,
      });

      setTransactions(transactions.data);
      setTotalTransactions(transactions.totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows: transactions.totalRows,
        totalPages: transactions.totalPages,
      });
    };
  }, [pagination]);

  const fetchCategories = async () => {
    const categories = await transactionService.getTransactionCategories();
    setCategories(categories);
  };

  const createTransaction = async (
    transactionData: ICreateTransactionRequest,
  ) => {
    await transactionService.createTransaction(transactionData);
    await refreshTransactions();
  };

  const updateTransaction = async (
    transactionData: IUpdateTransactionRequest,
  ) => {
    await transactionService.updateTransaction(transactionData);
    await refreshTransactions();
  };

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
      const transactions = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
        searchText
      });

      console.log("Fetched transactions:", transactions);

      if (page === 1) {
        setTransactions(transactions.data);
      } else {
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          ...transactions.data,
        ]);
      }

      setTotalTransactions(transactions.totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows: transactions.totalRows,
        totalPages: transactions.totalPages,
      });
    },
    [pagination, searchText],
  );

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;

    fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

  const handleFilters = ({ key, value }: HandleFiltersParams) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleCategoryFilter = (categoryId: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categoryIds: {
        ...prevFilters.categoryIds,
        [categoryId]: !Boolean(prevFilters.categoryIds[categoryId]),
      },
    }));

  };

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        createTransaction,
        fetchTransactions,
        updateTransaction,
        refreshTransactions,
        loadMoreTransactions,
        handleLoadings,
        setSearchText,
        handleFilters,
        handleCategoryFilter,
        filters,
        searchText,
        categories,
        totalTransactions,
        transactions,
        loadings,
        pagination,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionContextProvider",
    );
  }

  return context;
};
