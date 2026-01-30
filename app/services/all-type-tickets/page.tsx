'use client';

import PageTitle from '@/components/PageTitle';

export default function AllTypeTicketsPage() {
  const ticketSites = [
    { name: 'Biman Bangladesh Airlines Ltd', url: 'https://www.biman-airlines.com/', image: '/assets/img/allservices/biman-ticket.jpg' },
    { name: 'বাংলাদেশ রেলওয়ে', url: 'https://railway.portal.gov.bd/', image: '/assets/img/allservices/railway-ticket.jpg' },
  ];

  return (
    <>
      <PageTitle 
        title="সকল প্রকার টিকেট" 
        style="centered"
        description="বিমান, ট্রেন এবং বাসের টিকেট অনলাইনে বুক করুন। দ্রুত এবং নিরাপদ টিকেট বুকিং সেবা।"
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {ticketSites.map((site, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-services">
                  <div className="services-img">
                    <a target="_blank" href={site.url} rel="noopener noreferrer">
                      <img src={site.image} alt={site.name} width="290" height="345" title={site.name} loading="lazy" />
                    </a>
                  </div>

                  <div className="services-content">
                    <h3><a target="_blank" href={site.url} rel="noopener noreferrer">{site.name}</a></h3>
                    <div className="content">
                      <a target="_blank" href={site.url} className="read-more" rel="noopener noreferrer">
                        Read More
                        <i className="flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
