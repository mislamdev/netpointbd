import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { packagesFileSchema } from "@/lib/schemas";
import type { PackagesFile } from "@/lib/types";
import { getSession } from "@/lib/auth";
import { canEdit } from "@/lib/rbac";

export async function GET() {
  const data = await readJSON<PackagesFile>("packages");
  return NextResponse.json({ packages: data });
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
  const parsed = packagesFileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  await writeJSON("packages", parsed.data);
  return NextResponse.json({ ok: true, packages: parsed.data });
}
