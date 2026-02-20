import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className = "", variant = "primary", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition " +
    "focus:outline-none focus:ring-2 focus:ring-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed";
  const v =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : variant === "secondary"
      ? "bg-white text-neutral-900 ring-1 ring-neutral-200 hover:bg-neutral-50"
      : "bg-transparent text-neutral-900 hover:bg-neutral-100";
  return <button className={`${base} ${v} ${className}`} {...props} />;
}
