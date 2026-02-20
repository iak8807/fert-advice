import { Badge } from "@/components/ui/Badge";

export function AvailabilityBadges({
  okProject,
  okSoil,
}: {
  okProject: boolean;
  okSoil: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className={okProject ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200"}>
        Proje: {okProject ? "OK" : "Eksik"}
      </Badge>
      <Badge className={okSoil ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200"}>
        Toprak: {okSoil ? "OK" : "Eksik"}
      </Badge>
    </div>
  );
}
