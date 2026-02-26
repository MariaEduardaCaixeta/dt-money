import { dtMoneyApi } from "@/shared/api/dt-money";
import { ICreateTransactionRequest } from "@/shared/interfaces/create-transaction-request";
import {
  IGetTransactionRequest,
  IGetTransactionResponse,
} from "@/shared/interfaces/https/get-transaction-request";
import { ITransactionCategoriesResponse } from "@/shared/interfaces/https/transaction-categories-response";
import { IUpdateTransactionRequest } from "@/shared/interfaces/update-transaction-request";
import qs from "qs";

export const getTransactionCategories = async (): Promise<
  ITransactionCategoriesResponse[]
> => {
  const { data } = await dtMoneyApi.get<ITransactionCategoriesResponse[]>(
    `/transaction/categories`,
  );

  return data;
};

export const createTransaction = async (
  transactionData: ICreateTransactionRequest,
) => {
  await dtMoneyApi.post(`/transaction`, transactionData);
};

export const getTransactions = async (
  params: IGetTransactionRequest,
): Promise<IGetTransactionResponse> => {
  const { data } = await dtMoneyApi.get<IGetTransactionResponse>(
    `/transaction`,
    {
      params,
      paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
    },
  );

  return data;
};

export const deleteTransaction = async (id: number) => {
  await dtMoneyApi.delete(`/transaction/${id}`);
};

export const updateTransaction = async (
  transactionData: IUpdateTransactionRequest,
) => {
  await dtMoneyApi.put("/transaction", transactionData);
};
