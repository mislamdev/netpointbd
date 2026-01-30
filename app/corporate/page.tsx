'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function CorporatePage() {
  return (
    <>
      <PageTitle 
        title="Corporate Internet" 
        style="centered"
        description="Get a reliable, high-speed Corporate Internet Connection at an affordable price. We have separate bandwidth for Corporate Users with guaranteed uptime and priority support."
      />
      <section className="pricing-area white-bg ptb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="single-pricing overly-one">
                <div className="overly-two">
                  <div className="pricing-title">
                    <h3>DEDICATED BANDWIDTH</h3>
                    <h2><sup>৳</sup>Custom<sub>/Month</sub></h2>
                    <p style={{ color: '#ffffff', fontSize: '14px', marginTop: '10px' }}>Tailored to Your Business Needs</p>
                  </div>
                  <ul>
                    <li><i className="bx bx-check-circle"></i> 100% Dedicated Bandwidth - No Sharing, Guaranteed Speeds</li>
                    <li><i className="bx bx-check-circle"></i> Symmetrical Upload & Download Speeds</li>
                    <li><i className="bx bx-check-circle"></i> 99.9% Uptime SLA with Priority Support</li>
                    <li><i className="bx bx-check-circle"></i> Full Duplex Fiber-Optic Network</li>
                    <li><i className="bx bx-check-circle"></i> Scalable Bandwidth - Upgrade Anytime</li>
                    <li><i className="bx bx-check-circle"></i> Static IP Address Included</li>
                    <li><i className="bx bx-check-circle"></i> Enterprise-Grade Firewall & Security</li>
                    <li><i className="bx bx-check-circle"></i> 24/7 Dedicated Technical Support</li>
                    <li><i className="bx bx-check-circle"></i> Free Installation & Configuration</li>
                    <li><i className="bx bx-check-circle"></i> Multiple Connection Points Support</li>
                    <li><i className="bx bx-check-circle"></i> Traffic Monitoring & Analytics Dashboard</li>
                    <li><i className="bx bx-check-circle"></i> Perfect for Offices, Banks, Schools & E-commerce</li>
                  </ul>
                  <div className="text-center mt-4 mb-3">
                    <p style={{ fontSize: '16px', color: '#4b5280' }}>
                      <strong>Custom bandwidth solutions from 10 Mbps to 1 Gbps</strong>
                    </p>
                  </div>
                  <a href="/contact" className="default-btn">
                    <span>Contact Us for Custom Quote</span>
                  </a>
                  <div className="pricing-shape">
                    <img src={getAssetPath("/assets/img/shape/pricing-shape.png")} alt="Image" loading="lazy" />
                  </div>
                  <div className="pricing-shape-2">
                    <img src={getAssetPath("/assets/img/shape/pricing-shape-2.png")} alt="Image" loading="lazy" />
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
