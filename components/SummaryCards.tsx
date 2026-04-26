import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Summary } from "@/lib/statement";
import { formatUAH } from "@/lib/utils";

type Props = {
  data: Summary;
};

export const SummaryCards = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Дохід</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-green-500 font-semibold">{formatUAH(data.income)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Витрати</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500 font-semibold">{formatUAH(data.expense)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Баланс</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`${data.balance >= 0 ? "text-green-500" : "text-red-500"} font-semibold`}>
            {formatUAH(data.balance)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Транзакції</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-semibold">{data.transactions.toString()}</div>
        </CardContent>
      </Card>
    </div>
  );
};