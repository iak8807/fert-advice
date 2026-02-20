import type { BinLabel, NutrientTable } from "@/lib/types";

/**
 * This prototype uses direct bin selection from UI.
 * Later you can implement mapping from real soil values to bin labels.
 */
export function getBins(table: NutrientTable): BinLabel[] {
  return table.bins ?? [];
}
