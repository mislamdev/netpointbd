import { notFound } from "next/navigation";
import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import { SERVICE_SLUGS, type ServicesFile } from "@/lib/types";
import ServiceEditor from "./ServiceEditor";
import BackToServicesButton from "./BackToServicesButton";

export const dynamic = "force-dynamic";

export default async function AdminServiceEditPage({ params }: { params: Promise<{ slug: string }> }) {
  await adminOrRedirect();
  const { slug } = await params;
  if (!(SERVICE_SLUGS as readonly string[]).includes(slug)) notFound();

  const data = await readJSON<ServicesFile>("services");
  const section = data[slug as keyof ServicesFile];
  if (!section) notFound();

  return (
    <div className="admin-card">
      <div style={{ marginBottom: 8 }}>
        <BackToServicesButton />
      </div>
      <h2 style={{ marginTop: 8 }}>Edit “{section.pageTitle}”</h2>
      <ServiceEditor slug={slug} initial={section} />
    </div>
  );
}
