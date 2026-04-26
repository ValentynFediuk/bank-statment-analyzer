import { describe, it, expect } from "vitest";
import { calculateStatement } from "./statement";

describe("calculateStatement", () => {
  it("should calculate summary and top expenses correctly", () => {
    const data = [
      {
        date: "2025-01-01",
        counterparty: "A",
        description: "income",
        amount: "1000",
      },
      {
        date: "2025-01-02",
        counterparty: "B",
        description: "expense",
        amount: "-500",
      },
      {
        date: "2025-01-03",
        counterparty: "B",
        description: "expense",
        amount: "-300",
      },
      {
        date: "2025-01-04",
        counterparty: "C",
        description: "expense",
        amount: "-200",
      },
    ];

    const result = calculateStatement(data);

    expect(result.summary.income).toBe(1000);
    expect(result.summary.expense).toBe(-1000);
    expect(result.summary.balance).toBe(0);
    expect(result.summary.transactions).toBe(4);

    expect(result.topExpenses[0]).toEqual({
      name: "B",
      amount: 800,
    });
  });
});