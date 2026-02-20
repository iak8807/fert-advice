"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AvailabilityBadges } from "@/components/AvailabilityBadges";
import { ExplainabilityPanel } from "@/components/ExplainabilityPanel";
import { CostPanel } from "@/components/CostPanel";
import { SchedulePanel } from "@/components/SchedulePanel";
import { FertilizerProductsPanel } from "@/components/FertilizerProductsPanel";
import { saveAdvice } from "@/lib/storage";
import type { SavedAdvice } from "@/lib/types";
import { uid } from "@/lib/util";
import { useAdviceStore } from "@/components/Stepper";

export function PreviewPanels() {
  const { state, result } = useAdviceStore();

  const okProject = Boolean(state.project.name && state.project.crop && state.project.region);
  const okSoil = Boolean(state.soil.bin && state.soil.method);

  const canSave = Boolean(result && okProject && okSoil);

  const [savedId, setSavedId] = React.useState<string | null>(null);

  function doSave() {
    if (!result) return;
    const id = uid("print");
    const item: SavedAdvice = {
      id,
      createdAt: new Date().toISOString(),
      project: state.project,
      soil: state.soil,
      prefs: state.prefs,
      prices: state.prices,
      result,
    };
    saveAdvice(item);
    setSavedId(id);
  }

  return (
    <div>
      <Card>
        <h2 className="text-lg font-semibold">Önizleme</h2>
        <div className="mt-3">
          <AvailabilityBadges okProject={okProject} okSoil={okSoil} />
        </div>

        <div className="mt-4 rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-200">
          <div className="text-sm text-neutral-600">Öneri</div>
          {!result ? (
            <div className="mt-2 text-sm text-neutral-700">Hesaplamak için “Hesapla” butonuna bas.</div>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              <li><span className="font-medium">N:</span> {result.N?.doseKgPerDa ?? "-"} kg/da</li>
              <li><span className="font-medium">P2O5:</span> {result.P2O5?.doseKgPerDa ?? "-"} kg/da</li>
              <li><span className="font-medium">K2O:</span> {result.K2O?.doseKgPerDa ?? "-"} kg/da</li>
            </ul>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={state.compute} disabled={!okProject || !okSoil}>
            Hesapla
          </Button>
          <Button variant="secondary" onClick={doSave} disabled={!canSave}>
            Yazdır sayfası oluştur
          </Button>
          {savedId ? (
            <Button
              variant="ghost"
              onClick={() => {
                window.location.href = `/print/${savedId}`;
              }}
            >
              Yazdır sayfasına git →
            </Button>
          ) : null}
        </div>

        {state.lastError ? (
          <p className="mt-3 text-sm text-rose-700">{state.lastError}</p>
        ) : null}
      </Card>

      <SchedulePanel result={result} />
      <CostPanel result={result} />
      <FertilizerProductsPanel result={result} />
      <ExplainabilityPanel result={result} />
    </div>
  );
}
