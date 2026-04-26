"use client"

import { UploadCSV } from "@/components/UploadCSV";
import { useCSV } from "@/hooks/useCSV";
import { BankTable } from "@/components/BankTable"
import { SummaryCards } from "@/components/SummaryCards";
import { TopExpenses } from "@/components/TopExpenses";
import { calculateStatement } from "@/lib/statement";

export const BankStatementAnalyzer = () => {
  const csv = useCSV();
  const { data, skipped } = csv

  const { summary, topExpenses } = calculateStatement(data);

  return (
    <div>
      <UploadCSV {...csv} />
      <SummaryCards data={summary} />
      <BankTable data={data} skipped={skipped} />
      <TopExpenses data={topExpenses} />
    </div>
  )
}