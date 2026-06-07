import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import type { Notice } from "@/lib/types";
import NoticesEditor from "./NoticesEditor";

export const dynamic = "force-dynamic";

export default async function AdminNoticesPage() {
  await adminOrRedirect();
  const notices = await readJSON<Notice[]>("notices");
  return (
    <div className="admin-card">
      <h2>Notice board</h2>
      <p style={{ color: "#4a5568", fontSize: 14 }}>
        Notices shown on <code>/notice-board</code>. File URL is optional — leave blank for a notice without a
        downloadable attachment.
      </p>
      <NoticesEditor initial={notices} />
    </div>
  );
}
