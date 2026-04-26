import { CSVRowSchema, CSVRow } from "./schema";

export type SkippedRow = {
  row: unknown;
  reason: string;
};

export type ValidationResult = {
  valid: CSVRow[];
  skipped: SkippedRow[];
};

export function validateCSVRows(rows: unknown[]): ValidationResult {
  const valid: CSVRow[] = [];
  const skipped: SkippedRow[] = [];

  for (const row of rows) {
    const result = CSVRowSchema.safeParse(row);

    if (!result.success) {
      skipped.push({
        row,
        reason: result.error.issues.map((i) => i.message).join(", "),
      });
      continue;
    }

    valid.push(result.data);
  }

  return { valid, skipped };
}