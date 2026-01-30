'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function HomeInternetPage() {
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
                    <img src={getAssetPath("/assets/img/shape/pricing-shape.png")} alt="Image" loading="lazy" />
                  </div>
                  <div className="pricing-shape-2">
                    <img src={getAssetPath("/assets/img/shape/pricing-shape-2.png")} alt="Image" loading="lazy" />
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
                    <img src={getAssetPath("/assets/img/shape/pricing-shape.png")} alt="Image" loading="lazy" />
                  </div>
                  <div className="pricing-shape-2">
                    <img src={getAssetPath("/assets/img/shape/pricing-shape-2.png")} alt="Image" loading="lazy" />
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
                    <img src={getAssetPath("/assets/img/shape/pricing-shape.png")} alt="Image" loading="lazy" />
                  </div>
                  <div className="pricing-shape-2">
                    <img src={getAssetPath("/assets/img/shape/pricing-shape-2.png")} alt="Image" loading="lazy" />
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
                    <img src={getAssetPath("/assets/img/shape/pricing-shape.png")} alt="Image" loading="lazy" />
                  </div>
                  <div className="pricing-shape-2">
                    <img src={getAssetPath("/assets/img/shape/pricing-shape-2.png")} alt="Image" loading="lazy" />
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
                    <img src={getAssetPath("/assets/img/shape/pricing-shape.png")} alt="Image" loading="lazy" />
                  </div>
                  <div className="pricing-shape-2">
                    <img src={getAssetPath("/assets/img/shape/pricing-shape-2.png")} alt="Image" loading="lazy" />
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
