import { getAssetPath } from '@/lib/utils';

/**
 * ContactCallToAction Component
 *
 * A reusable call-to-action section encouraging users to contact Net Point BD
 * for internet connection in Bogura. Displays contact information with
 * "Contact Now" and "Call Now" buttons.
 *
 * @component
 * @example
 * ```tsx
 * <ContactCallToAction />
 * ```
 */
export default function ContactCallToAction() {
  return (
    <section className="subscribe-area pb-100">
      <div className="container">
        <div className="subscribe-bg">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-8 col-sm-7">
              <div className="subscribe-content">
                <img
                  src={getAssetPath('/assets/img/icon/call-for-witi.svg')}
                  alt="Contact Net Point BD"
                  width="80"
                  height="60"
                  loading="lazy"
                />
                <h2>Looking for Internet Connection in Bogura?</h2>
                <p>
                  Contact with Net Point BD now and get your superfast internet
                  connection within a day. We are here to assist you for your
                  internet connection.
                </p>
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
  );
}
