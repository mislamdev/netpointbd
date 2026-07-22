import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import type { SettingsFile } from "@/lib/types";
import EmergencyNoticesEditor from "./EmergencyNoticesEditor";

export const dynamic = "force-dynamic";

export default async function AdminEmergencyNoticesPage() {
  await adminOrRedirect();
  const data = await readJSON<SettingsFile>("settings");
  return (
    <div className="admin-card">
      <h2>Emergency notice</h2>
      <EmergencyNoticesEditor initial={data.home.emergencyNotices} current={data} />
    </div>
  );
}