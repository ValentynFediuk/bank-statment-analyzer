import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Deterministic currency formatter to avoid SSR/CSR hydration mismatches.
// We intentionally do not rely on `style: 'currency'` because environments
// can differ in how they display UAH ("грн" vs "₴").
const numberUk = new Intl.NumberFormat("uk-UA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
})

export function formatUAH(amount: number, opts?: { withSymbol?: "symbol" | "code" | "none" }) {
  const withSymbol = opts?.withSymbol ?? "symbol"
  const formatted = numberUk.format(amount)
  if (withSymbol === "none") return formatted
  if (withSymbol === "code") return `${formatted} UAH`
  // Default: append the hryvnia sign consistently
  return `${formatted} ₴`
}
