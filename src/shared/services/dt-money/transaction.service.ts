import { dtMoneyApi } from "@/shared/api/dt-money";
import { ITransactionCategoriesResponse } from "@/shared/interfaces/https/transaction-categories-response";

export const getTransactionCategories = async (): Promise<ITransactionCategoriesResponse[]> => {
    const { data } = await dtMoneyApi.get<ITransactionCategoriesResponse[]>(`/transaction/categories`);

    return data;
}