'use client';

import PageTitle from '@/components/PageTitle';

export default function CoveragePage() {
  const areas = [
    { name: 'Dottobari', coords: '' },
    { name: 'Brindabonpara', coords: '' },
    { name: 'Boubazar', coords: '' },
    { name: 'Naruli', coords: '' },
    { name: 'Chelopara', coords: '' },
    { name: 'Nataipara', coords: '' },
    { name: 'Uposhohor', coords: '' },
    { name: 'Charmatha', coords: '' },
    { name: 'Nishindara', coords: '' },
    { name: 'Cantonment para', coords: '' },
    { name: 'Fultola', coords: '' },
    { name: 'Koigari', coords: '24.8271508,89.3711883' },
    { name: 'Sakpala', coords: '' },
    { name: 'Zamil Nagor', coords: '' },
    { name: 'Seujgari', coords: '' },
    { name: 'Malgram', coords: '' },
    { name: 'Bonani', coords: '24.8086284,89.3720197' },
    { name: 'Colony', coords: '24.823635,89.3709683' },
    { name: 'Choklokman', coords: '24.826509,89.3802896' },
    { name: 'Thanthania', coords: '24.8323114,89.3738866' },
    { name: 'Kanusgari', coords: '24.8390199,89.3712633' },
    { name: 'Rahman Nagar', coords: '24.8372235,89.3768477' },
    { name: 'Maloti Nagar', coords: '24.8356814,89.381041' },
    { name: 'Jaleshwari Tola', coords: '24.8440291,89.3729908' },
    { name: 'Khandar', coords: '24.8356606,89.3674708' },
    { name: 'Sathmatha', coords: '24.8482703,89.3721446' },
    { name: 'Jahurul Nagar', coords: '24.8516813,89.3585013' },
  ];

  return (
    <>
      <PageTitle 
        title="Coverage Area" 
        style="centered"
        description="Net Point BD provides high-speed internet service across multiple areas in Bogura. Check if we provide service in your area and get connected to reliable internet today."
      />
      
      <section className="protect-area protect-area-three ptb-100">
        <div className="container">
          <div className="row">
            {areas.map((area, index) => (
              <div key={index} className="col-xl-3 col-md-4 col-sm-6">
                <div className="single-challenges overly-one">
                  <a target="_blank" href={`https://www.google.com/maps/?q=${area.coords}`} rel="noopener noreferrer">
                    <div className="overly-two">
                      <i className="bx bx-location-plus"></i>
                      <h3>{area.name}</h3>
                      <span className="bx bxs-map-alt"></span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="subscribe-area ptb-100 bg-color">
        <div className="container">
          <div className="subscribe-bg">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-8 col-sm-7">
                <div className="subscribe-content">
                  <img src="/assets/img/icon/call-for-witi.svg" alt="Image" width="80" height="60" loading="lazy" />
                  <h2>Looking for Internet Connection in Bogura?</h2>
                  <p>Contact with Net Point BD now and get your superfast internet connection within a day. We are here to assist you for your internet connection.</p>
                </div>
              </div>

              <div className="col-lg-4 col-sm-4">
                <div className="text-center text-lg-end">
                  <a href="/contact" className="default-btn" style={{ marginRight: '10px' }}>
                    <span>Contact Now</span>
                  </a>
                  <a href="tel:+8809649315047" className="default-btn">
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
