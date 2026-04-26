import Papa from "papaparse";
import { CSVRow } from "@/types/types";

export const parseCSV = (file: File): Promise<CSVRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        resolve(results.data as CSVRow[]);
      },

      error: (err) => {
        reject(err);
      },
    });
  });
};