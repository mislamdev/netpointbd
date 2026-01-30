import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

export default function Header() {
  return (
    <>
      {/* Pay Online Button for Mobile & Tablet - Outside header to avoid design conflicts */}
      <div className="pay-online-button d-xl-none">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 d-none d-md-block">
              {/* Contact info for tablet - WhatsApp only */}
              <ul className="header-left-content" style={{ marginBottom: 0, paddingLeft: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                  <i className="bx bx-phone-call" style={{ color: 'white', flexShrink: 0 }}></i>
                  <a href="tel:+8801923315047" style={{ color: 'white', textDecoration: 'none', marginLeft: '5px', whiteSpace: 'nowrap', flexShrink: 0 }}>01923315047 (WhatsApp)</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-6" style={{ textAlign: 'center' }}>
              <a
                href="https://netpointbd.ispdigital.cloud/BillPayment/Index"
                target="_blank"
                className="default-btn"
                style={{
                  backgroundColor: 'transparent',
                  color: 'black',
                  padding: '10px 5px',
                  borderRadius: '0px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'background 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                <img
                  src={getAssetPath('/assets/img/bKash_Nagad.png')}
                  alt="Pay Now"
                  width="60"
                  height="30"
                  title="Pay Bill"
                  loading="lazy"
                  style={{ borderRadius: '4px' }}
                />
                <span style={{ fontSize: '18px', backgroundColor: '#b8182b', color: 'white', padding: '5px', marginBottom: '0px' }}>
                  <strong>Pay Online</strong>
                </span>
              </a>
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
                <li>
                  <i className="bx bx-phone-call"></i>
                  <a href="tel:+8801923315047">01923315047 (WhatsApp)</a>
                </li>
                <li>
                  <i className="bx bx-support"></i>
                  <a href="tel:+8809638102102">09638 102 102</a>
                </li>
                <li>
                  <i className="bx bx-mail-send"></i>
                  <a href="mailto:info@netpoint.com.bd">info@netpoint.com.bd</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-sm-6">
              <ul className="header-right-content">
                <li style={{ margin: '10px 0', marginRight: '15px' }}>
                  <a
                    href="https://netpointbd.ispdigital.cloud/BillPayment/Index"
                    target="_blank"
                    className="default-btn"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'white',
                      padding: '10px 5px',
                      borderRadius: '0px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      transition: 'background 0.3s ease',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={getAssetPath('/assets/img/bKash_Nagad.png')}
                      alt="Pay Now"
                      width="60"
                      height="30"
                      title="Pay Bill"
                      loading="lazy"
                      style={{ borderRadius: '4px' }}
                    />
                    <span style={{ fontSize: '18px', backgroundColor: '#b8182b', color: 'white', padding: '5px', marginBottom: '0px' }}>
                      <strong>Pay Online</strong>
                    </span>
                  </a>
                </li>
                <li>
                  <Link href="/about#btrc">
                    <img src={getAssetPath('/assets/img/btrc-logo.png')} alt="BTRC Logo" width="30" height="30" title="BTRC Logo" loading="lazy" />
                  </Link>
                </li>
                <li>
                  <a href="https://www.facebook.com/netpointbdnet" target="_blank">
                    <i className="bx bxl-facebook"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Start Nav Area */}
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
                title="Net Point BD Logo"
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
                  title="Net Point BD Logo"
                  loading="lazy"
                />
              </Link>
              <div className="collapse navbar-collapse mean-menu">
                <ul className="navbar-nav m-auto">
                  <li className="nav-item">
                    <Link href="/home-internet" className="nav-link">
                      Home Internet
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/corporate" className="nav-link">
                      Corporate
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/packages" className="nav-link">
                      Packages
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/pay-bill" className="nav-link">
                      Pay Bill
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/about" className="nav-link">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      Services
                      <i className="bx bx-chevron-down"></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link href="/services/ftp-server" className="nav-link">
                          FTP Server
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/live-tv" className="nav-link">
                          Live TV
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/torrent" className="nav-link">
                          Torrent
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/bangla-library" className="nav-link">
                          Bangla Library
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/song-zone" className="nav-link">
                          Song Zone
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/newspaper" className="nav-link">
                          Newspaper
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/jobs" className="nav-link">
                          Jobs
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/gov-websites" className="nav-link">
                          সরকারি ওয়েবসাইট সমূহ
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/education" className="nav-link">
                          Education
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/court-of-law" className="nav-link">
                          আইন আদালত
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/online-shop-point" className="nav-link">
                          Online Shop Point
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/all-type-tickets" className="nav-link">
                          সকল প্রকার টিকেট
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/services/emergency-service" className="nav-link">
                          Emergency Service
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link href="/products" className="nav-link">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/coverage" className="nav-link">
                      Coverage
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/notice-board" className="nav-link">
                      Notice Board
                    </Link>
                  </li>
                  <li className="nav-item d-lg-none">
                    <Link href="/contact" className="nav-link">
                      Contact
                    </Link>
                  </li>
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
    </>
  );
}
