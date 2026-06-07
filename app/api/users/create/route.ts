import { NextResponse } from "next/server";
import { createUser, getSession } from "@/lib/auth";
import { canManageUsers } from "@/lib/rbac";
import { z } from "zod";

const schema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(6),
  role: z.enum(["admin", "editor"]),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!canManageUsers(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
  try {
    const user = await createUser(parsed.data.username, parsed.data.password, parsed.data.role);
    return NextResponse.json({ ok: true, user: { id: user.id, username: user.username, role: user.role, createdAt: user.createdAt } });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
