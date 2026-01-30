'use client';

import PageTitle from '@/components/PageTitle';

export default function TorrentPage() {
  return (
    <>
      <PageTitle 
        title="Torrent" 
        style="centered"
        description="Download files efficiently using torrent services. Access a wide range of content with high-speed downloads through our network."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="single-services">
                <div className="services-img">
                  <a target="_blank" href="https://www.utorrent.com/" rel="noopener noreferrer">
                    <img src="/assets/img/allservices/torrent.jpg" alt="Torrent" width="290" height="345" title="Torrent" loading="lazy" />
                  </a>
                </div>

                <div className="services-content">
                  <h3><a target="_blank" href="https://www.utorrent.com/" rel="noopener noreferrer">Torrent</a></h3>
                  <div className="content">
                    <a target="_blank" href="https://www.utorrent.com/" className="read-more" rel="noopener noreferrer">
                      Read More
                      <i className="flaticon-right-arrow"></i>
                    </a>
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
