'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function NewspaperPage() {
  const newspapers = [
    { name: 'Bangladesh Pratidin', url: 'https://www.bd-pratidin.com/', image: getAssetPath('/assets/img/allservices/bangladesh-pratidin.jpg') },
    { name: 'Nayadiganta', url: 'https://www.dailynayadiganta.com/', image: getAssetPath('/assets/img/allservices/nayadiganta.jpg') },
    { name: 'The Daily Ittefaq', url: 'https://www.ittefaq.com.bd/', image: getAssetPath('/assets/img/allservices/ittefaq.jpg') },
  ];

  return (
    <>
      <PageTitle 
        title="Newspaper" 
        style="centered"
        description="Stay updated with the latest news from Bangladesh's leading newspapers. Read daily news, articles, and updates from trusted sources."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {newspapers.map((newspaper, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-services">
                  <div className="services-img">
                    <a target="_blank" href={newspaper.url} rel="noopener noreferrer">
                      <img src={newspaper.image} alt={newspaper.name} width="290" height="345" title={newspaper.name} loading="lazy" />
                    </a>
                  </div>

                  <div className="services-content">
                    <h3><a target="_blank" href={newspaper.url} rel="noopener noreferrer">{newspaper.name}</a></h3>
                    <div className="content">
                      <a target="_blank" href={newspaper.url} className="read-more" rel="noopener noreferrer">
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
