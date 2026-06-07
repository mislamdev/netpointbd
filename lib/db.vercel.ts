import type { JsonFile } from "./types";

export function isVercelStorage(): boolean {
  return process.env.STORAGE_DRIVER === "vercel";
}

export interface VercelStorage {
  read<T>(file: JsonFile): Promise<T | null>;
  write<T>(file: JsonFile, data: T): Promise<void>;
}

class VercelNotImplementedError extends Error {
  constructor() {
    super(
      "STORAGE_DRIVER=vercel is set but the Vercel adapter is not configured for this environment. " +
        "Either unset STORAGE_DRIVER (to use local JSON files) or wire up Vercel KV / Turso in lib/db.vercel.ts. " +
        "See docs/Admin-Backend/DEPLOY-VERCEL.md.",
    );
  }
}

export async function vercelRead<T>(_file: JsonFile): Promise<T | null> {
  throw new VercelNotImplementedError();
}

export async function vercelWrite<T>(_file: JsonFile, _data: T): Promise<void> {
  throw new VercelNotImplementedError();
}
