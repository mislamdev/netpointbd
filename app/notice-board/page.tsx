'use client';

import PageTitle from '@/components/PageTitle';
import ContactCallToAction from '@/components/ContactCallToAction';

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

      <ContactCallToAction />
    </>
  );
}
