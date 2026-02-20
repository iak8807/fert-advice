import N from "@/data/N_tables.min.json";
import P from "@/data/P_tables.min.json";
import K from "@/data/K_tables.min.json";
import type { NutrientTable, MethodKey } from "@/lib/types";

function normMethod(m: string): MethodKey | null {
  const s = (m ?? "").toLowerCase().trim();
  if (!s) return null;
  if (s === "sulu") return "Sulu";
  if (s === "kuru") return "Kuru";
  return null;
}

function normalize(raw: any, kind: "N" | "P2O5" | "K2O"): NutrientTable {
  const tables = raw?.tables_by_region ?? raw?.data ?? raw?.tables ?? {};

  // method anahtarlarını normalize et (sulu/Sulu)
  const normalizedTables: any = {};
  for (const region of Object.keys(tables)) {
    normalizedTables[region] = {};
    for (const crop of Object.keys(tables[region] ?? {})) {
      const cropObj = tables[region][crop] ?? {};
      const outCrop: any = {};
      for (const mk of Object.keys(cropObj)) {
        const nm = normMethod(mk);
        if (!nm) continue;
        outCrop[nm] = cropObj[mk];
      }
      normalizedTables[region][crop] = outCrop;
    }
  }

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
    region_index: raw?.region_index ?? raw?.table_numbers_by_region ?? {},
    methods: raw?.methods ?? ["Kuru", "Sulu"],
    supported_crops: raw?.supported_crops ?? [],
    tables_by_region: normalizedTables,
  };
}

export function getTables() {
  return {
    N: normalize(N as any, "N"),
    P2O5: normalize(P as any, "P2O5"),
    K2O: normalize(K as any, "K2O"),
  };
}
