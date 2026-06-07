import { readJSON } from "@/lib/db";
import type { SettingsFile } from "@/lib/types";
import AboutPage from "./AboutClient";
import ContactCallToAction from "@/components/ContactCallToAction";

export const dynamic = "force-dynamic";

export default async function Page() {
  await readJSON<SettingsFile>('settings');
  return (
    <>
      <AboutPage />
      <ContactCallToAction />
    </>
  );
}
