import { ITransactionCategoriesResponse } from "@/shared/interfaces/https/transaction-categories-response";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { ICreateTransactionRequest } from "@/shared/interfaces/create-transaction-request";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: ITransactionCategoriesResponse[];
  createTransaction: (transactionData: ICreateTransactionRequest) => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<
    ITransactionCategoriesResponse[]
  >([]);

  const fetchCategories = async () => {
    const categories = await transactionService.getTransactionCategories();
    setCategories(categories);
  };

  const createTransaction = async (transactionData: ICreateTransactionRequest) => {
    await transactionService.createTransaction(transactionData);
  };

  return (
    <TransactionContext.Provider value={{ fetchCategories, categories, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionContextProvider"
    );
  }

  return context;
};
