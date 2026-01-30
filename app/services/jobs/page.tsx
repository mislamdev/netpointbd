'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function JobsPage() {
  const jobSites = [
    { name: 'Bdjobs.com', url: 'https://www.bdjobs.com/', image: getAssetPath('/assets/img/allservices/bdjobs.jpg') },
    { name: 'BD Jobs Today', url: 'https://bdjobstoday.com/', image: getAssetPath('/assets/img/allservices/bdjobs-today.jpg') },
    { name: 'BD Govt Jobs', url: 'https://bdgovtjobs.com/', image: getAssetPath('/assets/img/allservices/bd-govt-jobs.jpg') },
  ];

  return (
    <>
      <PageTitle 
        title="Jobs" 
        style="centered"
        description="Find your dream job in Bangladesh. Search thousands of job listings from top companies, government positions, and career opportunities."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {jobSites.map((site, index) => (
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
