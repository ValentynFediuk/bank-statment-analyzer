"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { Transaction } from "@/types/transaction";

type Props = {
  transactions: Transaction[];
};

export default function TransactionsTable({ transactions }: Props) {
  return (
    <Card>
      <CardContent className="p-4 overflow-auto">
        <table className="w-full text-sm">
          <thead>
          <tr className="text-left border-b">
            <th>Дата</th>
            <th>Контрагент</th>
            <th>Опис</th>
            <th>Сума</th>
          </tr>
          </thead>

          <tbody>
          {transactions.map((t, i) => (
            <tr key={i} className="border-b">
              <td>{t.date}</td>
              <td>{t.counterparty}</td>
              <td>{t.description}</td>
              <td className={t.amount >= 0 ? "text-green-600" : "text-red-600"}>
                {t.amount}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}