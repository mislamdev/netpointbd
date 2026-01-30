'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function EducationPage() {
  const educationSites = [
    { name: 'Ministry of Education', url: 'http://www.educationboardresults.gov.bd/', image: getAssetPath('/assets/img/allservices/bd_logo.jpg') },
    { name: 'EDPDU', url: 'https://edpdu.com/bn', image: getAssetPath('/assets/img/allservices/edpdu.jpg') },
    { name: 'a2i', url: 'https://a2i.gov.bd/', image: getAssetPath('/assets/img/allservices/a2i.jpg') },
  ];

  return (
    <>
      <PageTitle 
        title="Education" 
        style="centered"
        description="Access educational resources, exam results, and learning platforms. Your gateway to quality education and academic information in Bangladesh."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {educationSites.map((site, index) => (
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
