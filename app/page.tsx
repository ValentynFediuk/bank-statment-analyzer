"use client";

import { useMemo, useState } from "react";

import UploadCsv from "@/components/UploadCsv";
import SummaryCards from "@/components/SummaryCards";
import Filters from "@/components/Filters";
import TransactionsTable from "@/components/TransactionsTable";
import TopCounterparties from "@/components/TopCounterparties";

import type { Transaction } from "@/types/transaction";
import { parseCsv } from "@/lib/parseCsv";
import { calcSummary, topCounterparties } from "@/lib/statement";
import { ParseCsvResult } from "@/lib/parseCsv.types";

type Filter = "all" | "income" | "expense";

export default function Page() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [errorsCount, setErrorsCount] = useState(0);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  async function handleFile(file: File) {
    const result: ParseCsvResult = await parseCsv(file);

    setTransactions(result.data || []);
    setErrorsCount(result.errors?.length || 0);
  }

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.counterparty.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "all" ||
        (filter === "income" && t.amount > 0) ||
        (filter === "expense" && t.amount < 0);

      return matchSearch && matchFilter;
    });
  }, [transactions, search, filter]);

  const summary = useMemo(() => {
    return calcSummary(filtered);
  }, [filtered]);

  const top = useMemo(() => {
    return topCounterparties(filtered);
  }, [filtered]);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <UploadCsv onFile={handleFile} errorsCount={errorsCount} />
      <SummaryCards {...summary} />
      <Filters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />
      <TransactionsTable transactions={filtered} />
      <TopCounterparties data={top} />
    </div>
  );
}