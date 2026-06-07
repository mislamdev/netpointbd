import type { JsonFile } from "./types";

export const CACHE_TTL_MS = 60_000;

interface Entry<T> {
  value: T;
  expiresAt: number;
}

const store = new Map<JsonFile, Entry<unknown>>();

export function cacheGet<T>(file: JsonFile): T | undefined {
  const entry = store.get(file) as Entry<T> | undefined;
  if (!entry) return undefined;
  if (entry.expiresAt < Date.now()) {
    store.delete(file);
    return undefined;
  }
  return entry.value;
}

export function cacheSet<T>(file: JsonFile, value: T): void {
  store.set(file, { value, expiresAt: Date.now() + CACHE_TTL_MS });
}

export function cacheInvalidate(file: JsonFile): void {
  store.delete(file);
}

export function cacheInvalidateAll(): void {
  store.clear();
}
