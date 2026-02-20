import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import type { PreferencesInput } from "@/lib/types";
import { Tabs } from "@/components/ui/Tabs";

export function Step4Prefs({
  value,
  onChange,
}: {
  value: PreferencesInput;
  onChange: (v: PreferencesInput) => void;
}) {
  return (
    <Card>
      <h2 className="text-lg font-semibold">Tercihler</h2>
      <div className="mt-4 grid gap-4">
        <Switch checked={value.ecoMode} onCheckedChange={(v) => onChange({ ...value, ecoMode: v })} label="Eco mode (N %10 azalt)" />
        <div className="grid gap-2">
          <div className="text-sm font-medium text-neutral-800">Anlatım tonu</div>
          <Tabs
            value={value.tone}
            onChange={(t) => onChange({ ...value, tone: t as any })}
            tabs={[
              { key: "Klasik", label: "Kısa" },
              { key: "Detaylı", label: "Detaylı" },
            ]}
          />
        </div>
      </div>
    </Card>
  );
}
