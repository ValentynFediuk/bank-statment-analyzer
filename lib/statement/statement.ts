import { CSVRow } from "@/types/types";

export type Summary = {
  income: number;
  expense: number;
  balance: number;
  transactions: number;
};

export type TopExpense = {
  name: string;
  amount: number;
};

export function calculateStatement(data: CSVRow[]) {
  let income = 0;
  let expense = 0;

  const expenseMap = new Map<string, number>();

  for (const row of data) {
    const amount = Number(row.amount);
    const name = row.counterparty ?? "Unknown";

    if (amount > 0) {
      income += amount;
    } else {
      expense += amount;
      expenseMap.set(name, (expenseMap.get(name) || 0) + Math.abs(amount));
    }
  }

  const topExpenses: TopExpense[] = Array.from(expenseMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, amount]) => ({ name, amount }));

  return {
    summary: {
      income,
      expense,
      balance: income + expense,
      transactions: data.length,
    },
    topExpenses,
  };
}