import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { readJSON, writeJSON } from "@/lib/db";
import { productSchema } from "@/lib/schemas";
import type { Product } from "@/lib/types";
import { getSession } from "@/lib/auth";
import { canEdit } from "@/lib/rbac";

export async function GET() {
  const products = await readJSON<Product[]>("products");
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!canEdit(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const candidate = { ...(body as Record<string, unknown>), id: randomUUID() };
  const parsed = productSchema.safeParse(candidate);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  const products = await readJSON<Product[]>("products");
  const next = [...products, parsed.data];
  await writeJSON("products", next);
  return NextResponse.json({ ok: true, product: parsed.data });
}
