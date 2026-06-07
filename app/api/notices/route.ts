import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { readJSON, writeJSON } from "@/lib/db";
import { noticeSchema } from "@/lib/schemas";
import type { Notice } from "@/lib/types";
import { getSession } from "@/lib/auth";
import { canEdit } from "@/lib/rbac";

export async function GET() {
  const data = await readJSON<Notice[]>("notices");
  return NextResponse.json({ notices: data });
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
  const parsed = noticeSchema.safeParse(candidate);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  const notices = await readJSON<Notice[]>("notices");
  const next = [...notices, parsed.data];
  await writeJSON("notices", next);
  return NextResponse.json({ ok: true, notice: parsed.data });
}
