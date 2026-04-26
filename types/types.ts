export type CSVRow = {
  date: string;
  counterparty: string;
  description: string;
  amount: string;
};
export type Status = "idle" | "loading" | "success" | "error";