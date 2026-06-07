import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';
import type { ContactSettings } from '@/lib/types';

function formatPhone(p: string): string {
  if (!p) return '';
  return p.replace(/^\+?880/, '0');
}

export default function Footer({ blurb, contact }: { blurb: string; contact: ContactSettings }) {
  const whatsapp = contact.phones.find((p) => /whatsapp/i.test(p.label))?.number ?? '';
  const support = contact.phones.find((p) => /support/i.test(p.label))?.number ?? '';
  const email = contact.emails[0] ?? '';
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
                    loading="lazy"
                  />
                </Link>
                <p>{blurb}</p>
                <ul className="social-icon">
                  {contact.social.facebook && (
                    <li style={{ marginRight: '8px' }}>
                      <a target="_blank" href={contact.social.facebook} rel="noopener noreferrer">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                  )}
                  {contact.social.youtube && (
                    <li style={{ marginRight: '8px' }}>
                      <a target="_blank" href={contact.social.youtube} rel="noopener noreferrer">
                        <i className="bx bxl-youtube"></i>
                      </a>
                    </li>
                  )}
                  {contact.social.linkedin && (
                    <li style={{ marginRight: '8px' }}>
                      <a target="_blank" href={contact.social.linkedin} rel="noopener noreferrer">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </li>
                  )}
                  {contact.social.twitter && (
                    <li>
                      <a target="_blank" href={contact.social.twitter} rel="noopener noreferrer">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-4">
              <div className="single-footer-widget">
                <h3>Quick links</h3>
                <ul className="import-link">
                  <li><Link href="/home-internet">Home Internet</Link></li>
                  <li><Link href="/corporate">Corporate</Link></li>
                  <li><Link href="/packages">Packages</Link></li>
                  <li><Link href="/pay-bill">Pay Bill</Link></li>
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/products">Products</Link></li>
                  <li><Link href="/coverage">Coverage</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="single-footer-widget">
                <h3>Services</h3>
                <ul className="import-link">
                  <li><Link href="/services/ftp-server">FTP Server</Link></li>
                  <li><Link href="/services/live-tv">Live TV</Link></li>
                  <li><Link href="/services/torrent">Torrent</Link></li>
                  <li><Link href="/services/bangla-library">Bangla Library</Link></li>
                  <li><Link href="/services/song-zone">Song Zone</Link></li>
                  <li><Link href="/services/newspaper">Newspaper</Link></li>
                  <li><Link href="/services">More Services..</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="single-footer-widget">
                <h3>Address</h3>
                <ul className="address">
                  <li className="location">
                    <i className="bx bxs-location-plus"></i>
                    <a href="#">{contact.address}</a>
                  </li>
                  {email && (
                    <li>
                      <i className="bx bxs-envelope"></i>
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  )}
                  {whatsapp && (
                    <li>
                      <i className="bx bxs-phone-call"></i>
                      <a href={`tel:${whatsapp}`}>{formatPhone(whatsapp)} (WhatsApp)</a>
                    </li>
                  )}
                  {support && (
                    <li>
                      <i className="bx bx-support"></i>
                      <a href={`tel:${support}`}>{formatPhone(support)}</a>
                    </li>
                  )}
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
                &copy; {new Date().getFullYear()} <Link href="/" target="_blank">Net Point BD</Link>. All Rights Reserved.
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

      <div className="whatsapp">
        {whatsapp && (
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=${whatsapp.replace(/[^0-9]/g, '')}`}
            className="btn-whatsapp-pulse btn-whatsapp-pulse-border"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-whatsapp"></i>
          </a>
        )}
      </div>

      <div className="go-top">
        <i className="bx bx-chevrons-up"></i>
        <i className="bx bx-chevrons-up"></i>
      </div>
    </>
  );
}
