import { ExternalLink, MapPin } from 'lucide-react';
import { contactMethods, faqs, site } from '../data/site.js';
import { EnquiryForm } from '../components/EnquiryForm.jsx';
import { FaqAccordion } from '../components/FaqAccordion.jsx';

export function ContactPage() {
  return (
    <>
      <section className="page-hero compact">
        <span className="eyebrow">Contact</span>
        <h1>Student Accommodation Support</h1>
        <p>
          Whether you are enquiring about a room or need accommodation information, our team is here
          to help.
        </p>
      </section>

      <div className="contact-page-flow">
        <section className="section contact-layout">
          <aside className="contact-card">
            <h2>Get in Touch</h2>
            {contactMethods.map(([label, value, Icon]) => (
              <div className="contact-method" key={label}>
                <Icon size={22} />
                <div>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </aside>
          <section className="form-card" id="enquiry" data-scroll-align="center">
            <h2>Send an Enquiry</h2>
            <p>Fill out the form and the Elim team will respond with availability and next steps.</p>
            <EnquiryForm />
          </section>
        </section>

        <section className="section faq-section" id="faq">
          <div className="section-heading centered">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <FaqAccordion items={faqs} />
        </section>
      </div>

      <section className="location-section">
        <div className="location-copy">
          <span className="eyebrow">Location</span>
          <h2>Find Elim Student Residency</h2>
          <p>
            Use the map link to check travel distance, nearby transport, and surrounding services
            around Wonderboom, Pretoria.
          </p>
          <a className="pill-button" href={site.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={18} />
            View on Google Maps
            <ExternalLink size={16} />
          </a>
        </div>
        <div className="location-card">
          <MapPin size={26} />
          <strong>{site.fullName}</strong>
          <span>{site.address}</span>
        </div>
      </section>
    </>
  );
}


