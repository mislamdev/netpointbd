import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { coverageAreaSchema } from "@/lib/schemas";
import type { CoverageArea } from "@/lib/types";
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
  const parsed = coverageAreaSchema.safeParse(candidate);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  const areas = await readJSON<CoverageArea[]>("coverage");
  const next = areas.map((a) => (a.id === id ? parsed.data : a));
  await writeJSON("coverage", next);
  return NextResponse.json({ ok: true, area: parsed.data });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!canEdit(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const areas = await readJSON<CoverageArea[]>("coverage");
  const next = areas.filter((a) => a.id !== id);
  await writeJSON("coverage", next);
  return NextResponse.json({ ok: true });
}
