export type RegionKey = string;
export type CropKey = string;
export type MethodKey = "Sulu" | "Kuru";

export type BinLabel = string;

export type NutrientTable = {
  meta: {
    source_pdf: string;
    generated_at_utc: string;
    kind: "N" | "P2O5" | "K2O";
    unit: string;
    dash_interpreted_as_zero: boolean;
    notes: string[];
  };
  bins: BinLabel[];
  table_numbers_by_region: Record<RegionKey, number[]>;
  data: Record<RegionKey, Record<CropKey, Partial<Record<MethodKey, Record<BinLabel, number | null>>>>>;
};

export type SoilInput = {
  method: MethodKey;
  // bin input; app wants to map real soil values into bins later
  bin: BinLabel;
};

export type ProjectInput = {
  name: string;
  crop: CropKey;
  region: RegionKey;
};

export type PreferencesInput = {
  ecoMode: boolean;
  tone: "Klasik" | "Detaylı";
};

export type PriceInput = {
  urea_try_per_kg: number | null;
  tsp_try_per_kg: number | null;
  sop_try_per_kg: number | null; // potassium sulfate
};

export type AdviceResult = {
  N?: { doseKgPerDa: number; source: string };
  P2O5?: { doseKgPerDa: number; source: string };
  K2O?: { doseKgPerDa: number; source: string };
  schedule: { when: string; what: string; amount: string }[];
  cost: { totalTry: number; breakdown: { name: string; try: number }[] };
  explain: any;
};

export type SavedAdvice = {
  id: string;
  createdAt: string;
  project: ProjectInput;
  soil: SoilInput;
  prefs: PreferencesInput;
  prices: PriceInput;
  result: AdviceResult;
};
