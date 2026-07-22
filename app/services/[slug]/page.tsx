import { notFound } from "next/navigation";
import PageTitle from "@/components/PageTitle";
import { readJSON } from "@/lib/db";
import { getAssetPath } from "@/lib/utils";
import { SERVICE_SLUGS, type ServicesFile } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(SERVICE_SLUGS as readonly string[]).includes(slug)) notFound();

  const data = await readJSON<ServicesFile>("services");
  const section = data[slug as keyof ServicesFile];
  if (!section) notFound();
  const visibleItems = section.items
    .filter((item) => item.enabled ?? true)
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));

  return (
    <>
      <PageTitle
        title={section.pageTitle}
        style="centered"
        description={section.pageDescription}
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {visibleItems.map((item) => (
              <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-services">
                  <div className="services-img">
                    <a target="_blank" href={item.url} rel="noopener noreferrer">
                      <img
                        src={getAssetPath(item.image)}
                        alt={item.name}
                        width="290"
                        height="345"
                        title={item.name}
                        loading="lazy"
                      />
                    </a>
                  </div>

                  <div className="services-content">
                    <h3>
                      <a target="_blank" href={item.url} rel="noopener noreferrer">
                        {item.name}
                      </a>
                    </h3>
                    <div className="content">
                      <a target="_blank" href={item.url} className="read-more" rel="noopener noreferrer">
                        Read More
                        <i className="flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
