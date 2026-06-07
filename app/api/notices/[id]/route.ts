import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { noticeSchema } from "@/lib/schemas";
import type { Notice } from "@/lib/types";
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
  const parsed = noticeSchema.safeParse(candidate);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  const notices = await readJSON<Notice[]>("notices");
  const next = notices.map((n) => (n.id === id ? parsed.data : n));
  await writeJSON("notices", next);
  return NextResponse.json({ ok: true, notice: parsed.data });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!canEdit(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const notices = await readJSON<Notice[]>("notices");
  const next = notices.filter((n) => n.id !== id);
  await writeJSON("notices", next);
  return NextResponse.json({ ok: true });
}
