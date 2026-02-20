import { clamp, round1 } from "@/lib/util";

export function clampDose(dose: number, minDose: number, maxDose: number) {
  return round1(clamp(dose, minDose, maxDose));
}
