import { describe, it, expect } from "vitest";
import { balance } from "@/lib/engine/balancer";

describe("balance", () => {
  it("pass through", () => {
    const r = balance({ N: 1, P2O5: 2, K2O: 3 });
    expect(r.doses).toEqual({ N: 1, P2O5: 2, K2O: 3 });
  });
});
