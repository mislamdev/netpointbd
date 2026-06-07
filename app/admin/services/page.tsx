import Link from "next/link";
import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import { SERVICE_SLUGS, type ServicesFile } from "@/lib/types";

export const dynamic = "force-dynamic";

const LABELS: Record<string, string> = {
  "live-tv": "Live TV",
  "ftp-server": "FTP Server",
  "torrent": "Torrent",
  "bangla-library": "Bangla Library",
  "song-zone": "Song Zone",
  "newspaper": "Newspaper",
  "jobs": "Jobs",
  "gov-websites": "সরকারি ওয়েবসাইট",
  "education": "Education",
  "court-of-law": "আইন আদালত",
  "online-shop-point": "Online Shop Point",
  "all-type-tickets": "সকল প্রকার টিকেট",
  "emergency-service": "Emergency Service",
};

export default async function AdminServicesPage() {
  await adminOrRedirect();
  const data = await readJSON<ServicesFile>("services");

  return (
    <div className="admin-card">
      <h2>Service sub-pages</h2>
      <p style={{ color: "#4a5568", fontSize: 14 }}>
        Each entry is one of the 13 sub-pages under <code>/services/…</code>. Add or remove <em>items</em> within each
        section.
      </p>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Section</th>
            <th>Slug</th>
            <th>Items</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {SERVICE_SLUGS.map((slug) => {
            const section = data[slug];
            return (
              <tr key={slug}>
                <td>{LABELS[slug] ?? slug}</td>
                <td>
                  <code>{slug}</code>
                </td>
                <td>{section?.items.length ?? 0}</td>
                <td>
                  <Link href={`/admin/services/${slug}`} className="admin-btn admin-btn--ghost">
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
