'use client';

import PageTitle from '@/components/PageTitle';

export default function NoticeBoardPage() {
  return (
    <>
      <PageTitle 
        title="Notice Board" 
        style="centered"
        description="Stay updated with our latest news, announcements, and important updates. Check back regularly for service updates and special offers from Net Point BD."
      />
      <div className="shopping-cart-area ptb-100">
        <div className="container">
          <form className="wishlist">
            <div className="cart-table table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sl</th>
                    <th scope="col">Date</th>
                    <th scope="col">Title</th>
                    <th scope="col">View</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead> 

                <tbody>
                  {/* Notice items will be added here */}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>

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
