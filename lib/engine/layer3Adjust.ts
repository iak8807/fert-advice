import { round1 } from "@/lib/util";

/**
 * Layer 3 adjusts doses based on preferences (e.g., eco mode).
 * Keep it simple: ecoMode reduces N by 10% (example).
 */
export function adjustDoses(
  doses: { N: number | null; P2O5: number | null; K2O: number | null },
  ecoMode: boolean
) {
  const explain: any = { layer3: { ecoMode, adjustments: [] as any[] } };

  const out = { ...doses };

  if (ecoMode && typeof out.N === "number") {
    const old = out.N;
    out.N = round1(old * 0.9);
    explain.layer3.adjustments.push({ nutrient: "N", from: old, to: out.N, reason: "Eco mode (-10%)" });
  }

  return { doses: out, explain };
}
