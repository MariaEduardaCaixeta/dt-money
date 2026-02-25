export interface ICreateTransactionRequest {
    description: string;
    typeId: number;
    categoryId: number;
    value: number;
}