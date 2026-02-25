import { dtMoneyApi } from "@/shared/api/dt-money";
import { ICreateTransactionRequest } from "@/shared/interfaces/create-transaction-request";
import { ITransactionCategoriesResponse } from "@/shared/interfaces/https/transaction-categories-response";

export const getTransactionCategories = async (): Promise<ITransactionCategoriesResponse[]> => {
    const { data } = await dtMoneyApi.get<ITransactionCategoriesResponse[]>(`/transaction/categories`);

    return data;
}

export const createTransaction = async (transactionData: ICreateTransactionRequest) => {
    await dtMoneyApi.post(`/transaction`, transactionData);
}