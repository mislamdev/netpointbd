import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { settingsFileSchema } from "@/lib/schemas";
import type { SettingsFile } from "@/lib/types";
import { getSession } from "@/lib/auth";
import { canEdit } from "@/lib/rbac";

export async function GET() {
  const data = await readJSON<SettingsFile>("settings");
  return NextResponse.json({ settings: data });
}

export async function PUT(req: Request) {
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
  const parsed = settingsFileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  await writeJSON("settings", parsed.data);
  return NextResponse.json({ ok: true, settings: parsed.data });
}
