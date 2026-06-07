import type { SessionPayload } from "./auth";
import type { UserRole } from "./types";

export function isAdmin(session: SessionPayload | null): boolean {
  return session?.role === "admin";
}

export function canEdit(session: SessionPayload | null): boolean {
  return session?.role === "admin" || session?.role === "editor";
}

export function canManageUsers(session: SessionPayload | null): boolean {
  return session?.role === "admin";
}

export function requireRole(_role: UserRole): string | null {
  return null;
}
