import N from "@/data/N_tables.min.json";
import P from "@/data/P_tables.min.json";
import K from "@/data/K_tables.min.json";
import type { NutrientTable } from "@/lib/types";

function pickData(raw: any) {
  // JSON farklı isimle gelmiş olabilir:
  return raw?.data ?? raw?.tables ?? raw?.values ?? raw?.by_region ?? {};
}

function normalize(raw: any, kind: "N" | "P2O5" | "K2O"): NutrientTable {
  return {
    meta: raw?.meta ?? {
      source_pdf: "unknown",
      generated_at_utc: new Date().toISOString(),
      kind,
      unit: "kg/da",
      dash_interpreted_as_zero: false,
      notes: ["normalized fallback meta"],
    },
    bins: raw?.bins ?? ["0-1.0", "1.1-2.0", "2.1-3.0", "3+"],
    table_numbers_by_region: raw?.table_numbers_by_region ?? {},
    data: pickData(raw), // <-- kritik
  };
}

export function getTables() {
  return {
    N: normalize(N as any, "N"),
    P2O5: normalize(P as any, "P2O5"),
    K2O: normalize(K as any, "K2O"),
  };
}
