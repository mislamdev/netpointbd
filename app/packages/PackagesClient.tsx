'use client';

import { useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';
import type { PackagesFile } from '@/lib/types';

const TABS: { key: keyof PackagesFile; label: string }[] = [
  { key: 'home', label: 'Home Internet' },
  { key: 'corporate', label: 'Corporate Internet' },
  { key: 'government', label: 'Government Internet' },
];

export default function PackagesPage({ packages }: { packages: PackagesFile }) {
  useEffect(() => {
    const initializeTabs = () => {
      if (typeof window !== 'undefined' && window.$ && window.jQuery) {
        const $ = window.$;
        setTimeout(() => {
          const tabsList = $('.tab .tabs li');
          const tabsItems = $('.tab .tabs_item');
          tabsList.off('click');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tabsList.on('click', function(this: any) {
            const index = $(this).index();
            tabsItems.hide().removeClass('current');
            tabsList.removeClass('current');
            $(this).addClass('current');
            tabsItems.eq(index).addClass('current').show();
          });
        }, 500);
      }
    };
    initializeTabs();
    const t1 = setTimeout(initializeTabs, 1000);
    const t2 = setTimeout(initializeTabs, 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .tab .tabs_item { display: none !important; }
        .tab .tabs_item.current { display: block !important; }
        .tabs li {
          display: inline-block;
          margin-right: 30px;
          font-weight: 700;
          font-size: 18px;
          color: #000219;
          border-bottom: 3px solid #e0e0e0;
          padding: 10px 20px;
          cursor: pointer;
          transition: all ease 0.3s;
          background: #ffffff;
          border-radius: 5px 5px 0 0;
        }
        .tabs li:hover { border-bottom-color: #ff4800; color: #ff4800; }
        .tabs li.current { border-bottom-color: #ff4800; color: #ff4800; background: #f0f0f0; }
      `}</style>
      <PageTitle
        title="Find Your Perfect Internet Plan"
        style="centered"
        description="Experience blazing-fast internet with our tailored packages. Whether it's for your home, business, or government office - we have the perfect plan with unlimited data and 24/7 support."
      />
      <section className="ptb-100 bg-color">
        <div className="container">
          <div className="tab">
            <ul className="tabs active text-center" style={{ marginBottom: '40px', paddingLeft: 0, listStyle: 'none' }}>
              {TABS.map((t, i) => (
                <li key={t.key} className={i === 0 ? 'current' : ''}>
                  {t.label}
                </li>
              ))}
            </ul>

            <div className="tab_content">
              {TABS.map((t, i) => {
                const tab = packages[t.key];
                const colClass = tab.plans.length === 1 ? 'col-lg-6 col-md-8' : 'col-lg-4 col-md-6';
                return (
                  <div key={t.key} className={`tabs_item ${i === 0 ? 'current' : ''}`}>
                    <div className="row">
                      {[...tab.plans]
                        .sort((a, b) => a.order - b.order)
                        .map((plan) => (
                          <div key={plan.id} className={colClass}>
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
                                  {plan.features.map((f, j) => (
                                    <li key={j}>{f}</li>
                                  ))}
                                </ul>
                                <a href="/contact" className="default-btn">
                                  <span>{plan.price === 0 ? 'Contact Us' : 'Order Now'}</span>
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
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
