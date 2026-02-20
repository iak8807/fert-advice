import { describe, it, expect } from "vitest";
import { lookupDose } from "@/lib/engine/lookup";
import type { NutrientTable } from "@/lib/types";

const t: NutrientTable = {
  meta: { source_pdf: "x", generated_at_utc: "y", kind: "N", unit: "kg/da", dash_interpreted_as_zero: false, notes: [] },
  bins: ["0-1.0"],
  table_numbers_by_region: { R: [1] },
  data: { R: { C: { Sulu: { "0-1.0": 25 } } } },
};

describe("lookupDose", () => {
  it("returns value when exists", () => {
    expect(lookupDose(t, "R", "C", "Sulu", "0-1.0")).toBe(25);
  });
  it("returns null when missing", () => {
    expect(lookupDose(t, "R", "X", "Sulu", "0-1.0")).toBeNull();
  });
});
