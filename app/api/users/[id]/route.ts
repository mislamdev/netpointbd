import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getSession, hashPassword } from "@/lib/auth";
import { canManageUsers } from "@/lib/rbac";
import type { User } from "@/lib/types";
import { z } from "zod";

const schema = z.object({
  password: z.string().min(6).optional(),
  role: z.enum(["admin", "editor"]).optional(),
});

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!canManageUsers(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (session!.sub === id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }
  const users = await readJSON<User[]>("users");
  const next = users.filter((u) => u.id !== id);
  await writeJSON("users", next);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!canManageUsers(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  const users = await readJSON<User[]>("users");
  const next = await Promise.all(
    users.map(async (u) => {
      if (u.id !== id) return u;
      return {
        ...u,
        role: parsed.data.role ?? u.role,
        passwordHash: parsed.data.password ? await hashPassword(parsed.data.password) : u.passwordHash,
      };
    }),
  );
  await writeJSON("users", next);
  return NextResponse.json({ ok: true });
}
