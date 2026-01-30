'use client';

import PageTitle from '@/components/PageTitle';
import { getAssetPath } from '@/lib/utils';
import { useEffect } from 'react';

export default function PayBillPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$) {
      const $ = window.$;
      
      setTimeout(() => {
        // Initialize tabs for payment methods
        const tabsList = $('.pay-bill-tabs .tabs li');
        const tabsItems = $('.pay-bill-tabs .tabs_item');
        
        console.log('Initializing payment tabs...', tabsList.length, 'tabs found');
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tabsList.off('click').on('click', function(this: any) {
          const index = $(this).index();
          console.log('Payment tab clicked, index:', index);
          
          tabsItems.hide().removeClass('current');
          tabsList.removeClass('current');
          
          $(this).addClass('current');
          tabsItems.eq(index).addClass('current').show();
        });
      }, 500);
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        .pay-bill-tabs .tab .tabs_item {
          display: none !important;
        }
        .pay-bill-tabs .tab .tabs_item.current {
          display: block !important;
        }
        .pay-bill-tabs .tabs li {
          display: inline-block;
          margin-right: 20px;
          font-weight: 700;
          font-size: 16px;
          color: #000219;
          border-bottom: 3px solid #e0e0e0;
          padding: 10px 20px;
          cursor: pointer;
          transition: all ease 0.3s;
          background: #ffffff;
          border-radius: 5px 5px 0 0;
        }
        .pay-bill-tabs .tabs li:hover {
          border-bottom-color: #ff4800;
          color: #ff4800;
        }
        .pay-bill-tabs .tabs li.current {
          border-bottom-color: #ff4800;
          color: #ff4800;
          background: #f0f0f0;
        }
      `}</style>
      <PageTitle 
        title="Pay Your Bill - Fast & Secure" 
        style="centered"
        description="Pay your internet bill instantly with bKash, Nagad, Rocket, or Bank transfer. Multiple secure payment options available for your convenience. Get instant confirmation!"
      />
      
      <section className="ptb-100 bg-color">
        <div className="container">
          <div className="section-title text-center">
            <span>💳 Online Payment</span>
            <h2>Quick & Secure Bill Payment</h2>
            <p>Pay your internet bill in seconds with multiple payment options</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card p-5 shadow-lg" style={{ background: 'linear-gradient(135deg, #000219 0%, #1a1a2e 100%)', borderRadius: '20px', border: 'none' }}>
                <div className="row align-items-center">
                  <div className="col-lg-7 text-white text-lg-start text-center">
                    <h2 className="text-white mb-3" style={{ fontSize: '32px', fontWeight: '700' }}>Pay Your Bill Instantly!</h2>
                    <p className="mb-4" style={{ fontSize: '18px', opacity: '0.95' }}>
                      Fast, secure, and convenient online bill payment. No waiting, no hassle - just instant confirmation!
                    </p>
                    <ul className="text-start d-inline-block" style={{ listStyle: 'none', paddingLeft: 0 }}>
                      <li className="mb-2"><i className="bx bx-check-circle" style={{ fontSize: '20px', marginRight: '10px', color: '#ff4800' }}></i> Pay via bKash, Nagad, Rocket</li>
                      <li className="mb-2"><i className="bx bx-check-circle" style={{ fontSize: '20px', marginRight: '10px', color: '#ff4800' }}></i> Instant Payment Confirmation</li>
                      <li className="mb-2"><i className="bx bx-check-circle" style={{ fontSize: '20px', marginRight: '10px', color: '#ff4800' }}></i> 100% Secure Transactions</li>
                      <li className="mb-2"><i className="bx bx-check-circle" style={{ fontSize: '20px', marginRight: '10px', color: '#ff4800' }}></i> 24/7 Available</li>
                    </ul>
                  </div>
                  <div className="col-lg-5 text-center">
                    <div className="bg-white p-4 rounded" style={{ borderRadius: '15px' }}>
                      <img src={getAssetPath('/assets/img/bKash_Nagad.png')} alt="Payment Methods" className="mb-3" style={{ maxWidth: '180px', margin: '0 auto' }} />
                      <h4 className="mb-3" style={{ color: '#000219' }}>Choose Your Method</h4>
                      <a 
                        href="https://netpointbd.ispdigital.cloud/BillPayment/Index" 
                        target="_blank" 
                        className="default-btn"
                        rel="noopener noreferrer"
                        style={{ 
                          background: '#ff4800', 
                          padding: '15px 40px', 
                          fontSize: '18px',
                          fontWeight: '700',
                          borderRadius: '50px',
                          boxShadow: '0 10px 30px rgba(255, 72, 0, 0.4)',
                          transition: 'all 0.3s ease',
                          border: 'none'
                        }}
                      >
                        <span>💰 Pay Online Now</span>
                      </a>
                      <p className="mt-3 mb-0" style={{ fontSize: '14px', color: '#666' }}>
                        <i className="bx bx-lock-alt"></i> SSL Secured Payment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-us-area pt-50 pb-100 overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="about-content text-center pay-bill-tabs">
                <div className="tab">
                  <ul className="tabs active" style={{ paddingLeft: 0, listStyle: 'none', marginBottom: '40px' }}>
                    <li className="current">bKash Payment</li>
                    <li>Nagad Payment</li>
                    <li>Rocket Payment</li>
                    <li>Bank Payment</li>
                  </ul>
                  <div className="tab_content">
                    <div className="tabs_item current">
                      <img src={getAssetPath('/assets/img/billpay/bkash-payment.jpeg')} alt="bKash Payment" width="900" height="900" title="bKash Payment" loading="lazy" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                    <div className="tabs_item">
                      <img src={getAssetPath('/assets/img/billpay/nagad-payment.jpeg')} alt="Nagad Payment" width="900" height="900" title="Nagad Payment" loading="lazy" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                    <div className="tabs_item">
                      <img src={getAssetPath('/assets/img/billpay/rocket.jpg')} alt="Rocket Payment" width="900" height="900" title="Rocket Payment" loading="lazy" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                    <div className="tabs_item">
                      <section className="bank-area pt-4">
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-3 col-sm-6">
                              <div className="single-challenges overly-one">
                                <div className="overly-two">
                                  <img src={getAssetPath('/assets/img/billpay/brac-bank.png')} alt="Brac Bank" width="100" height="100" title="Brac Bank" loading="lazy" />
                                  <h3>Brac Bank</h3>
                                  <ul>
                                    <li><strong>A/C Name:</strong> NeT-PoinT BD</li>
                                    <li><strong>A/C No:</strong> 2053137790001</li>
                                    <li><strong>Branch:</strong> Joleswaritola Branch, Bogura.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="single-challenges overly-one">
                                <div className="overly-two">
                                  <img src={getAssetPath('/assets/img/billpay/dbbl-bank.png')} alt="DBBL Bank" width="100" height="100" title="DBBL Bank" loading="lazy" />
                                  <h3>DBBL Bank</h3>
                                  <ul>
                                    <li><strong>A/C Name:</strong> NeT-PoinT BD</li>
                                    <li><strong>A/C No:</strong> 1251510423150</li>
                                    <li><strong>Branch:</strong> DBBL Bogura Branch.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="single-challenges overly-one">
                                <div className="overly-two">
                                  <img src={getAssetPath('/assets/img/billpay/standard-bank.png')} alt="Standard Bank Ltd" width="100" height="100" title="Standard Bank Ltd" loading="lazy" />
                                  <h3>Standard Bank Ltd</h3>
                                  <ul>
                                    <li><strong>A/C Name:</strong> NET POINT BD</li>
                                    <li><strong>A/C No:</strong> 03433000682</li>
                                    <li><strong>Branch:</strong> Standard Bank Limited Bogura Branch.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="single-challenges overly-one">
                                <div className="overly-two">
                                  <img src={getAssetPath('/assets/img/billpay/pubali-bank.png')} alt="Pubali Bank" width="100" height="100" title="Pubali Bank" loading="lazy" />
                                  <h3>Pubali Bank</h3>
                                  <ul>
                                    <li><strong>A/C Name:</strong> NET POINT BD</li>
                                    <li><strong>A/C No:</strong> 3372901029704</li>
                                    <li><strong>Branch:</strong> Pubali Bank, Satmatha Sakha Bogura.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
