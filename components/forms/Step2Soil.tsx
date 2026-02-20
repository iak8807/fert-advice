import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import type { SoilInput } from "@/lib/types";
import { getTables } from "@/lib/seed";

export function Step2Soil({
  value,
  onChange,
}: {
  value: SoilInput;
  onChange: (v: SoilInput) => void;
}) {
  const tables = getTables();
  const bins = tables.N.bins;

  return (
    <Card>
      <h2 className="text-lg font-semibold">Toprak (Bin seçimi)</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Bu demo, sayısal analiz değerlerini biniğe çevirmiyor; doğrudan sınıf (bin) seçiyorsun.
      </p>

      <div className="mt-4 grid gap-4">
        <div className="grid gap-2">
          <Label>Sulama</Label>
          <Select value={value.method} onChange={(e) => onChange({ ...value, method: e.target.value as any })}>
            <option value="Sulu">Sulu</option>
            <option value="Kuru">Kuru</option>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Bin (Sınıf)</Label>
          <Select value={value.bin} onChange={(e) => onChange({ ...value, bin: e.target.value })}>
            {bins.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  );
}
