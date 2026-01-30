'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function FTPServerPage() {
  const ftpServers = [
    { name: 'RELAX TIME', url: 'http://10.100.100.10/', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'DHAKA MOVIE', url: 'http://dhakamovie.com', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'Smart Studio ftp', url: 'http://www.smartstudio.digital:8096', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'SAM FTP', url: 'http://172.16.50.4/', image: getAssetPath('/assets/img/allservices/sam-ftp.jpg') },
    { name: 'ftpbd', url: 'https://ftpbd.net', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'Movie Mazic', url: 'http://moviemazic.xyz', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'Net-Point Binodon', url: 'https://movies.discoveryftp.net/', image: getAssetPath('/assets/img/allservices/net-point-binodon.jpg') },
    { name: 'discovery ftp', url: 'https://discoveryftp.net', image: getAssetPath('/assets/img/allservices/media-house.jpg') },
    { name: 'Circle ftp', url: 'http://main.circleftp.net', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'Cinema Bazar', url: 'http://10.100.100.100:8096/web/#/home.html', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'Show Time', url: 'http://showtimebd.com/', image: getAssetPath('/assets/img/allservices/show-time.jpg') },
    { name: 'Software', url: 'http://server3.ftpbd.net/FTP-3/SOFTWARE-COLLECTION/', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'SMART FTP', url: 'http://www.smartstudio.digital:8096/web/#/home.html', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'FTPBD', url: 'http://server2.ftpbd.net', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
    { name: 'Roarzone Movie site', url: 'https://play.roarzone.info/web/index.html#!/home', image: getAssetPath('/assets/img/allservices/unnamed (1).png') },
  ];

  return (
    <>
      <PageTitle 
        title="FTP Server" 
        style="centered"
        description="Access high-speed FTP servers with unlimited movies, TV shows, software, and entertainment content exclusively for Net Point BD customers."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {ftpServers.map((server, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-services">
                  <div className="services-img">
                    <a target="_blank" href={server.url} rel="noopener noreferrer">
                      <img src={server.image} alt={server.name} width="290" height="345" title={server.name} loading="lazy" />
                    </a>
                  </div>

                  <div className="services-content">
                    <h3><a target="_blank" href={server.url} rel="noopener noreferrer">{server.name}</a></h3>
                    <div className="content">
                      <a target="_blank" href={server.url} className="read-more" rel="noopener noreferrer">
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
