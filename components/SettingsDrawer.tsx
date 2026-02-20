"use client";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { useAdviceStore } from "@/components/Stepper";

export function SettingsDrawer() {
  const { state } = useAdviceStore();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Button variant="secondary" onClick={() => setOpen((v) => !v)}>
        Ayarlar
      </Button>

      {open ? (
        <div className="absolute right-0 top-12 z-20 w-[320px]">
          <Card className="shadow-lg">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Genel</div>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Kapat
              </Button>
            </div>

            <div className="mt-4 grid gap-3">
              <Switch
                checked={state.prefs.ecoMode}
                onCheckedChange={(v) => state.setPrefs({ ...state.prefs, ecoMode: v })}
                label="Eco mode"
              />
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              Bu prototip verileri <code>data/*.json</code> dosyalarından okur.
            </p>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
