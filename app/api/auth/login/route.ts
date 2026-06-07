import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/schemas";
import { login, signSession, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials format" }, { status: 400 });
  }
  const user = await login(parsed.data.username, parsed.data.password);
  if (!user) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }
  const token = await signSession({ sub: user.id, username: user.username, role: user.role });
  await setSessionCookie(token);
  return NextResponse.json({ ok: true, user: { id: user.id, username: user.username, role: user.role } });
}
