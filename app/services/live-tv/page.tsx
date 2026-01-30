'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function LiveTVPage() {
  const liveTVServices = [
    { name: 'NeT-PoinT Live', url: 'http://97.74.103.44/jwtv1/index.php', image: getAssetPath('/assets/img/allservices/sports.jpg') },
    { name: 'Live Tv Sports', url: 'http://172.17.50.112', image: getAssetPath('/assets/img/allservices/net-point-bd.jpg') },
    { name: 'LIVE Mazic TV', url: 'http://moviemazic.xyz/live-tv.html', image: getAssetPath('/assets/img/allservices/bdip-live.jpg') },
    { name: 'iptvidn', url: 'http://tv.bdiptv.net', image: getAssetPath('/assets/img/services/live-tv.jpg') },
    { name: 'bdiptv', url: 'http://tv.bdiptv.net/', image: getAssetPath('/assets/img/allservices/net-point-bd.jpg') },
    { name: 'iptvidn2', url: 'http://iptvidn.com/', image: getAssetPath('/assets/img/services/live-tv.jpg') },
    { name: 'Sports TV', url: 'http://172.27.27.200/home/index/pyv67elzqk3', image: getAssetPath('/assets/img/allservices/sports.jpg') },
    { name: 'Just Live Sports', url: 'http://tv.bdiptv.net', image: getAssetPath('/assets/img/allservices/live-tv.jpg') },
    { name: 'Live TV', url: 'http://iptvidn.com', image: getAssetPath('/assets/img/allservices/live-tv.jpg') },
    { name: 'Just Live Sports', url: 'http://172.17.50.112/', image: getAssetPath('/assets/img/allservices/bdip-live.jpg') },
  ];

  return (
    <>
      <PageTitle 
        title="Live TV" 
        style="centered"
        description="Watch live TV channels, sports, news, and entertainment from Bangladesh and around the world with our premium streaming services."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {liveTVServices.map((service, index) => (
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
