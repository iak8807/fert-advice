import * as React from "react";

export function Badge({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-700 ring-1 ring-neutral-200 ${className}`}
      {...props}
    />
  );
}
