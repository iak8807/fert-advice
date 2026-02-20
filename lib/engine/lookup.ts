import type { NutrientTable, MethodKey, BinLabel } from "@/lib/types";

export function lookupDose(
  table: NutrientTable,
  region: string,
  crop: string,
  method: MethodKey,
  bin: BinLabel
): number | null {
  const r = table.data?.[region];
  const c = r?.[crop];
  const m = c?.[method];
  if (!m) return null;
  const v = m[bin];
  return typeof v === "number" ? v : null;
}
