import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { productSchema } from "@/lib/schemas";
import type { Product } from "@/lib/types";
import { getSession } from "@/lib/auth";
import { canEdit } from "@/lib/rbac";

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!canEdit(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const candidate = { ...(body as Record<string, unknown>), id };
  const parsed = productSchema.safeParse(candidate);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  const products = await readJSON<Product[]>("products");
  const next = products.map((p) => (p.id === id ? parsed.data : p));
  await writeJSON("products", next);
  return NextResponse.json({ ok: true, product: parsed.data });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!canEdit(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const products = await readJSON<Product[]>("products");
  const next = products.filter((p) => p.id !== id);
  await writeJSON("products", next);
  return NextResponse.json({ ok: true });
}
