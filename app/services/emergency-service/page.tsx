'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function EmergencyServicePage() {
  const emergencyServices = [
    { name: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স', url: 'https://fireservice.gov.bd/', image: getAssetPath('/assets/img/allservices/fire-service.jpg') },
    { name: 'Ambulance BD 24', url: 'https://ambulancebd24.com/', image: getAssetPath('/assets/img/allservices/ambulance-BD-24.jpg') },
    { name: 'Dnet', url: 'https://dnet.org.bd/', image: getAssetPath('/assets/img/allservices/dnet.jpg') },
  ];

  return (
    <>
      <PageTitle 
        title="Emergency Service" 
        style="centered"
        description="Quick access to emergency services including fire service, ambulance, and crisis helplines. Get help when you need it most."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {emergencyServices.map((service, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-services">
                  <div className="services-img">
                    <a target="_blank" href={service.url} rel="noopener noreferrer">
                      <img src={service.image} alt={service.name} width="290" height="345" title={service.name} loading="lazy" />
                    </a>
                  </div>

                  <div className="services-content">
                    <h3><a target="_blank" href={service.url} rel="noopener noreferrer">{service.name}</a></h3>
                    <div className="content">
                      <a target="_blank" href={service.url} className="read-more" rel="noopener noreferrer">
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
