import { ITotalTransactions } from "../total-transactions";
import { ITransaction } from "../transaction";

export interface IPagination {
  page: number;
  perPage: number;
  totalRows?: number;
  totalPages: number;
}
export interface IGetTransactionRequest {
  page: number;
  perPage: number;
  searchText?: string;
}

export interface IFilters {
  from?: Date;
  to?: Date;
  typeId?: number;
  categoryIds: Record<number, boolean>;
}

export interface IGetTransactionResponse {
  data: ITransaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: ITotalTransactions;
}

