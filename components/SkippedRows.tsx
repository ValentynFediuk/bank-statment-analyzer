import { SkippedRow } from "@/lib/statement";

type Props = {
  skipped: SkippedRow[];
};

export const SkippedRows = ({ skipped }: Props) => {
  if (!skipped.length) return null;

  return (
    <div className="mt-4 rounded-xl border p-4 bg-bg-surface">
      <p className="font-medium text-yellow-700">
        Пропущено рядків: {skipped.length}
      </p>

      <div className="mt-2 text-sm text-yellow-600 space-y-1">
        {skipped.slice(0, 5).map((s, i) => (
          <div key={i}>• {s.reason}</div>
        ))}
      </div>
    </div>
  );
};