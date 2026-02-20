import { Card } from "@/components/ui/Card";
import type { AdviceResult } from "@/lib/types";

export function SchedulePanel({ result }: { result: AdviceResult | null }) {
  return (
    <Card className="mt-4">
      <h3 className="font-semibold">Program</h3>
      {!result ? (
        <p className="mt-2 text-sm text-neutral-600">Hesap sonrası program listelenir.</p>
      ) : result.schedule.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-600">Program yok.</p>
      ) : (
        <ol className="mt-2 list-decimal pl-5 text-sm text-neutral-700">
          {result.schedule.map((s, i) => (
            <li key={i}>
              <span className="font-medium">{s.when}:</span> {s.what} — {s.amount}
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
