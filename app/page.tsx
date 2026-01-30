'use client';

import { useEffect } from 'react';
import { getAssetPath } from '@/lib/utils';

export default function HomePage() {
  useEffect(() => {
    // Initialize carousel after component mounts
    if (typeof window !== 'undefined' && window.$) {
      const $ = window.$;
      
      setTimeout(() => {
        // Destroy existing carousel if any
        try {
          $('.banner-slider').trigger('destroy.owl.carousel');
        } catch(e) {}

        // Initialize banner slider
        $('.banner-slider').owlCarousel({
          items: 1,
          loop: true,
          margin: 0,
          nav: true,
          dots: false,
          autoplay: true,
          smartSpeed: 1000,
          autoplayHoverPause: true,
          navText: [
            "<i class='flaticon-left-arrow'></i>",
            "<i class='flaticon-right-arrow'></i>",
          ],
        });

        // Initialize jarallax
        if (typeof $.fn.jarallax !== 'undefined') {
          $('.jarallax').jarallax({
            speed: 0.3
          });
        }

        // Initialize tabs for About section
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $('.about-content .tabs li').off('click').on('click', function(this: any) {
          const index = $(this).index();
          console.log('About tab clicked, index:', index);
          
          $('.about-content .tabs li').removeClass('current');
          $('.about-content .tabs_item').removeClass('current');
          $(this).addClass('current');
          $('.about-content .tabs_item').eq(index).addClass('current');
          
          console.log('About tab', index, 'is now active');
        });
      }, 200);
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        .about-content .tab .tabs_item {
          display: none !important;
        }
        .about-content .tab .tabs_item.current {
          display: block !important;
        }
      `}</style>
      <section className="banner-wrapper jarallax" data-jarallax='{"speed": 0.3}' style={{ backgroundImage: `url(${getAssetPath('/assets/img/slider-img.jpg')})` }}>
        <div className="banner-slider owl-theme owl-carousel">
          <div className="item">
            <div className="banner-wrapper banner-area banner-area-four jarallax">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="banner-content">
                          <h1>Reliable Broadband Internet Connection in Bogura</h1>
                          <p>
                            Looking For Fast Reliable Broadband Internet Service in Bogura Without any interrupt? Net Point BD is the perfect solution for you. Great offer for Dedicated &amp; Corporate Users.
                          </p>
                          <div className="banner-btn">
                            <a href="/packages" className="default-btn">
                              <span>See Packages</span>
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
          <div className="item">
            <div className="banner-wrapper banner-area banner-area-four jarallax">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="banner-content">
                          <h2>Uninterrupted Corporate Internet Service in Bogura</h2>
                          <p>Get a reliable, high-speed Corporate Internet Connection at an affordable price. We have separate bandwidth for Corporate Users.</p>
                          <div className="banner-btn">
                            <a href="/packages" className="default-btn">
                              <span>See Packages</span>
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
          <div className="item">
            <div className="banner-wrapper banner-area banner-area-four jarallax">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="banner-content">
                          <h2>High-Speed Home Internet Connection in Bogura</h2>
                          <p>Looking for a flexible package for Home Internet? Net Point BD will be the best solution for you.</p>
                          <div className="banner-btn">
                            <a href="/packages" className="default-btn">
                              <span>See Packages</span>
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
        </div>
      </section>

      <div id="ec" className="no-draft" style={{ marginTop: '20px' }}>
        <section className="feature-area feature-area-four">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-sm-6">
                <div className="single-feature overly-one">
                  <div className="overly-two">
                    <div className="title">
                      <i className="flaticon-testing"></i>
                      <h3>Equipment Installation and Setup</h3>
                    </div>
                    <p>Net Point BD delivers tremendous value and super-fast broadband to the node network via optical fiber. We also offer a firewall and security system.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="single-feature overly-one">
                  <div className="overly-two">
                    <div className="title">
                      <i className="flaticon-authentication"></i>
                      <h3>Customer Satisfaction Guarantee</h3>
                    </div>
                    <p>The amount of our company&rsquo;s satisfied customers grows with every new client creating satisfaction guarantee for everyone who uses our services.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="single-feature overly-one">
                  <div className="overly-two">
                    <div className="title">
                      <i className="flaticon-call"></i>
                      <h3>24/7 Customer Support Centre</h3>
                    </div>
                    <p>We offer our clients with free 24/7/365 online and technical support that guarantees the solution of any issues with your Broadband connection.</p>
                  </div>
                </div>
              </div>
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
                  <img src={getAssetPath('/assets/img/net-pointbd.jpg')} alt="Wifi Cable Connect with PC" width="605" height="540" title="Wifi Cable Connect with PC" loading="lazy" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="about-title">
                    <span>About Us</span>
                    <h2>Uninterrupted, Reliable Internet Connection in Bogura</h2>
                    <p>
                      Net Point BD&nbsp;is a leading high-speed internet connection provider in Bogura. Recognizing the importance of reliable internet in today&apos;s world,&nbsp;Net Point BD offers a range of flexible plans tailored to individual needs. With a commitment to customer satisfaction,&nbsp;Net Point BD ensures uninterrupted access to online resources through state-of-the-art infrastructure. Whether you&apos;re a student, professional, or business owner,&nbsp;Net Point BD aims to bridge the connectivity gap and revolutionize your internet experience. Say goodbye to buffering and lag &ndash; welcome to a world of limitless online possibilities with Net Point BD.
                    </p>
                  </div>
                  <div className="tab">
                    <ul className="tabs active">
                      <li className="current">Home Internet</li>
                      <li>Corporate Internet</li>
                    </ul>
                    <div className="tab_content">
                      <div className="tabs_item current">
                        <ul>
                          <li><i className="bx bx-wifi"></i> High-speed connectivity</li>
                          <li><i className="bx bx-wifi"></i> Unlimited data options</li>
                          <li><i className="bx bx-wifi"></i> Reliable connection</li>
                          <li><i className="bx bx-wifi"></i> 24/7 customer support</li>
                          <li><i className="bx bx-wifi"></i> No-contract options</li>
                          <li><i className="bx bx-wifi"></i> Device compatibility</li>
                        </ul>
                      </div>
                      <div className="tabs_item">
                        <ul>
                          <li><i className="bx bx-wifi"></i> High-Speed Performance</li>
                          <li><i className="bx bx-wifi"></i> Scalability</li>
                          <li><i className="bx bx-wifi"></i> Symmetrical upload and download speeds</li>
                          <li><i className="bx bx-wifi"></i> Priority support</li>
                          <li><i className="bx bx-wifi"></i> Device compatibility</li>
                        </ul>
                      </div>
                    </div>
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

        <section className="subscribe-area ptb-100 bg-color">
          <div className="container">
            <div className="subscribe-bg">
              <div className="row align-items-center justify-content-between">
                <div className="col-lg-8 col-sm-7">
                  <div className="subscribe-content">
                    <img src={getAssetPath('/assets/img/icon/call-for-witi.svg')} alt="Image" width="80" height="60" loading="lazy" />
                    <h2>Looking for Internet Connection in Bogura?</h2>
                    <p>Contact with Net Point BD now and get your superfast internet connection within a day. We are here to assist you for your internet connection.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4">
                  <div className="text-center text-lg-end">
                    <a href="/contact" className="default-btn">
                      <span>Contact Now</span>
                    </a>
                    <a href="tel:+8809649315047" className="default-btn">
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
