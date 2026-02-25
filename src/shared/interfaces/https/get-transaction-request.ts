import { ITotalTransactions } from "../total-transactions";
import { ITransaction } from "../transaction";

export interface IGetTransactionRequest {
  page: number;
  perPage: number;
  searchText?: string;
  typeId?: string;
  categoryIds?: string[];
  from?: Date;
  to?: Date;
  orderId?: string;
}

export interface IGetTransactionResponse {
  data: ITransaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: ITotalTransactions;
}

