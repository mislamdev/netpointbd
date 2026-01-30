'use client';

import PageTitle from '@/components/PageTitle';

export default function CourtOfLawPage() {
  const legalSites = [
    { name: 'Find My Advocate', url: 'https://www.findmyadvocatebd.com/', image: '/assets/img/allservices/find-my-advocate.jpg' },
    { name: 'ই-কার্যতালিকা -সকল মামলার তথ্য এক তালিকায়', url: 'https://causelist.judiciary.gov.bd/', image: '/assets/img/allservices/ecourt.jpg' },
    { name: 'বাংলাদেশ ফরম', url: 'http://forms.mygov.bd/', image: '/assets/img/allservices/bdform.jpg' },
    { name: 'অধস্তন আদালতের রায়', url: 'http://decision.bdcourts.gov.bd/', image: '/assets/img/allservices/bdcourts.jpg' },
  ];

  return (
    <>
      <PageTitle 
        title="আইন আদালত" 
        style="centered"
        description="আইনি সেবা, আদালতের কার্যতালিকা, রায়, এবং আইনজীবী খুঁজুন। বাংলাদেশের আইন ও বিচার ব্যবস্থার সকল তথ্য এক জায়গায়।"
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {legalSites.map((site, index) => (
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
