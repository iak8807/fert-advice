import { describe, it, expect } from "vitest";
import { buildSchedule } from "@/lib/engine/schedule";

describe("buildSchedule", () => {
  it("splits N into 3", () => {
    const s = buildSchedule({ N: 30, P2O5: 12, K2O: 10 });
    expect(s.length).toBeGreaterThan(0);
    const n = s.filter(x => x.what.includes("Azot"));
    expect(n.length).toBe(3);
  });
});
