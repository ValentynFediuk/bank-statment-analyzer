import Papa from "papaparse";
import { transactionsArraySchema } from "./schema";
import type { ParseCsvResult } from "./parseCsv.types";
import type { Transaction } from "@/types/transaction";

export function parseCsv(file: File): Promise<ParseCsvResult> {
  return new Promise((resolve) => {
    Papa.parse<Transaction>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed = transactionsArraySchema.safeParse(result.data);

        if (!parsed.success) {
          resolve({
            data: [],
            errors: parsed.error.issues.map((e) => ({
              message: e.message,
            })),
          });
          return;
        }

        resolve({
          data: parsed.data,
          errors: [],
        });
      },
    });
  });
}