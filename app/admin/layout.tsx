import Link from "next/link";
import { getSession } from "@/lib/auth";
import { canManageUsers } from "@/lib/rbac";
import LogoutButton from "./_components/LogoutButton";
import ClearCacheButton from "./_components/ClearCacheButton";
import "./admin.css";

const NAV = [
  { group: "Content" },
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/coverage", label: "Coverage areas" },
  { href: "/admin/notices", label: "Notice board" },
  { href: "/admin/pages", label: "Page text" },
  { href: "/admin/settings", label: "Site settings" },
  { group: "Account" },
  { href: "/admin/users", label: "Admin users", requireAdmin: true },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const isAdmin = canManageUsers(session);

  return (
    <div className="admin-shell">
      <aside className="admin-shell__sidebar">
        <Link href="/admin" className="admin-shell__brand">
          Net Point BD · Admin
        </Link>
        <ul className="admin-shell__nav">
          {NAV.map((item, idx) => {
            if ("group" in item) {
              return (
                <li key={`g-${idx}`} className="admin-shell__nav-group">
                  {item.group}
                </li>
              );
            }
            if (item.requireAdmin && !isAdmin) return null;
            return (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            );
          })}
          <li className="admin-shell__nav-group">Tools</li>
          <li>
            <a href="/" target="_blank" rel="noreferrer" style={{ paddingLeft: 20 }}>
              View public site ↗
            </a>
          </li>
          <li style={{ padding: "8px 20px" }}>
            <ClearCacheButton />
          </li>
          <li style={{ padding: "8px 20px" }}>
            <LogoutButton />
          </li>
        </ul>
      </aside>
      <main className="admin-shell__main">
        <div className="admin-shell__topbar">
          <h1>Admin</h1>
          <div className="admin-shell__user">
            <span>
              {session?.username} <small style={{ color: "#a0aec0" }}>({session?.role})</small>
            </span>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
