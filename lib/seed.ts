import N from "@/data/N_tables.min.json";
import P from "@/data/P_tables.min.json";
import K from "@/data/K_tables.min.json";
import type { NutrientTable } from "@/lib/types";

export function getTables() {
  // runtime type cast for simplicity in this prototype
  return {
    N: N as unknown as NutrientTable,
    P2O5: P as unknown as NutrientTable,
    K2O: K as unknown as NutrientTable,
  };
}
