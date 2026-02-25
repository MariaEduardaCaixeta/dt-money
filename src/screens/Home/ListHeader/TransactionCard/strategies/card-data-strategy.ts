import { TransactionTypes } from "@/shared/enums/transaction-types";
import { TransactionCardType } from "..";

interface CardData {
  label: string;
  bgColor: string;
}

export const CARD_DATA: Record<TransactionCardType, CardData> = {
  [TransactionTypes.REVENUE]: {
    label: "Entradas",
    bgColor: "background-tertiary",
  },
  [TransactionTypes.EXPENSE]: {
    label: "Saídas",
    bgColor: "background-tertiary",
  },
  total: {
    label: "Total",
    bgColor: "accent-brand-background-primary",
  },
};