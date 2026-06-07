import { readJSON } from "@/lib/db";
import type { PackagesFile } from "@/lib/types";
import PackagesPage from "./PackagesClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const packages = await readJSON<PackagesFile>("packages");
  return <PackagesPage packages={packages} />;
}
