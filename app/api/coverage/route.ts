import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { readJSON, writeJSON } from "@/lib/db";
import { coverageAreaSchema } from "@/lib/schemas";
import type { CoverageArea } from "@/lib/types";
import { getSession } from "@/lib/auth";
import { canEdit } from "@/lib/rbac";

export async function GET() {
  const data = await readJSON<CoverageArea[]>("coverage");
  return NextResponse.json({ areas: data });
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
  const parsed = coverageAreaSchema.safeParse(candidate);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  const areas = await readJSON<CoverageArea[]>("coverage");
  const next = [...areas, parsed.data];
  await writeJSON("coverage", next);
  return NextResponse.json({ ok: true, area: parsed.data });
}
