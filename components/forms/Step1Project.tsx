import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import type { ProjectInput } from "@/lib/types";
import { getTables } from "@/lib/seed";

export function Step1Project({
  value,
  onChange,
}: {
  value: ProjectInput;
  onChange: (v: ProjectInput) => void;
}) {
  const tables = getTables();
  const regions = Object.keys(tables.N.data ?? {});

  // crops by region (use N table as canonical)
  const crops = value.region ? Object.keys(tables.N.data?.[value.region] ?? {}) : [];

  return (
    <Card>
      <h2 className="text-lg font-semibold">Proje Bilgisi</h2>
      <div className="mt-4 grid gap-4">
        <div className="grid gap-2">
          <Label>Proje Adı</Label>
          <Input value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} placeholder="Örn: Serik-2026" />
        </div>

        <div className="grid gap-2">
          <Label>Bölge</Label>
          <Select
            value={value.region}
            onChange={(e) => onChange({ ...value, region: e.target.value, crop: "" })}
          >
            <option value="">Seçiniz</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Bitki</Label>
          <Select
            value={value.crop}
            onChange={(e) => onChange({ ...value, crop: e.target.value })}
            disabled={!value.region}
          >
            <option value="">Seçiniz</option>
            {crops.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </Card>
  );
}
