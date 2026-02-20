import { Badge } from "@/components/ui/Badge";

export function StepNav({ step }: { step: number }) {
  const items = ["Proje", "Toprak", "Yaprak", "Tercihler", "Fiyatlar"];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((label, idx) => (
        <Badge key={label} className={idx === step ? "bg-neutral-900 text-white ring-neutral-900" : ""}>
          {idx + 1}. {label}
        </Badge>
      ))}
    </div>
  );
}
