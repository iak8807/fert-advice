import type { SavedAdvice } from "@/lib/types";

const KEY = "fert_advice_saved";

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function saveAdvice(item: SavedAdvice) {
  if (!isBrowser()) return;
  const raw = localStorage.getItem(KEY);
  const arr: SavedAdvice[] = raw ? JSON.parse(raw) : [];
  arr.unshift(item);
  localStorage.setItem(KEY, JSON.stringify(arr.slice(0, 50)));
}

export function listAdvice(): SavedAdvice[] {
  if (!isBrowser()) return [];
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as SavedAdvice[]) : [];
}

export function getSavedAdvice(id: string): SavedAdvice | null {
  const all = listAdvice();
  return all.find((x) => x.id === id) ?? null;
}
