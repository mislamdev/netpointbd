import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession, signSession, clearSessionCookie } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  return NextResponse.json({ user: session });
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const token = await signSession({ sub: session.sub, username: session.username, role: session.role });
  const jar = await cookies();
  jar.set("np_admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return NextResponse.json({ ok: true });
}
