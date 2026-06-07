import { readJSON } from "@/lib/db";
import type { SettingsFile } from "@/lib/types";
import HomePage from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const settings = await readJSON<SettingsFile>('settings');
  return <HomePage home={settings.home} />;
}
