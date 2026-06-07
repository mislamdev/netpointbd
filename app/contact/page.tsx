import PageTitle from '@/components/PageTitle';
import { readJSON } from '@/lib/db';
import type { SettingsFile } from '@/lib/types';

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await readJSON<SettingsFile>('settings');
  const { contact } = settings;
  return (
    <>
      <PageTitle
        title="Get in Touch"
        style="centered"
        description="Have questions about our services? Need technical support? Looking to get a new connection? Our friendly team is here to help you 24/7. Reach out to us and experience the best customer service in Bogura."
      />

      <section className="main-contact-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="contact-wrap">
                <div className="contact-form">
                  <div className="contact-title">
                    <h2>Feel free to Contact Us</h2>
                  </div>
                  <form id="contactForm">
                    <div className="row">
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label className="mb-2">Name</label>
                          <input type="text" name="Name" id="name" className="form-control" required placeholder="Enter your name" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label className="mb-2">Email</label>
                          <input type="email" name="Email" id="email" className="form-control" required placeholder="Enter your email" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label className="mb-2">Phone</label>
                          <input type="text" name="Phone" id="phone" className="form-control" required placeholder="Enter your phone number" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="form-group">
                          <label className="mb-2">Subject</label>
                          <input type="text" name="Subject" id="subject" className="form-control" required placeholder="Enter your subject" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label className="mb-2">Message</label>
                          <textarea name="Message" className="form-control" id="message" cols={30} rows={10} required placeholder="Write your message"></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <button type="submit" className="default-btn btn-two">
                          <span>Send Message</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="contact-info">
                <h3>Contact Details</h3>
                <p>Email us with any questions or inquiries or use our contact data.</p>
                <ul className="address">
                  <li className="location">
                    <i className="bx bxs-location-plus"></i>
                    <span>Address</span>
                    <a href="#">{contact.address}</a>
                  </li>
                  <li>
                    <i className="bx bxs-phone-call"></i>
                    <span>Phone</span>
                    {contact.phones.map((p, i) => (
                      <a key={i} href={`tel:${p.number}`}>
                        {p.number} {p.label ? `(${p.label})` : ''}
                      </a>
                    ))}
                  </li>
                  <li>
                    <i className="bx bxs-envelope"></i>
                    <span>Email</span>
                    {contact.emails.map((e, i) => (
                      <a key={i} href={`mailto:${e}`}>
                        {e}
                      </a>
                    ))}
                  </li>
                </ul>
                <div className="sidebar-follow-us">
                  <h3>Follow us:</h3>
                  <ul className="social-wrap">
                    {contact.social.facebook && (
                      <li>
                        <a target="_blank" href={contact.social.facebook} rel="noopener noreferrer">
                          <i className="bx bxl-facebook"></i>
                        </a>
                      </li>
                    )}
                    {contact.social.youtube && (
                      <li>
                        <a target="_blank" href={contact.social.youtube} rel="noopener noreferrer">
                          <i className="bx bxl-youtube"></i>
                        </a>
                      </li>
                    )}
                    {contact.social.linkedin && (
                      <li>
                        <a target="_blank" href={contact.social.linkedin} rel="noopener noreferrer">
                          <i className="bx bxl-linkedin"></i>
                        </a>
                      </li>
                    )}
                    {contact.social.twitter && (
                      <li>
                        <a target="_blank" href={contact.social.twitter} rel="noopener noreferrer">
                          <i className="bx bxl-twitter"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
