"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserRow {
  id: string;
  username: string;
  role: "admin" | "editor";
  createdAt: string;
  lastLogin: string | null;
}

export default function UsersEditor({ initial }: { initial: UserRow[] }) {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>(initial);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "editor" as UserRow["role"] });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  async function create() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (res.ok) {
      const data = (await res.json()) as { user: UserRow };
      setUsers((cur) => [...cur, data.user]);
      setShowAdd(false);
      setNewUser({ username: "", password: "", role: "editor" });
      setMsg({ kind: "ok", text: "Created." });
    } else {
      const d = (await res.json().catch(() => ({}))) as { error?: string };
      setMsg({ kind: "err", text: d.error ?? "Create failed" });
    }
    setBusy(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this user?")) return;
    setBusy(true);
    setMsg(null);
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsers((cur) => cur.filter((u) => u.id !== id));
      setMsg({ kind: "ok", text: "Deleted." });
    } else {
      const d = (await res.json().catch(() => ({}))) as { error?: string };
      setMsg({ kind: "err", text: d.error ?? "Delete failed" });
    }
    setBusy(false);
    router.refresh();
  }

  async function changePassword(id: string) {
    const pw = prompt("New password (min 6 chars):");
    if (!pw) return;
    if (pw.length < 6) {
      setMsg({ kind: "err", text: "Password too short" });
      return;
    }
    setBusy(true);
    setMsg(null);
    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setBusy(false);
    if (res.ok) setMsg({ kind: "ok", text: "Password updated." });
    else {
      const d = (await res.json().catch(() => ({}))) as { error?: string };
      setMsg({ kind: "err", text: d.error ?? "Update failed" });
    }
  }

  return (
    <div>
      {msg && <div className={`admin-flash admin-flash--${msg.kind}`}>{msg.text}</div>}
      {!showAdd ? (
        <button type="button" className="admin-btn admin-btn--primary" onClick={() => setShowAdd(true)}>
          + Add user
        </button>
      ) : (
        <div className="admin-item">
          <h3>New user</h3>
          <div className="admin-field">
            <label>Username</label>
            <input
              type="text"
              value={newUser.username}
              onChange={(e) => setNewUser((c) => ({ ...c, username: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label>Password (min 6 chars)</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser((c) => ({ ...c, password: e.target.value }))}
            />
          </div>
          <div className="admin-field">
            <label>Role</label>
            <select value={newUser.role} onChange={(e) => setNewUser((c) => ({ ...c, role: e.target.value as UserRow["role"] }))}>
              <option value="admin">admin</option>
              <option value="editor">editor</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="admin-btn admin-btn--primary" onClick={create} disabled={busy}>
              {busy ? "Creating…" : "Create"}
            </button>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setShowAdd(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ height: 16 }} />

      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Created</th>
            <th>Last login</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>{u.createdAt.slice(0, 10)}</td>
              <td>{u.lastLogin ? u.lastLogin.slice(0, 19).replace("T", " ") : "—"}</td>
              <td>
                <div style={{ display: "flex", gap: 6 }}>
                  <button type="button" className="admin-btn admin-btn--ghost" onClick={() => changePassword(u.id)}>
                    Reset password
                  </button>
                  <button type="button" className="admin-btn admin-btn--danger" onClick={() => remove(u.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
