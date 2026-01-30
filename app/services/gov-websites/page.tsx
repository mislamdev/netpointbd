'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function GovWebsitesPage() {
  const govWebsites = [
    { name: 'ভূমি মন্ত্রণালয়', url: 'https://land.gov.bd/', image: getAssetPath('/assets/img/allservices/bdland.jpg') },
    { name: 'খাদ্য অধিদপ্তর', url: 'https://www.dgfood.gov.bd/', image: getAssetPath('/assets/img/allservices/bd-govt-jobs.jpg') },
    { name: 'বাংলাদেশ জাতীয় তথ্য বাতায়ন', url: 'https://bangladesh.gov.bd/index.php', image: getAssetPath('/assets/img/allservices/bd.jpg') },
  ];

  return (
    <>
      <PageTitle 
        title="সরকারি ওয়েবসাইট সমূহ" 
        style="centered"
        description="বাংলাদেশের সকল গুরুত্বপূর্ণ সরকারি ওয়েবসাইট এবং সেবা এক জায়গায়। সরকারি তথ্য ও সেবা পেতে সহজ প্রবেশাধিকার।"
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {govWebsites.map((website, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-services">
                  <div className="services-img">
                    <a target="_blank" href={website.url} rel="noopener noreferrer">
                      <img src={website.image} alt={website.name} width="290" height="345" title={website.name} loading="lazy" />
                    </a>
                  </div>

                  <div className="services-content">
                    <h3><a target="_blank" href={website.url} rel="noopener noreferrer">{website.name}</a></h3>
                    <div className="content">
                      <a target="_blank" href={website.url} className="read-more" rel="noopener noreferrer">
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
