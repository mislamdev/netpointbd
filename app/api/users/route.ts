import { NextResponse } from "next/server";
import { readJSON } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { canManageUsers } from "@/lib/rbac";
import type { User } from "@/lib/types";

export async function GET() {
  const session = await getSession();
  if (!canManageUsers(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = await readJSON<User[]>("users");
  const safe = users.map((u) => ({ id: u.id, username: u.username, role: u.role, createdAt: u.createdAt, lastLogin: u.lastLogin }));
  return NextResponse.json({ users: safe });
}
