export interface IUpdateTransactionRequest {
    id: number;
    description: string;
    typeId: number;
    categoryId: number;
    value: number;
}