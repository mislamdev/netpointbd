import { promises as fs } from "fs";
import path from "path";
import { withLock } from "./lock";
import { cacheGet, cacheSet, cacheInvalidate } from "./cache";
import type { JsonFile } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

export const JSON_FILES: JsonFile[] = [
  "services",
  "packages",
  "products",
  "coverage",
  "notices",
  "settings",
  "users",
];

function pathFor(file: JsonFile): string {
  return path.join(DATA_DIR, `${file}.json`);
}

async function ensureDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readRaw<T>(file: JsonFile): Promise<T> {
  await ensureDir();
  const buf = await fs.readFile(pathFor(file), "utf-8");
  return JSON.parse(buf) as T;
}

async function writeRaw<T>(file: JsonFile, data: T): Promise<void> {
  await ensureDir();
  const target = pathFor(file);
  const tmp = `${target}.tmp-${process.pid}-${Date.now()}`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2) + "\n", "utf-8");
  await fs.rename(tmp, target);
}

export async function readJSON<T>(file: JsonFile): Promise<T> {
  const cached = cacheGet<T>(file);
  if (cached !== undefined) return cached;
  return withLock(file, async () => {
    const fresh = cacheGet<T>(file);
    if (fresh !== undefined) return fresh;
    const data = await readRaw<T>(file);
    cacheSet(file, data);
    return data;
  });
}

export async function writeJSON<T>(file: JsonFile, data: T): Promise<void> {
  return withLock(file, async () => {
    await writeRaw(file, data);
    cacheSet(file, data);
  });
}

export async function updateJSON<T>(
  file: JsonFile,
  mutator: (current: T) => T | Promise<T>,
): Promise<T> {
  return withLock(file, async () => {
    const current = await readRaw<T>(file);
    const next = await mutator(current);
    await writeRaw(file, next);
    cacheSet(file, next);
    return next;
  });
}

export function invalidateFile(file: JsonFile): void {
  cacheInvalidate(file);
}

export function invalidateAll(): void {
  JSON_FILES.forEach((f) => cacheInvalidate(f));
}

export function isStorageDriverVercel(): boolean {
  return process.env.STORAGE_DRIVER === "vercel";
}
