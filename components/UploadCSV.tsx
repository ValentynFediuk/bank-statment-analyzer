"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useCSV } from "@/hooks/useCSV";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const UploadCSV = ({handleFile, file, error, status, reset}: ReturnType<typeof useCSV>) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    await handleFile(droppedFile);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    await handleFile(selectedFile);
  };

  const handleReset = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();

    reset()
  }

  return (
    <div className="w-full flex flex-col items-center relative">
      {status !== "idle" &&
        <Button className="absolute top-2 right-2 cursor-pointer" onClick={handleReset} variant="destructive">
          <X className="size-4" />
        </Button>
      }

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          w-full h-52 rounded-xl border-2 border-dashed
          flex items-center justify-center cursor-pointer transition
          bg-bg-surface text-text-secondary
          ${isDragging ? "border-accent-primary bg-bg-elevated" : "border-border"}
        `}
      >
        {status == 'loading'
          ?
          <Spinner className="size-8" />
          :
          <div className="flex flex-col gap-4 text-center">
            <p className="text-center">
              {file ? `Selected: ${file.name}` : "Drag & drop file here or click"}
            </p>
            {error && <p className="text-accent-danger">{error}</p>}
          </div>
        }

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};