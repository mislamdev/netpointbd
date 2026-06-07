import { NextResponse } from "next/server";
import { invalidateAll, invalidateFile } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { canEdit } from "@/lib/rbac";
import type { JsonFile } from "@/lib/types";

const VALID: JsonFile[] = ["services", "packages", "products", "coverage", "notices", "settings", "users"];

export async function POST(req: Request) {
  const session = await getSession();
  if (!canEdit(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { file?: JsonFile } = {};
  try {
    body = (await req.json()) as { file?: JsonFile };
  } catch {
    /* allow empty */
  }
  if (body.file && VALID.includes(body.file)) {
    invalidateFile(body.file);
    return NextResponse.json({ ok: true, invalidated: [body.file] });
  }
  invalidateAll();
  return NextResponse.json({ ok: true, invalidated: "all" });
}
