export function buildSchedule(doses: { N: number | null; P2O5: number | null; K2O: number | null }) {
  const out: { when: string; what: string; amount: string }[] = [];

  // Simple schedule:
  // - Base: all P and K at planting
  // - N split into 3: base + two topdressings
  if (typeof doses.P2O5 === "number" && doses.P2O5 > 0) {
    out.push({ when: "Taban", what: "Fosfor (P2O5)", amount: `${doses.P2O5} kg/da` });
  }
  if (typeof doses.K2O === "number" && doses.K2O > 0) {
    out.push({ when: "Taban", what: "Potasyum (K2O)", amount: `${doses.K2O} kg/da` });
  }
  if (typeof doses.N === "number" && doses.N > 0) {
    const base = Math.round((doses.N / 3) * 10) / 10;
    const rem = Math.round((doses.N - base) * 10) / 10;
    const top = Math.round((rem / 2) * 10) / 10;
    out.push({ when: "Taban", what: "Azot (N)", amount: `${base} kg/da` });
    out.push({ when: "Üst Gübre 1", what: "Azot (N)", amount: `${top} kg/da` });
    out.push({ when: "Üst Gübre 2", what: "Azot (N)", amount: `${top} kg/da` });
  }

  return out;
}
