'use client';

import { useEffect } from 'react';
import { getAssetPath } from '@/lib/utils';
import type { HomePageSettings } from '@/lib/types';
import ContactCallToAction from '@/components/ContactCallToAction';

export default function HomePage({ home }: { home: HomePageSettings }) {
  const legacyHero = (home as HomePageSettings & { hero?: HomePageSettings["heroSlides"][number] }).hero;
  const heroSlides = Array.isArray(home.heroSlides) && home.heroSlides.length > 0
    ? home.heroSlides
    : legacyHero
      ? [legacyHero]
      : [{ title: "", subtitle: "", ctaLabel: "", ctaHref: "#" }];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.$) {
      const $ = window.$;
      setTimeout(() => {
        try { $('.banner-slider').trigger('destroy.owl.carousel'); } catch(e) {}
        $('.banner-slider').owlCarousel({
          items: 1, loop: true, margin: 0, nav: true, dots: false,
          autoplay: true, smartSpeed: 1000, autoplayHoverPause: true,
          navText: ["<i class='flaticon-left-arrow'></i>", "<i class='flaticon-right-arrow'></i>"],
        });
        if (typeof $.fn.jarallax !== 'undefined') {
          $('.jarallax').jarallax({ speed: 0.3 });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $('.about-content .tabs li').off('click').on('click', function(this: any) {
          const index = $(this).index();
          $('.about-content .tabs li').removeClass('current');
          $('.about-content .tabs_item').removeClass('current');
          $(this).addClass('current');
          $('.about-content .tabs_item').eq(index).addClass('current');
        });
      }, 200);
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        .about-content .tab .tabs_item { display: none !important; }
        .about-content .tab .tabs_item.current { display: block !important; }
      `}</style>

      <section className="banner-wrapper jarallax" data-jarallax='{"speed": 0.3}' style={{ backgroundImage: `url(${getAssetPath('/assets/img/slider-img.jpg')})` }}>
        <div className="banner-slider owl-theme owl-carousel">
          {heroSlides.map((slide, index) => (
            <div className="item" key={`${slide.title}-${index}`}>
              <div className="banner-wrapper banner-area banner-area-four jarallax">
                <div className="d-table">
                  <div className="d-table-cell">
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-lg-8">
                          <div className="banner-content">
                            <h1>{slide.title}</h1>
                            <p>{slide.subtitle}</p>
                            <div className="banner-btn">
                              <a href={slide.ctaHref} className="default-btn">
                                <span>{slide.ctaLabel}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="ec" className="no-draft" style={{ marginTop: '20px' }}>
        <section className="feature-area feature-area-four">
          <div className="container">
            <div className="row justify-content-center">
              {home.features.map((f, i) => (
                <div key={i} className="col-lg-4 col-sm-6">
                  <div className="single-feature overly-one">
                    <div className="overly-two">
                      <div className="title">
                        <i className={f.icon}></i>
                        <h3>{f.title}</h3>
                      </div>
                      <p>{f.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="testimonials-area py-4" style={{ backgroundImage: `url(${getAssetPath('/assets/img/bg/notice-bg.jpg')})` }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="notices"></div>
              </div>
            </div>
          </div>
        </div>

        <section className="about-us-area ptb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="about-img">
                  <img src={getAssetPath('/assets/img/net-pointbd.jpg')} alt="Net Point BD" width="605" height="540" loading="lazy" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="about-title">
                    <span>About Us</span>
                    <h2>Uninterrupted, Reliable Internet Connection in Bogura</h2>
                    <p>Net Point BD is a leading high-speed internet connection provider in Bogura. Recognizing the importance of reliable internet in today's world, Net Point BD offers a range of flexible plans tailored to individual needs. With a commitment to customer satisfaction, Net Point BD ensures uninterrupted access to online resources through state-of-the-art infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="challenges-area ptb-100 text-white text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="subscribe-bg">
                  <div className="subscribe-content p-0">
                    <h2 className="text-white">Need High Speed Internet Connection?</h2>
                    <p>Contact us now for a seamless WiFi Connection and enjoy fast and reliable internet in your home or corporate.</p>
                    <a href="/contact" className="default-btn">
                      <span>Contact Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactCallToAction />
      </div>
    </>
  );
}
