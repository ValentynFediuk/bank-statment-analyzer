import { z } from "zod";

export const transactionSchema = z.object({
  date: z.string(),
  counterparty: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
});

export const transactionsArraySchema = z.array(transactionSchema);