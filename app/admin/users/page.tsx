import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import type { User } from "@/lib/types";
import UsersEditor from "./UsersEditor";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await adminOrRedirect();
  if (session.role !== "admin") {
    return (
      <div className="admin-card">
        <h2>Admin users</h2>
        <p>Only admins can manage other users.</p>
      </div>
    );
  }
  const users = await readJSON<User[]>("users");
  return (
    <div className="admin-card">
      <h2>Admin users</h2>
      <UsersEditor initial={users.map((u) => ({ id: u.id, username: u.username, role: u.role, createdAt: u.createdAt, lastLogin: u.lastLogin }))} />
    </div>
  );
}
