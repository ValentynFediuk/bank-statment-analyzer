"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CSVRow } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SkippedRow } from "@/lib/statement";
import { SkippedRows } from "@/components/SkippedRows";
import { formatUAH } from "@/lib/utils";

type Props = {
  data: CSVRow[];
  skipped: SkippedRow[];
};

type Filter = "all" | "income" | "expense";

export const BankTable = ({ data, skipped }: Props) => {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filteredData = data.filter((row) => {
    const amount = Number(row.amount);

    const matchFilter =
      filter === "all"
        ? true
        : filter === "income"
          ? amount > 0
          : amount < 0;

    const query = search.trim().toLowerCase();

    const matchSearch =
      query === ""
        ? true
        : row.counterparty.toLowerCase().includes(query) ||
        row.description.toLowerCase().includes(query);

    return matchFilter && matchSearch;
  });

  return (
    <div className="mt-4 space-y-4">
      <SkippedRows skipped={skipped} />
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <Input
          placeholder="Пошук: контрагент або призначення..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Усі
          </Button>

          <Button
            variant={filter === "income" ? "default" : "outline"}
            onClick={() => setFilter("income")}
          >
            Доходи
          </Button>

          <Button
            variant={filter === "expense" ? "default" : "outline"}
            onClick={() => setFilter("expense")}
          >
            Витрати
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-bg-surface overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Контрагент</TableHead>
              <TableHead>Призначення</TableHead>
              <TableHead className="text-right">Сума</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((row, i) => {
              const amount = Number(row.amount);

              return (
                <TableRow key={i} className="hover:bg-muted/50">
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.counterparty}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {formatUAH(amount)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredData.length === 0 && (
          <div className="p-6 text-center text-sm text-muted-foreground">
            Нічого не знайдено
          </div>
        )}
      </div>
    </div>
  );
};