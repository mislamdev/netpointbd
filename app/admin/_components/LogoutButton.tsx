"use client";

export default function LogoutButton() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <button type="button" className="admin-btn admin-btn--danger" style={{ width: "100%" }} onClick={logout}>
      Logout
    </button>
  );
}
