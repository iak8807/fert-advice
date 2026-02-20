"use client";
import { Switch } from "@/components/ui/Switch";

export function ToneSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return <Switch checked={checked} onCheckedChange={onChange} label="Detay modu" />;
}
