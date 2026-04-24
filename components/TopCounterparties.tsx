"use client";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  data: { name: string; total: number }[];
};

export default function TopCounterparties({ data }: Props) {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="font-bold mb-2">Топ-5 витрат</h2>

        <ul className="space-y-1">
          {data.map((c, i) => (
            <li key={i}>
              {c.name} — <b>{c.total}</b>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}