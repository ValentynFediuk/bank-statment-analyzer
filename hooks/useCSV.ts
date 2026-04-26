import { useState } from "react";
import { parseCSV } from "@/lib/parseCSV";
import { CSVRow, Status } from "@/types/types";
import { SkippedRow, validateCSVRows } from "@/lib/statement";


export function useCSV() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<CSVRow[]>([]);
  const [skipped, setSkipped] = useState<SkippedRow[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      throw new Error("Only CSV files allowed");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File too large (max 5MB)");
    }
  };

  const handleFile = async (file: File) => {
    setStatus("loading");
    setError(null);

    try {
      validateFile(file);

      const parsed = await parseCSV(file);
      const { valid, skipped } = validateCSVRows(parsed);

      const normalized = valid.map((row) => ({
        ...row,
        counterparty: row.counterparty ?? "",
        description: row.description ?? "",
      }));

      if (!parsed.length) {
        throw new Error("CSV is empty");
      }

      setFile(file);
      setData(normalized);
      setSkipped(skipped);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const reset = () => {
    setFile(null);
    setData([]);
    setStatus("idle");
    setError(null);
    setSkipped([]);
  };

  return {
    file,
    data,
    skipped,
    status,
    error,
    handleFile,
    reset,
  };
}