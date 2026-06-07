import PageTitle from '@/components/PageTitle';
import { readJSON } from '@/lib/db';
import { getAssetPath } from '@/lib/utils';
import type { PackagesFile } from '@/lib/types';

export const dynamic = "force-dynamic";

export default async function HomeInternetPage() {
  const packages = await readJSON<PackagesFile>('packages');
  const plans = [...packages.home.plans].sort((a, b) => a.order - b.order);
  return (
    <>
      <PageTitle
        title="Home Internet"
        style="centered"
        description="You can get top home internet packages with an extensive range of high-quality data & internet connectivity services. It gives you 24-hour High-Speed Internet access for your home phone, laptop, and television."
      />
      <section className="pricing-area white-bg ptb-100">
        <div className="container">
          <div className="row">
            {plans.map((plan) => (
              <div key={plan.id} className="col-lg-4 col-md-6">
                <div className="single-pricing overly-one">
                  <div className="overly-two">
                    <div className="pricing-title">
                      <h3>{plan.name}</h3>
                      <h2>
                        <sup>{plan.currency}</sup>
                        {plan.price === 0 ? 'Custom' : plan.price.toLocaleString()}
                        <sub>{plan.unit}</sub>
                      </h2>
                    </div>
                    <ul>
                      {plan.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                    <a href="/contact" className="default-btn">
                      <span>Order Now</span>
                    </a>
                    <div className="pricing-shape">
                      <img src={getAssetPath('/assets/img/shape/pricing-shape.png')} alt="" loading="lazy" />
                    </div>
                    <div className="pricing-shape-2">
                      <img src={getAssetPath('/assets/img/shape/pricing-shape-2.png')} alt="" loading="lazy" />
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
