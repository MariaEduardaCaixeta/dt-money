import { ITransactionCategoriesResponse } from "@/shared/interfaces/https/transaction-categories-response";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { ICreateTransactionRequest } from "@/shared/interfaces/create-transaction-request";
import { ITransaction } from "@/shared/interfaces/transaction";
import { ITotalTransactions } from "@/shared/interfaces/total-transactions";
import { IUpdateTransactionRequest } from "@/shared/interfaces/update-transaction-request";
import { ref } from "yup";
import {
  IFilters,
  IPagination,
} from "@/shared/interfaces/https/get-transaction-request";

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

const FILTER_INITIAL_STATE: IFilters = {
  typeId: undefined,
  categoryIds: {},
  from: undefined,
  to: undefined,
};

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
  resetFilters: () => void;
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
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<IFilters>(FILTER_INITIAL_STATE);

  const [loadings, setLoadings] = useState({
    initial: false,
    refresh: false,
    loadMore: false,
  });
  const [totalTransactions, setTotalTransactions] =
    useState<ITotalTransactions>({
      expense: 0,
      revenue: 0,
      total: 0,
    });

  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0,
  });

  const categoryIds = useMemo(
    () =>
      Object.entries(filters.categoryIds)
        .filter(([key, value]) => value)
        .map(([key]) => Number(key)),
    [filters.categoryIds],
  );

  const handleLoadings = ({ key, value }: HandleLoadingsParams) =>
    setLoadings((prevValue) => ({ ...prevValue, [key]: value }));

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination;
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
      ...filters,
      categoryIds,
    });
    setTransactions(transactionsResponse.data);
    setTotalTransactions(transactionsResponse.totalTransactions);
    setPagination({
      ...pagination,
      page,
      totalPages: transactionsResponse.totalPages,
      totalRows: transactionsResponse.totalRows,
    });
  }, [pagination]);

  const fetchCategories = async () => {
    const categoriesResponse =
      await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: ICreateTransactionRequest) => {
    await transactionService.createTransaction(transaction);
    await refreshTransactions();
  };

  const updateTransaction = async (transaction: IUpdateTransactionRequest) => {
    await transactionService.updateTransaction(transaction);
    await refreshTransactions();
  };

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
      const transactionsResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
        searchText,
        ...filters,
        categoryIds,
      });

      if (page === 1) {
        setTransactions(transactionsResponse.data);
      } else {
        setTransactions((prevState) => [
          ...prevState,
          ...transactionsResponse.data,
        ]);
      }
      setTotalTransactions(transactionsResponse.totalTransactions);
      setPagination({
        ...pagination,
        page,
        totalRows: transactionsResponse.totalRows,
        totalPages: transactionsResponse.totalPages,
      });
    },
    [pagination, searchText, filters, categoryIds],
  );

  const loadMoreTransactions = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) return;
    fetchTransactions({ page: pagination.page + 1 });
  }, [loadings.loadMore, pagination]);

  const handleFilters = ({ key, value }: HandleFiltersParams) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCategoryFilter = (categoryId: number) => {
    setFilters((prevValue) => ({
      ...prevValue,
      categoryIds: {
        ...prevValue.categoryIds,
        [categoryId]: !prevValue.categoryIds?.[categoryId],
      },
    }));
  };

  const resetFilters = async () => {
    setFilters(FILTER_INITIAL_STATE);
    setSearchText("");

    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: pagination.perPage,
      searchText: "",
      categoryIds: [],
    });

    setTransactions(transactionsResponse.data);
    setTotalTransactions(transactionsResponse.totalTransactions);
    setPagination({
      ...pagination,
      page: 1,
      totalRows: transactionsResponse.totalRows,
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
        updateTransaction,
        refreshTransactions,
        loadMoreTransactions,
        handleLoadings,
        loadings,
        pagination,
        setSearchText,
        searchText,
        filters,
        handleFilters,
        handleCategoryFilter,
        resetFilters,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
