"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { StepNav } from "@/components/StepNav";
import { Step1Project } from "@/components/forms/Step1Project";
import { Step2Soil } from "@/components/forms/Step2Soil";
import { Step3Leaf } from "@/components/forms/Step3Leaf";
import { Step4Prefs } from "@/components/forms/Step4Prefs";
import { Step5Prices } from "@/components/forms/Step5Prices";
import type {
  AdviceResult,
  PreferencesInput,
  PriceInput,
  ProjectInput,
  SoilInput,
} from "@/lib/types";
import { getTables } from "@/lib/seed";
import { lookupDose } from "@/lib/engine/lookup";
import { clampDose } from "@/lib/engine/layer2Clamp";
import { adjustDoses } from "@/lib/engine/layer3Adjust";
import { balance } from "@/lib/engine/balancer";
import { estimateCostTry } from "@/lib/engine/cost";
import { buildSchedule } from "@/lib/engine/schedule";

type StoreState = {
  step: number;
  project: ProjectInput;
  soil: SoilInput;
  prefs: PreferencesInput;
  prices: PriceInput;
  lastError: string | null;
  setProject: (v: ProjectInput) => void;
  setSoil: (v: SoilInput) => void;
  setPrefs: (v: PreferencesInput) => void;
  setPrices: (v: PriceInput) => void;
  setStep: (n: number) => void;
  compute: () => void;
};

const AdviceContext = React.createContext<{
  state: StoreState;
  result: AdviceResult | null;
} | null>(null);

export function useAdviceStore() {
  const ctx = React.useContext(AdviceContext);
  if (!ctx) throw new Error("useAdviceStore must be used within provider");
  return ctx;
}

/** Provider'ı yukarı taşımak için */
export function AdviceProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = React.useState(0);

  const [project, setProject] = React.useState<ProjectInput>({
    name: "",
    crop: "",
    region: "",
  });
  const [soil, setSoil] = React.useState<SoilInput>({
    method: "Sulu",
    bin: "0-1.0",
  });
  const [prefs, setPrefs] = React.useState<PreferencesInput>({
    ecoMode: false,
    tone: "Klasik",
  });
  const [prices, setPrices] = React.useState<PriceInput>({
    urea_try_per_kg: null,
    tsp_try_per_kg: null,
    sop_try_per_kg: null,
  });

  const [result, setResult] = React.useState<AdviceResult | null>(null);
  const [lastError, setLastError] = React.useState<string | null>(null);

  function compute() {
    setLastError(null);

    if (!project.name || !project.region || !project.crop) {
      setLastError("Proje bilgileri eksik.");
      return;
    }

    const tables = getTables();

    // Layer 1 lookup
    const N0 = lookupDose(tables.N, project.region, project.crop, soil.method, soil.bin);
    const P0 = lookupDose(tables.P2O5, project.region, project.crop, soil.method, soil.bin);
    const K0 = lookupDose(tables.K2O, project.region, project.crop, soil.method, soil.bin);

    const explain: any = {
      layer1: {
        inputs: { ...project, ...soil },
        raw: { N: N0, P2O5: P0, K2O: K0 },
        sources: {
          N: tables.N.meta.source_pdf,
          P2O5: tables.P2O5.meta.source_pdf,
          K2O: tables.K2O.meta.source_pdf,
        },
      },
    };

    // Layer 1.5 balance (placeholder)
    const bal = balance({ N: N0, P2O5: P0, K2O: K0 });
    explain.layer1_5 = bal.explain;

    // Layer 2 clamp (demo bounds)
    const bounds = { N: [0, 40], P2O5: [0, 30], K2O: [0, 30] };
    const N2 = typeof bal.doses.N === "number" ? clampDose(bal.doses.N, bounds.N[0], bounds.N[1]) : null;
    const P2 = typeof bal.doses.P2O5 === "number" ? clampDose(bal.doses.P2O5, bounds.P2O5[0], bounds.P2O5[1]) : null;
    const K2 = typeof bal.doses.K2O === "number" ? clampDose(bal.doses.K2O, bounds.K2O[0], bounds.K2O[1]) : null;
    explain.layer2 = { bounds, afterClamp: { N: N2, P2O5: P2, K2O: K2 } };

    // Layer 3 adjust
    const adj = adjustDoses({ N: N2, P2O5: P2, K2O: K2 }, prefs.ecoMode);
    explain.layer3 = adj.explain.layer3;

    const schedule = buildSchedule(adj.doses);
    const cost = estimateCostTry(adj.doses, prices);

    const out: AdviceResult = {
      N: typeof adj.doses.N === "number" ? { doseKgPerDa: adj.doses.N, source: "Layer1→3" } : undefined,
      P2O5: typeof adj.doses.P2O5 === "number" ? { doseKgPerDa: adj.doses.P2O5, source: "Layer1→3" } : undefined,
      K2O: typeof adj.doses.K2O === "number" ? { doseKgPerDa: adj.doses.K2O, source: "Layer1→3" } : undefined,
      schedule,
      cost,
      explain,
    };

    setResult(out);
  }

  const store: StoreState = {
    step,
    project,
    soil,
    prefs,
    prices,
    lastError,
    setProject,
    setSoil,
    setPrefs,
    setPrices,
    setStep,
    compute,
  };

  return (
    <AdviceContext.Provider value={{ state: store, result }}>
      {children}
    </AdviceContext.Provider>
  );
}

/** Stepper artık sadece UI; state provider'dan geliyor */
export function Stepper() {
  const { state } = useAdviceStore();

  const steps = [
    <Step1Project key="s1" value={state.project} onChange={state.setProject} />,
    <Step2Soil key="s2" value={state.soil} onChange={state.setSoil} />,
    <Step3Leaf key="s3" />,
    <Step4Prefs key="s4" value={state.prefs} onChange={state.setPrefs} />,
    <Step5Prices key="s5" value={state.prices} onChange={state.setPrices} />,
  ];

  return (
    <div className="space-y-4">
      <StepNav step={state.step} />
      <div>{steps[state.step]}</div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => state.setStep(Math.max(0, state.step - 1))}
          disabled={state.step === 0}
        >
          Geri
        </Button>
        <Button
          variant="secondary"
          onClick={() => state.setStep(Math.min(4, state.step + 1))}
          disabled={state.step === 4}
        >
          İleri
        </Button>
      </div>
    </div>
  );
}
