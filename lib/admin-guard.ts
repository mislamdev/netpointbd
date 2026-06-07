import { redirect } from "next/navigation";
import { getSession } from "./auth";
import type { SessionPayload } from "./auth";

export async function adminOrRedirect(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
