import { describe, it, expect } from "vitest";
import { getBins } from "@/lib/engine/binning";
import type { NutrientTable } from "@/lib/types";

describe("getBins", () => {
  it("returns bins", () => {
    const t: NutrientTable = {
      meta: { source_pdf: "x", generated_at_utc: "y", kind: "N", unit: "kg/da", dash_interpreted_as_zero: false, notes: [] },
      bins: ["a", "b"],
      table_numbers_by_region: {},
      data: {}
    };
    expect(getBins(t)).toEqual(["a", "b"]);
  });
});
