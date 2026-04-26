import { z } from "zod";

export const CSVRowSchema = z.object({
  date: z.string(),
  counterparty: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  amount: z.string(),
});

export type CSVRow = z.infer<typeof CSVRowSchema>;