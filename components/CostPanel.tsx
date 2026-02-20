import { Card } from "@/components/ui/Card";
import type { AdviceResult } from "@/lib/types";

export function CostPanel({ result }: { result: AdviceResult | null }) {
  return (
    <Card className="mt-4">
      <h3 className="font-semibold">Maliyet</h3>
      {!result ? (
        <p className="mt-2 text-sm text-neutral-600">Fiyat girersen yaklaşık maliyet hesaplanır.</p>
      ) : (
        <div className="mt-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-neutral-600">Toplam</span>
            <span className="font-semibold">{result.cost.totalTry} TRY/da</span>
          </div>
          <ul className="mt-2 list-disc pl-5 text-neutral-700">
            {result.cost.breakdown.map((b, i) => (
              <li key={i}>
                {b.name}: {b.try} TRY
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
