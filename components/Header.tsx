'use client';

import Link from 'next/link';
import { getAssetPath } from '@/lib/utils';
import type { ContactSettings, HomePageSettings } from '@/lib/types';

export default function Header({ contact, home }: { contact: ContactSettings; home: HomePageSettings }) {
  const whatsapp = contact.phones.find((p) => /whatsapp/i.test(p.label))?.number ?? contact.phones[0]?.number ?? '';
  const support = contact.phones.find((p) => /support/i.test(p.label))?.number ?? contact.phones[1]?.number ?? '';
  const email = contact.emails[0] ?? '';
  const emergencyNotices = Array.isArray(home.emergencyNotices)
    ? home.emergencyNotices.filter((item) => item.enabled && item.text.trim().length > 0)
    : [];

  function renderNoticeItem(item: HomePageSettings["emergencyNotices"][number], index: number) {
    return (
      <div className="item" key={`${item.text}-${index}`}>
        <div className="emergency-notice-slide">
          <i className="bx bx-error-circle"></i>
          {item.link ? (
            <a href={item.link}>{item.text}</a>
          ) : (
            <span>{item.text}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {emergencyNotices.length > 0 && (
        <div className="emergency-notice-area d-xl-none">
          <div className="container">
            <div className="emergency-notice-slider owl-theme owl-carousel">
              {emergencyNotices.map((item, index) => renderNoticeItem(item, index))}
            </div>
          </div>
        </div>
      )}

      <div className="pay-online-button d-xl-none">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 d-none d-md-block">
              <ul className="header-left-content" style={{ marginBottom: 0, paddingLeft: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                  <i className="bx bx-phone-call" style={{ color: 'white', flexShrink: 0 }}></i>
                  <a href={`tel:${whatsapp}`} style={{ color: 'white', textDecoration: 'none', marginLeft: '5px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {whatsapp.replace(/^\+?880/, '0') || ''} (WhatsApp)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <header className="header-area">
        <div className="top-header top-header-four d-xl-block d-none">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-9 col-sm-6">
                <ul className="header-left-content">
                  <li className="px-sm-0">
                    <p className="text-white">Welcome to Net Point BD</p>
                  </li>
                  {whatsapp && (
                    <li>
                      <i className="bx bx-phone-call"></i>
                      <a href={`tel:${whatsapp}`}>{whatsapp.replace(/^\+?880/, '0')} (WhatsApp)</a>
                    </li>
                  )}
                  {support && (
                    <li>
                      <i className="bx bx-support"></i>
                      <a href={`tel:${support}`}>{support.replace(/^\+?880/, '0')}</a>
                    </li>
                  )}
                  {email && (
                    <li>
                      <i className="bx bx-mail-send"></i>
                      <a href={`mailto:${email}`}>{email}</a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="col-lg-3 col-sm-6">
                <ul className="header-right-content">
                  <li>
                    <Link href="/about#btrc">
                      <img src={getAssetPath('/assets/img/btrc-logo.png')} alt="BTRC Logo" width="30" height="30" loading="lazy" />
                    </Link>
                  </li>
                  {contact.social.facebook && (
                    <li>
                      <a href={contact.social.facebook} target="_blank" rel="noopener noreferrer">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {emergencyNotices.length > 0 && (
          <div className="emergency-notice-area d-none d-xl-block">
            <div className="container">
              <div className="emergency-notice-slider owl-theme owl-carousel">
                {emergencyNotices.map((item, index) => renderNoticeItem(item, index))}
              </div>
            </div>
          </div>
        )}

        <div className="navbar-area navbar-area-four">
          <div className="mobile-nav">
            <div className="container">
              <Link href="/" className="logo">
                <img
                  className="img-fluid"
                  src={getAssetPath('/assets/img/logo/Net-Point-BD-Logo.svg')}
                  alt="Net Point BD Logo"
                  width="200"
                  height="50"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>

          <div className="main-nav">
            <div className="container">
              <nav className="navbar navbar-expand-md">
                <Link className="navbar-brand" href="/">
                  <img
                    className="img-fluid"
                    src={getAssetPath('/assets/img/logo/Net-Point-BD-Logo.svg')}
                    alt="Net Point BD Logo"
                    width="200"
                    height="50"
                    loading="lazy"
                  />
                </Link>
                <div className="collapse navbar-collapse mean-menu">
                  <ul className="navbar-nav m-auto">
                    <li className="nav-item"><Link href="/home-internet" className="nav-link">Home Internet</Link></li>
                    <li className="nav-item"><Link href="/corporate" className="nav-link">Corporate</Link></li>
                    <li className="nav-item"><Link href="/packages" className="nav-link">Packages</Link></li>
                    <li className="nav-item"><Link href="/pay-bill" className="nav-link">Pay Bill</Link></li>
                    <li className="nav-item"><Link href="/about" className="nav-link">About</Link></li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">Services<i className="bx bx-chevron-down"></i></a>
                      <ul className="dropdown-menu">
                        <li className="nav-item"><Link href="/services/ftp-server" className="nav-link">FTP Server</Link></li>
                        <li className="nav-item"><Link href="/services/live-tv" className="nav-link">Live TV</Link></li>
                        <li className="nav-item"><Link href="/services/torrent" className="nav-link">Torrent</Link></li>
                        <li className="nav-item"><Link href="/services/bangla-library" className="nav-link">Bangla Library</Link></li>
                        <li className="nav-item"><Link href="/services/song-zone" className="nav-link">Song Zone</Link></li>
                        <li className="nav-item"><Link href="/services/newspaper" className="nav-link">Newspaper</Link></li>
                        <li className="nav-item"><Link href="/services/jobs" className="nav-link">Jobs</Link></li>
                        <li className="nav-item"><Link href="/services/gov-websites" className="nav-link">সরকারি ওয়েবসাইট সমূহ</Link></li>
                        <li className="nav-item"><Link href="/services/education" className="nav-link">Education</Link></li>
                        <li className="nav-item"><Link href="/services/court-of-law" className="nav-link">আইন আদালত</Link></li>
                        <li className="nav-item"><Link href="/services/online-shop-point" className="nav-link">Online Shop Point</Link></li>
                        <li className="nav-item"><Link href="/services/all-type-tickets" className="nav-link">সকল প্রকার টিকেট</Link></li>
                        <li className="nav-item"><Link href="/services/emergency-service" className="nav-link">Emergency Service</Link></li>
                      </ul>
                    </li>
                    <li className="nav-item"><Link href="/products" className="nav-link">Products</Link></li>
                    <li className="nav-item"><Link href="/coverage" className="nav-link">Coverage</Link></li>
                    <li className="nav-item"><Link href="/notice-board" className="nav-link">Notice Board</Link></li>
                    <li className="nav-item d-lg-none"><Link href="/contact" className="nav-link">Contact</Link></li>
                  </ul>
                  <div className="others-option">
                    <div className="get-quote">
                      <Link href="/contact" className="default-btn">
                        <span>Contact</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <style jsx>{`
        .emergency-notice-area {
          background: #ff4d4f;
        }

        .emergency-notice-slide {
          color: #fff;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
        }

        .emergency-notice-slide i {
          font-size: 18px;
          line-height: 1;
          flex-shrink: 0;
        }

        .emergency-notice-slide a,
        .emergency-notice-slide span {
          color: #fff;
        }

        .emergency-notice-slide a:hover {
          color: #ffe7c7;
        }
      `}</style>
    </>
  );
}
