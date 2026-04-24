import type { Transaction } from "@/types/transaction";

export type ParseCsvResult = {
  data: Transaction[];
  errors: {
    message: string;
  }[];
};