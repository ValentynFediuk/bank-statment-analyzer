"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  filter: "all" | "income" | "expense";
  setFilter: (v: "all" | "income" | "expense") => void;
};

export default function Filters({
  search,
  setSearch,
  filter,
  setFilter,
}: Props) {
  return (
    <div className="flex gap-3 items-center">
      <Input
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Фільтр" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Усі</SelectItem>
          <SelectItem value="income">Доходи</SelectItem>
          <SelectItem value="expense">Витрати</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}