'use client';

import PageTitle from '@/components/PageTitle';
import { useEffect } from 'react';
import { getAssetPath } from '@/lib/utils';
import ContactCallToAction from '@/components/ContactCallToAction';

export default function AboutPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$) {
      const $ = window.$;
      
      setTimeout(() => {
        // Initialize jarallax
        if (typeof $.fn.jarallax !== 'undefined') {
          $('.jarallax').jarallax({
            speed: 0.3
          });
        }

        // Initialize odometer
        if (typeof $.fn.appear !== 'undefined') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          $('.odometer').appear(function(this: any) {
            var odo = $(this);
            var countNumber = odo.attr('data-count');
            if (countNumber) {
              odo.html(countNumber);
            }
          });
        }
      }, 500);
    }
  }, []);

  return (
    <>
      <PageTitle 
        title="Reliable Broadband Internet connection in Bogura" 
        style="centered"
        description="Net Point BD is an uninterrupted reliable internet connection provider in Bogura. It offers you a satisfactory internet service."
      />
      
      <section className="our-approach-area our-approach-area-four ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-img">
                <img src={getAssetPath("/assets/img/about-net-point-bd-logo.jpg")} alt="Net Point BD logo" width="600" height="370" title="Net Point BD logo" loading="lazy" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="approach-content">
                <h2>Ultra-fast, Reliable Broadband Internet in Bogura</h2>
                <p>Net Point BD is one of the Best ISP in Bogura. You will get a pleasant experience with our Internet Service. Your internet connection will be reliable with the best performance. You will get more than enough facilities in our Services.</p>
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <div className="single-approach">
                      <h3>Uninterrupted Internet</h3>
                      <p>Uninterrupted access through state-of-the-art infrastructure.</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="single-approach">
                      <h3>High-speed Internet</h3>
                      <p>The highest quality internet service is now available to you.</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="single-approach">
                      <h3>Reliable Price</h3>
                      <p>Purchase any package you require at a reasonable price.</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="single-approach">
                      <h3>24/7 Support</h3>
                      <p>Get free technical support 24 hours everyday.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-us-area ptb-100" id="btrc">
        <div className="container">
          <div className="row align-items-center flex-row-reverse g-5">
            <div className="col-lg-6">
              <div className="about-img">
                <img src={getAssetPath("/assets/img/btrc.jpg")} alt="BTRC Approval" width="600" height="370" title="BTRC Approval of Net Point BD" loading="lazy" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <div className="about-title">
                  <h2>BTRC Approval</h2>
                  <p>Net Point BD offers BTRC approved ISP services. Their trade license number is 14.32.0000.702.47.648.22.186</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="counter-area pt-100 pb-70 jarallax" data-jarallax='{"speed": 0.3}' style={{ backgroundImage: `url(${getAssetPath('/assets/img/shape/counter-bg.jpg')})` }}>
        <div className="container">
          <div className="counter-max-wide">
            <div className="section-title white-title">
              <span>Why Choose Us</span>
              <h2>Serving Thousand of Clients in Bogura</h2>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                <div className="single-counter overly-one">
                  <div className="overly-two">
                    <i className="bx bx-wifi"></i>
                    <h2>
                      <span className="odometer" data-count="400">00</span>
                    </h2>
                    <h3>Network Setup</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6">
                <div className="single-counter overly-one">
                  <div className="overly-two">
                    <i className="bx bx-user"></i>
                    <h2>
                      <span className="odometer" data-count="1000">00</span>
                    </h2>
                    <h3>Happy Client</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6">
                <div className="single-counter overly-one">
                  <div className="overly-two">
                    <i className="bx bx-hard-hat"></i>
                    <h2>
                      <span className="odometer" data-count="150">00</span>
                    </h2>
                    <h3>Expert Workers</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6">
                <div className="single-counter overly-one">
                  <div className="overly-two">
                    <i className="bx bx-refresh"></i>
                    <h2>
                      <span className="odometer" data-count="100">00</span>
                      <span className="target">%</span>
                    </h2>
                    <h3>Satisfactions</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCallToAction />
    </>
  );
}
