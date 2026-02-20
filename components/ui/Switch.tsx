import * as React from "react";

export function Switch({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className="flex items-center gap-2"
      aria-pressed={checked}
    >
      <span
        className={`h-6 w-10 rounded-full p-1 transition ${
          checked ? "bg-neutral-900" : "bg-neutral-200"
        }`}
      >
        <span
          className={`block h-4 w-4 rounded-full bg-white transition ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
      {label ? <span className="text-sm text-neutral-700">{label}</span> : null}
    </button>
  );
}
