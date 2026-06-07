import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { serviceSectionSchema } from "@/lib/schemas";
import { SERVICE_SLUGS, type ServicesFile } from "@/lib/types";
import { getSession } from "@/lib/auth";
import { canEdit } from "@/lib/rbac";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  if (!(SERVICE_SLUGS as readonly string[]).includes(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await readJSON<ServicesFile>("services");
  return NextResponse.json({ section: data[slug as keyof ServicesFile] });
}

export async function PUT(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const session = await getSession();
  if (!canEdit(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  if (!(SERVICE_SLUGS as readonly string[]).includes(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = serviceSectionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  const data = await readJSON<ServicesFile>("services");
  const next = { ...data, [slug]: parsed.data };
  await writeJSON("services", next);
  return NextResponse.json({ ok: true, section: next[slug as keyof ServicesFile] });
}
