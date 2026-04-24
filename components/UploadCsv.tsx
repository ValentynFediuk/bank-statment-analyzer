"use client";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  onFile: (file: File) => void;
  errorsCount: number;
};

export default function UploadCsv({ onFile, errorsCount }: Props) {
  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
          }}
        />

        {errorsCount > 0 && (
          <p className="text-sm text-red-500">
            Пропущено рядків: {errorsCount}
          </p>
        )}
      </CardContent>
    </Card>
  );
}