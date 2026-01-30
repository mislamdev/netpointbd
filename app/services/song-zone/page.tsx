'use client';

import PageTitle from '@/components/PageTitle';

export default function SongZonePage() {
  const musicServices = [
    { name: 'Hungama', url: 'https://www.hungama.com/albums/lang/bengali/popular/', image: '/assets/img/allservices/hungama.jpg' },
    { name: 'Wynk Music', url: 'https://wynk.in/music/playlist/bengali-top-20/bb_1519291110573', image: '/assets/img/allservices/Wynk-music.jpg' },
    { name: 'SoundCloud', url: 'https://soundcloud.com/', image: '/assets/img/allservices/soundcloud.jpg' },
  ];

  return (
    <>
      <PageTitle 
        title="Song Zone" 
        style="centered"
        description="Stream your favorite Bengali and international music online. Discover millions of songs, albums, and playlists from top music platforms."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {musicServices.map((service, index) => (
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
