import Link from "next/link";
import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import type {
  ServicesFile,
  PackagesFile,
  Product,
  CoverageArea,
  Notice,
  SettingsFile,
} from "@/lib/types";

export const dynamic = "force-dynamic";

const RENDER_NOW = Date.now();

export default async function AdminDashboard() {
  await adminOrRedirect();
  const [services, packages, products, coverage, notices, settings] = await Promise.all([
    readJSON<ServicesFile>("services"),
    readJSON<PackagesFile>("packages"),
    readJSON<Product[]>("products"),
    readJSON<CoverageArea[]>("coverage"),
    readJSON<Notice[]>("notices"),
    readJSON<SettingsFile>("settings"),
  ]);

  const now = RENDER_NOW;
  const visibleEmergency = settings.home.emergencyNotices.filter((n) => {
    if (!n.enabled) return false;
    if (n.text.trim().length === 0) return false;
    const start = n.startAt ? Date.parse(n.startAt) : NaN;
    const end = n.endAt ? Date.parse(n.endAt) : NaN;
    if (!Number.isNaN(end) && end <= now) return false;
    if (!Number.isNaN(start) && start > now) return false;
    return true;
  }).length;
  const totalEmergency = settings.home.emergencyNotices.filter((n) => n.text.trim().length > 0).length;

  const tiles = [
    {
      href: "/admin/services",
      title: "Services",
      count: Object.values(services).reduce((sum, s) => sum + s.items.length, 0),
      label: "items across 13 sections",
    },
    {
      href: "/admin/packages",
      title: "Packages",
      count:
        packages.home.plans.length +
        packages.corporate.plans.length +
        packages.government.plans.length,
      label: "plans in 3 tabs",
    },
    { href: "/admin/products",  title: "Products",  count: products.length,  label: "products" },
    { href: "/admin/coverage",  title: "Coverage",  count: coverage.length,  label: "areas" },
    { href: "/admin/notices",   title: "Notices",   count: notices.length,   label: "notices" },
    {
      href: "/admin/emergency-notices",
      title: "Emergency notice",
      count: visibleEmergency,
      label: totalEmergency > 0 ? `of ${totalEmergency} live now` : "none scheduled",
    },
    {
      href: "/admin/settings",
      title: "Notification",
      count: settings.notification.enabled ? 1 : 0,
      label: settings.notification.enabled ? "active" : "off",
    },
  ];

  return (
    <>
      <div className="admin-card">
        <h2>Welcome</h2>
        <p style={{ color: "#4a5568", margin: 0 }}>
          Manage every section of netpointbd.com from here. Changes are saved to JSON files and appear on the public site
          within a minute (or instantly via the “Clear cache” button in the sidebar).
        </p>
      </div>
      <div className="admin-grid">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="admin-tile">
            <div className="admin-tile__title">{t.title}</div>
            <div className="admin-tile__count">{t.count}</div>
            <div className="admin-tile__label">{t.label}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
