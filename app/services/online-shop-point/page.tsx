'use client';

import PageTitle from '@/components/PageTitle';

export default function OnlineShopPointPage() {
  const shoppingSites = [
    { name: 'Daraz', url: 'https://www.daraz.com.bd/', image: '/assets/img/allservices/daraz.jpg' },
    { name: 'AjkerDeal', url: 'https://www.ajkerdeal.com/', image: '/assets/img/allservices/ajkerdeal.jpg' },
    { name: 'Caldal', url: 'https://chaldal.com/', image: '/assets/img/allservices/caldal.jpg' },
  ];

  return (
    <>
      <PageTitle 
        title="Online Shop Point" 
        style="centered"
        description="Shop online from Bangladesh's top e-commerce platforms. Browse millions of products with convenient home delivery and secure payments."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {shoppingSites.map((site, index) => (
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
