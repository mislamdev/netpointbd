'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';

export default function BanglaLibraryPage() {
  const libraries = [
    { name: 'Bangla Library', url: 'https://www.ebanglalibrary.com/', image: getAssetPath('/assets/img/allservices/banglalibrary.jpg') },
    { name: 'BDeBooks', url: 'https://bdebooks.com/', image: getAssetPath('/assets/img/allservices/BDeBooks.jpg') },
    { name: 'Bangla Library । বাংলা বই', url: 'https://www.banglalibrary.com/', image: getAssetPath('/assets/img/allservices/bangla-library.jpg') },
  ];

  return (
    <>
      <PageTitle 
        title="Bangla Library" 
        style="centered"
        description="Explore thousands of Bangla books, novels, and literature online. Your digital gateway to Bengali literature and knowledge."
      />
      <section className="services-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {libraries.map((library, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-services">
                  <div className="services-img">
                    <a target="_blank" href={library.url} rel="noopener noreferrer">
                      <img src={library.image} alt={library.name} width="290" height="345" title={library.name} loading="lazy" />
                    </a>
                  </div>

                  <div className="services-content">
                    <h3><a target="_blank" href={library.url} rel="noopener noreferrer">{library.name}</a></h3>
                    <div className="content">
                      <a target="_blank" href={library.url} className="read-more" rel="noopener noreferrer">
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
