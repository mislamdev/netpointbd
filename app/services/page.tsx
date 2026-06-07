import PageTitle from '@/components/PageTitle';
import { readJSON } from '@/lib/db';
import type { ServicesFile } from '@/lib/types';

export const dynamic = "force-dynamic";

const ICONS: Record<string, string> = {
  "live-tv": "bx-tv",
  "ftp-server": "bx-server",
  "torrent": "bx-download",
  "bangla-library": "bx-book",
  "song-zone": "bx-music",
  "newspaper": "bx-news",
  "jobs": "bx-briefcase",
  "gov-websites": "bx-buildings",
  "education": "bx-book-reader",
  "court-of-law": "bx-gavel",
  "online-shop-point": "bx-cart",
  "all-type-tickets": "bx-purchase-tag",
  "emergency-service": "bx-phone",
};

export default async function ServicesIndexPage() {
  const data = await readJSON<ServicesFile>('services');
  const entries = Object.entries(data);
  return (
    <>
      <PageTitle title="Our Services" breadcrumb={[{ name: 'Services' }]} />
      <section className="ptb-100">
        <div className="container">
          <div className="section-title text-center">
            <h1>Our Services</h1>
            <p>Additional services for our customers</p>
          </div>
          <div className="row">
            {entries.map(([slug, section]) => (
              <div key={slug} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <a href={`/services/${slug}`} className="service-box">
                  <div className="single-challenges overly-one">
                    <div className="overly-two">
                      <i className={`bx ${ICONS[slug] ?? 'bx-link'}`}></i>
                      <h3>{section.pageTitle}</h3>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
