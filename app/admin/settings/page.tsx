import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import type { SettingsFile } from "@/lib/types";
import SettingsEditor from "./SettingsEditor";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await adminOrRedirect();
  const data = await readJSON<SettingsFile>("settings");
  return (
    <div className="admin-card">
      <h2>Site settings</h2>
      <p style={{ color: "#4a5568", fontSize: 14 }}>
        Site-wide contact info, the notification banner, and the per-page text used on the home, about, home-internet,
        corporate, and footer sections.
      </p>
      <SettingsEditor initial={data} />
    </div>
  );
}
