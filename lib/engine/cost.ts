import { safeNum, round1 } from "@/lib/util";
import type { PriceInput } from "@/lib/types";

export function estimateCostTry(
  doses: { N: number | null; P2O5: number | null; K2O: number | null },
  prices: PriceInput
) {
  // very rough conversions to product quantities for demo:
  // Urea: 46% N
  // TSP: 46% P2O5
  // SOP (potassium sulfate): 50% K2O (approx)
  const breakdown: { name: string; try: number }[] = [];

  let total = 0;

  if (typeof doses.N === "number" && prices.urea_try_per_kg != null) {
    const ureaKg = doses.N / 0.46;
    const cost = ureaKg * safeNum(prices.urea_try_per_kg);
    breakdown.push({ name: "Üre (46% N)", try: round1(cost) });
    total += cost;
  }

  if (typeof doses.P2O5 === "number" && prices.tsp_try_per_kg != null) {
    const tspKg = doses.P2O5 / 0.46;
    const cost = tspKg * safeNum(prices.tsp_try_per_kg);
    breakdown.push({ name: "TSP (46% P2O5)", try: round1(cost) });
    total += cost;
  }

  if (typeof doses.K2O === "number" && prices.sop_try_per_kg != null) {
    const sopKg = doses.K2O / 0.50;
    const cost = sopKg * safeNum(prices.sop_try_per_kg);
    breakdown.push({ name: "Potasyum Sülfat (SOP)", try: round1(cost) });
    total += cost;
  }

  return { totalTry: round1(total), breakdown };
}
