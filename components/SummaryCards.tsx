"use client";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  income: number;
  expense: number;
  net: number;
  count: number;
};

export default function SummaryCards({
  income,
  expense,
  net,
  count,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card><CardContent className="p-4">Дохід: <b>{income}</b></CardContent></Card>

      <Card><CardContent className="p-4">Витрати: <b>{expense}</b></CardContent></Card>

      <Card>
        <CardContent className="p-4">
          Результат:{" "}
          <b className={net >= 0 ? "text-green-600" : "text-red-600"}>
            {net}
          </b>
        </CardContent>
      </Card>

      <Card><CardContent className="p-4">Транзакцій: <b>{count}</b></CardContent></Card>
    </div>
  );
}