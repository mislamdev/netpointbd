import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { readJSON, writeJSON } from "./db";
import type { User, UserRole } from "./types";
import { getJwtSecretOrThrow } from "./jwt-secret";

const COOKIE_NAME = "np_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 8;

export interface SessionPayload {
  sub: string;
  username: string;
  role: UserRole;
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ username: payload.username, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE}s`)
    .sign(getJwtSecretOrThrow());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretOrThrow());
    if (typeof payload.sub !== "string" || typeof payload.username !== "string" || typeof payload.role !== "string") {
      return null;
    }
    return { sub: payload.sub, username: payload.username, role: payload.role as UserRole };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function login(username: string, password: string): Promise<User | null> {
  const users = await readJSON<User[]>("users");
  const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  const updated: User = { ...user, lastLogin: new Date().toISOString() };
  await writeJSON("users", users.map((u) => (u.id === user.id ? updated : u)));
  return updated;
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function createUser(
  username: string,
  password: string,
  role: UserRole,
): Promise<User> {
  const users = await readJSON<User[]>("users");
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    throw new Error("Username already exists.");
  }
  const user: User = {
    id: randomUUID(),
    username,
    passwordHash: await hashPassword(password),
    role,
    createdAt: new Date().toISOString(),
    lastLogin: null,
  };
  await writeJSON("users", [...users, user]);
  return user;
}

export function sessionCookieName(): string {
  return COOKIE_NAME;
}
