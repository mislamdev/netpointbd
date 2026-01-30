'use client';

import { useEffect } from 'react';
import PageTitle from '@/components/PageTitle';

export default function PackagesPage() {
  useEffect(() => {
    const initializeTabs = () => {
      if (typeof window !== 'undefined' && window.$ && window.jQuery) {
        const $ = window.$;
        
        // Wait for DOM to be fully ready
        setTimeout(() => {
          console.log('Initializing package tabs...');
          
          // Target the specific tabs in the packages section
          const tabsList = $('.tab .tabs li');
          const tabsItems = $('.tab .tabs_item');
          
          console.log('Found', tabsList.length, 'tabs and', tabsItems.length, 'tab items');
          
          // Remove existing handlers first
          tabsList.off('click');
          
          // Initialize tabs with index-based switching
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tabsList.on('click', function(this: any) {
            const index = $(this).index();
            console.log('Tab clicked, index:', index);
            
            // First, hide all tab items immediately
            tabsItems.hide().removeClass('current');
            
            // Remove current class from all tabs
            tabsList.removeClass('current');
            
            // Add current class to clicked tab
            $(this).addClass('current');
            
            // Show the selected tab item
            tabsItems.eq(index).addClass('current').show();
            
            console.log('Tab', index, 'is now active');
          });
          
          console.log('Package tabs initialized successfully');
        }, 500);
      } else {
        console.log('jQuery not loaded yet, retrying...');
      }
    };

    // Try to initialize immediately
    initializeTabs();
    
    // Also try after a delay in case jQuery loads later
    const timer1 = setTimeout(initializeTabs, 1000);
    const timer2 = setTimeout(initializeTabs, 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .tab .tabs_item {
          display: none !important;
        }
        .tab .tabs_item.current {
          display: block !important;
        }
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
        .tabs li:hover {
          border-bottom-color: #ff4800;
          color: #ff4800;
        }
        .tabs li.current {
          border-bottom-color: #ff4800;
          color: #ff4800;
          background: #f0f0f0;
        }
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
              <li className="current">Home Internet</li>
              <li>Corporate Internet</li>
              <li>Government Internet</li>
            </ul>
            
            <div className="tab_content">
              {/* Home Internet Packages */}
              <div className="tabs_item current">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>Basic</h3>
                          <h2><sup>৳</sup>500<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li>Internet Speed: Up to 10 Mbps</li>
                          <li>Traffic: Unlimited</li>
                          <li>Cable: Optical Fiber Connection</li>
                          <li>Online Payment System</li>
                          <li>1:8 Contention Ratio</li>
                          <li>Phone and online support</li>
                          <li>Only For Single Router</li>
                          <li>OTC 1000 Tk</li>
                          <li>Shared Bandwidth</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Order Now</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>Basic Plus</h3>
                          <h2><sup>৳</sup>600<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li>Internet Speed: Up to 20 Mbps</li>
                          <li>Traffic: Unlimited</li>
                          <li>Cable: Optical Fiber Connection</li>
                          <li>Online Payment System</li>
                          <li>1:8 Contention Ratio</li>
                          <li>Phone and online support</li>
                          <li>Only For Single Router</li>
                          <li>OTC 1000 Tk</li>
                          <li>Shared Bandwidth</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Order Now</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>STAR</h3>
                          <h2><sup>৳</sup>700<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li>Internet Speed: Up to 40 Mbps</li>
                          <li>Data Traffic: Unlimited</li>
                          <li>BDIX, FTP & CDN: Unlimited High-Speed</li>
                          <li>Streaming: 4K YouTube & Facebook</li>
                          <li>Connection Type: Optical Fiber Cable</li>
                          <li>Payment: Online Payment Available</li>
                          <li>Contention Ratio: 1:8 (Shared Bandwidth)</li>
                          <li>Support: Phone & Online Support</li>
                          <li>Usage Policy: Only for Single Router</li>
                          <li>One Time Charge (OTC): 1000 Tk</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Order Now</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>Bronze</h3>
                          <h2><sup>৳</sup>800<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li>Internet Speed: Up to 50 Mbps</li>
                          <li>Data Traffic: Unlimited</li>
                          <li>BDIX, FTP & CDN: Unlimited High-Speed</li>
                          <li>Streaming: 4K YouTube & Facebook</li>
                          <li>Connection Type: Optical Fiber Cable</li>
                          <li>Payment: Online Payment Available</li>
                          <li>Contention Ratio: 1:8 (Shared Bandwidth)</li>
                          <li>Support: Phone & Online Support</li>
                          <li>Usage Policy: Only for Single Router</li>
                          <li>One Time Charge (OTC): 1000 Tk</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Order Now</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>Bronze Plus</h3>
                          <h2><sup>৳</sup>1,000<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li>Internet Speed: Up to 70 Mbps</li>
                          <li>Data Traffic: Unlimited</li>
                          <li>BDIX, FTP & CDN: Unlimited High-Speed</li>
                          <li>Streaming: 4K YouTube & Facebook</li>
                          <li>Connection Type: Optical Fiber Cable</li>
                          <li>Payment: Online Payment Available</li>
                          <li>Contention Ratio: 1:8 (Shared Bandwidth)</li>
                          <li>Support: Phone & Online Support</li>
                          <li>Usage Policy: Only for Single Router</li>
                          <li>One Time Charge (OTC): 1000 Tk</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Order Now</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>Silver</h3>
                          <h2><sup>৳</sup>1,200<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li>Internet Speed: Up to 80 Mbps</li>
                          <li>Data Traffic: Unlimited</li>
                          <li>BDIX, FTP & CDN: Unlimited High-Speed</li>
                          <li>Streaming: 4K YouTube & Facebook</li>
                          <li>Connection Type: Optical Fiber Cable</li>
                          <li>Payment: Online Payment Available</li>
                          <li>Contention Ratio: 1:8 (Shared Bandwidth)</li>
                          <li>Support: Phone & Online Support</li>
                          <li>Usage Policy: Only for Single Router</li>
                          <li>One Time Charge (OTC): 1000 Tk</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Order Now</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Corporate Internet Packages */}
              <div className="tabs_item">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-8">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>DEDICATED BANDWIDTH</h3>
                          <h2><sup>৳</sup>Custom<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li style={{ textAlign: 'center' }}>Full duplex dedicated bandwidth mean you will get guaranteed stable bandwidth with full upload and download. It&apos;s give you full controlled superior internet experience on bigger network.</li>
                          <li style={{ textAlign: 'center' }}>100% fiber-optic network</li>
                          <li style={{ textAlign: 'center' }}>Get Fast Internet Speeds at Good Prices</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Contact Us</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Government Internet Packages */}
              <div className="tabs_item">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>Basic</h3>
                          <h2><sup>৳</sup>525<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li>Internet Speed (Max): 10 Mbps</li>
                          <li>Sharing Ratio: 1:8</li>
                          <li>Cable: Fiber Optics</li>
                          <li>24/7 phone and online support</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Order Now</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>Basic Plus</h3>
                          <h2><sup>৳</sup>840<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li>Internet Speed (Max): 40 Mbps</li>
                          <li>Sharing Ratio: 1:8</li>
                          <li>Cable: Fiber Optics</li>
                          <li>24/7 phone and online support</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Order Now</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing overly-one">
                      <div className="overly-two">
                        <div className="pricing-title">
                          <h3>Bronze</h3>
                          <h2><sup>৳</sup>1,260<sub>/Month</sub></h2>
                        </div>
                        <ul>
                          <li>Internet Speed (Max): 60 Mbps</li>
                          <li>Sharing Ratio: 1:8</li>
                          <li>Cable: Fiber Optics</li>
                          <li>24/7 phone and online support</li>
                        </ul>
                        <a href="/contact" className="default-btn">
                          <span>Order Now</span>
                        </a>
                        <div className="pricing-shape">
                          <img src="/assets/img/shape/pricing-shape.png" alt="Image" loading="lazy" />
                        </div>
                        <div className="pricing-shape-2">
                          <img src="/assets/img/shape/pricing-shape-2.png" alt="Image" loading="lazy" />
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
    </>
  );
}
