import * as React from "react";

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-200 ${className}`}
      {...props}
    />
  );
}
