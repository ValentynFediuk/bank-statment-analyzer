import type { TopExpense } from "@/lib/statement";
import { formatUAH } from "@/lib/utils";

type Props = {
  data: TopExpense[];
};

export const TopExpenses = ({ data }: Props) => {
  const top = data;

  return (
    <div className="mt-6 rounded-xl border bg-bg-surface p-4 text-text-primary">
      <h2 className="text-lg font-semibold mb-4">
        Топ-5 витрат по контрагентах
      </h2>

      <div className="space-y-2">
        {top.map(({ name, amount }) => (
          <div
            key={name}
            className="flex justify-between border-b pb-2 last:border-none"
          >
            <span>{name}</span>
            <span className="text-red-500 font-medium">{formatUAH(amount)}</span>
          </div>
        ))}

        {top.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Нема витрат для аналізу
          </p>
        )}
      </div>
    </div>
  );
};