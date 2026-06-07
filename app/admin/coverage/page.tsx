import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import type { CoverageArea } from "@/lib/types";
import CoverageEditor from "./CoverageEditor";

export const dynamic = "force-dynamic";

export default async function AdminCoveragePage() {
  await adminOrRedirect();
  const areas = await readJSON<CoverageArea[]>("coverage");
  return (
    <div className="admin-card">
      <h2>Coverage areas</h2>
      <p style={{ color: "#4a5568", fontSize: 14 }}>
        Areas where Net Point BD provides service. Coords are optional Google Maps coordinates (e.g.
        <code> 24.8323,89.3738</code>).
      </p>
      <CoverageEditor initial={areas} />
    </div>
  );
}
