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

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: ITransactionCategoriesResponse[];
  createTransaction: (
    transactionData: ICreateTransactionRequest,
  ) => Promise<void>;
  fetchTransactions: () => Promise<void>;
  totalTransactions: ITotalTransactions;
  transactions: ITransaction[];
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<
    ITransactionCategoriesResponse[]
  >([]);

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState<ITotalTransactions>({
    expense: 0,
    revenue: 0,
    total: 0,
  });

  const fetchCategories = async () => {
    const categories = await transactionService.getTransactionCategories();
    setCategories(categories);
  };

  const createTransaction = async (
    transactionData: ICreateTransactionRequest,
  ) => {
    await transactionService.createTransaction(transactionData);
  };

  const fetchTransactions = useCallback(async () => {
    const transactions = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    });
    setTransactions(transactions.data);
    setTotalTransactions(transactions.totalTransactions);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        categories,
        createTransaction,
        fetchTransactions,
        totalTransactions,
        transactions,
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
