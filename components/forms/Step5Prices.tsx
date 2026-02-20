import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import type { PriceInput } from "@/lib/types";

export function Step5Prices({
  value,
  onChange,
}: {
  value: PriceInput;
  onChange: (v: PriceInput) => void;
}) {
  function numOrNull(s: string) {
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold">Fiyatlar (TRY/kg)</h2>
      <p className="mt-1 text-sm text-neutral-600">Maliyet hesabı demo amaçlıdır.</p>
      <div className="mt-4 grid gap-4">
        <div className="grid gap-2">
          <Label>Üre (46% N)</Label>
          <Input
            inputMode="decimal"
            placeholder="örn: 18.5"
            value={value.urea_try_per_kg ?? ""}
            onChange={(e) => onChange({ ...value, urea_try_per_kg: numOrNull(e.target.value) })}
          />
        </div>
        <div className="grid gap-2">
          <Label>TSP (46% P2O5)</Label>
          <Input
            inputMode="decimal"
            placeholder="örn: 15"
            value={value.tsp_try_per_kg ?? ""}
            onChange={(e) => onChange({ ...value, tsp_try_per_kg: numOrNull(e.target.value) })}
          />
        </div>
        <div className="grid gap-2">
          <Label>Potasyum Sülfat (SOP)</Label>
          <Input
            inputMode="decimal"
            placeholder="örn: 28"
            value={value.sop_try_per_kg ?? ""}
            onChange={(e) => onChange({ ...value, sop_try_per_kg: numOrNull(e.target.value) })}
          />
        </div>
      </div>
    </Card>
  );
}
