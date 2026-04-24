import { Transaction } from "@/types/transaction";

export function calcSummary(transactions: Transaction[]) {
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return {
    income,
    expense,
    net: income - expense,
    count: transactions.length,
  };
}

export function topCounterparties(transactions: Transaction[]) {
  const map = new Map<string, number>();

  transactions
    .filter(t => t.amount < 0)
    .forEach(t => {
      map.set(t.counterparty, (map.get(t.counterparty) || 0) + Math.abs(t.amount));
    });

  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, total]) => ({ name, total }));
}