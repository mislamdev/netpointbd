import Link from "next/link";
import { notFound } from "next/navigation";
import { adminOrRedirect } from "@/lib/admin-guard";
import { readJSON } from "@/lib/db";
import { SERVICE_SLUGS, type ServicesFile } from "@/lib/types";
import ServiceEditor from "./ServiceEditor";

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
      <p style={{ fontSize: 13, color: "#718096", margin: 0 }}>
        <Link href="/admin/services">← All services</Link>
      </p>
      <h2 style={{ marginTop: 8 }}>Edit “{section.pageTitle}”</h2>
      <ServiceEditor slug={slug} initial={section} />
    </div>
  );
}
