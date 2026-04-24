import { describe, it, expect } from "vitest";
import { calcSummary } from "./statement";

describe("calcSummary", () => {
  it("calculates totals correctly", () => {
    const data = [
      { date: "2025-01-01", counterparty: "A", description: "", amount: 100 },
      { date: "2025-01-01", counterparty: "B", description: "", amount: -50 },
    ];

    const result = calcSummary(data);

    expect(result.income).toBe(100);
    expect(result.expense).toBe(50);
    expect(result.net).toBe(50);
    expect(result.count).toBe(2);
  });
});