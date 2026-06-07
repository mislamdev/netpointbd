import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import type { PackagesFile } from "@/lib/types";
import PackagesEditor from "./PackagesEditor";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  await adminOrRedirect();
  const data = await readJSON<PackagesFile>("packages");
  return (
    <div className="admin-card">
      <h2>Internet packages</h2>
      <p style={{ color: "#4a5568", fontSize: 14 }}>
        Three tabs: Home, Corporate, Government. Price is in taka. Leave price as 0 and unit as <code>/Month</code> for
        "Custom" plans.
      </p>
      <PackagesEditor initial={data} />
    </div>
  );
}
