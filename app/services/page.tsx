'use client';

import PageTitle from '@/components/PageTitle';

export default function ServicesPage() {
  return (
    <>
      <PageTitle title="Our Services" breadcrumb={[{ name: 'Services' }]} />
      <section className="ptb-100">
        <div className="container">
          <div className="section-title text-center">
            <h1>Our Services</h1>
            <p>Additional services for our customers</p>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <a href="/services/ftp-server" className="service-box">
                <div className="single-challenges overly-one">
                  <div className="overly-two">
                    <i className="bx bx-server"></i>
                    <h3>FTP Server</h3>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <a href="/services/live-tv" className="service-box">
                <div className="single-challenges overly-one">
                  <div className="overly-two">
                    <i className="bx bx-tv"></i>
                    <h3>Live TV</h3>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <a href="/services/torrent" className="service-box">
                <div className="single-challenges overly-one">
                  <div className="overly-two">
                    <i className="bx bx-download"></i>
                    <h3>Torrent</h3>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <a href="/services/bangla-library" className="service-box">
                <div className="single-challenges overly-one">
                  <div className="overly-two">
                    <i className="bx bx-book"></i>
                    <h3>Bangla Library</h3>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
