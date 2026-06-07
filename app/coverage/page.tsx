import PageTitle from '@/components/PageTitle';
import { readJSON } from '@/lib/db';
import type { CoverageArea } from '@/lib/types';
import ContactCallToAction from '@/components/ContactCallToAction';

export const dynamic = "force-dynamic";

export default async function CoveragePage() {
  const areas = await readJSON<CoverageArea[]>('coverage');
  return (
    <>
      <PageTitle
        title="Coverage Area"
        style="centered"
        description="Net Point BD provides high-speed internet service across multiple areas in Bogura. Check if we provide service in your area and get connected to reliable internet today."
      />

      <section className="protect-area protect-area-three ptb-100">
        <div className="container">
          <div className="row">
            {areas
              .sort((a, b) => a.order - b.order)
              .map((area) => (
                <div key={area.id} className="col-xl-3 col-md-4 col-sm-6">
                  <div className="single-challenges overly-one">
                    <a
                      target="_blank"
                      href={area.coords ? `https://www.google.com/maps/?q=${area.coords}` : '#'}
                      rel="noopener noreferrer"
                    >
                      <div className="overly-two">
                        <i className="bx bx-location-plus"></i>
                        <h3>{area.name}</h3>
                        <span className="bx bxs-map-alt"></span>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <ContactCallToAction />
    </>
  );
}
