import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';

export default function Footer() {
  return (
    <>
      <footer className="footer-area ptb-100 jarallax bg-color" data-jarallax='{"speed": 0.3}'>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-8">
              <div className="single-footer-widget">
                <Link href="/" className="logo">
                  <img
                    className="img-fluid"
                    src={getAssetPath('/assets/img/logo/Net-Point-BD-Logo.svg')}
                    alt="Logo"
                    width="300"
                    height="50"
                    title="NeT-PoinT BD"
                    loading="lazy"
                  />
                </Link>

                <p>
                  Net Point BD is one of the Best ISP in Bogura. You will get a pleasant experience with our Internet Service. Your internet connection will be reliable with the best performance. You will get more than enough facilities in our Services.
                </p>

                <ul className="social-icon">
                  <li style={{ marginRight: '8px' }}>
                    <a target="_blank" href="https://www.facebook.com/netpointbdnet">
                      <i className="bx bxl-facebook"></i>
                    </a>
                  </li>
                  <li style={{ marginRight: '8px' }}>
                    <a target="_blank" href="#">
                      <i className="bx bxl-youtube"></i>
                    </a>
                  </li>
                  <li style={{ marginRight: '8px' }}>
                    <a target="_blank" href="#">
                      <i className="bx bxl-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="#">
                      <i className="bx bxl-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-4">
              <div className="single-footer-widget">
                <h3>Quick links</h3>

                <ul className="import-link">
                  <li>
                    <Link href="/home-internet">Home Internet</Link>
                  </li>
                  <li>
                    <Link href="/corporate">Corporate</Link>
                  </li>
                  <li>
                    <Link href="/packages">Packages</Link>
                  </li>
                  <li>
                    <Link href="/pay-bill">Pay Bill</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/products">Products</Link>
                  </li>
                  <li>
                    <Link href="/coverage">Coverage</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="single-footer-widget">
                <h3>Services</h3>

                <ul className="import-link">
                  <li>
                    <Link href="/services/ftp-server">FTP Server</Link>
                  </li>
                  <li>
                    <Link href="/services/live-tv">Live TV</Link>
                  </li>
                  <li>
                    <Link href="/services/torrent">Torrent</Link>
                  </li>
                  <li>
                    <Link href="/services/bangla-library">Bangla Library</Link>
                  </li>
                  <li>
                    <Link href="/services/song-zone">Song Zone</Link>
                  </li>
                  <li>
                    <Link href="/services/newspaper">Newspaper</Link>
                  </li>
                  <li>
                    <Link href="/services">More Services..</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-footer-widget">
                <h3>Address</h3>
                <ul className="address">
                  <li className="location">
                    <i className="bx bxs-location-plus"></i>
                    <a href="#">Thanthania Opposite Bus-Stand, Bogura Sadar, Bogura-5800</a>
                  </li>
                  <li>
                    <i className="bx bxs-envelope"></i>
                    <a href="mailto:info@netpoint.com.bd">info@netpoint.com.bd</a>
                  </li>
                  <li>
                    <i className="bx bxs-phone-call"></i>
                    <a href="tel:+8801923315047">01923315047 (WhatsApp)</a>
                  </li>
                  <li>
                    <i className="bx bx-support"></i>
                    <a href="tel:+8809638102102">09638 102 102</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="copy-right-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6">
              <p className="text-center text-xl-start">
                &copy; 2026 <Link href="/" target="_blank">Net Point BD</Link>. All Rights Reserved.
              </p>
            </div>
            <div className="col-xl-6">
              <p className="text-center text-xl-end">
                Website Design by <a target="_blank" href="https://www.cms.com.bd/">cms.com.bd</a> &amp; Hosted by <a target="_blank" href="https://www.host.net.bd/">host.net.bd</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Start WhatsApp Area */}
      <div className="whatsapp">
        <a
          target="_blank"
          href="https://m.me/236254273596322"
          className="btn-messenger-pulse btn-messenger-pulse-border"
        >
          <i className="bx bxl-messenger"></i>
        </a>
        <a
          target="_blank"
          href="https://api.whatsapp.com/send?phone=8801923315047"
          className="btn-whatsapp-pulse btn-whatsapp-pulse-border"
        >
          <i className="bx bxl-whatsapp"></i>
        </a>
      </div>

      {/* Start Go Top Area */}
      <div className="go-top">
        <i className="bx bx-chevrons-up"></i>
        <i className="bx bx-chevrons-up"></i>
      </div>
    </>
  );
}
