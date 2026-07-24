import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Share2 } from 'lucide-react';
import { site } from '../data/site.js';

export function AppFooter() {
  const [shareMessage, setShareMessage] = useState('');

  function showShareMessage(message) {
    setShareMessage(message);
    window.setTimeout(() => setShareMessage(''), 2200);
  }

  async function shareWebsite() {
    const shareData = {
      title: site.fullName,
      text: 'View Elim Student Residency student accommodation.',
      url: window.location.origin
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showShareMessage('Share sheet opened.');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        showShareMessage('Page link copied.');
        return;
      }

      const subject = encodeURIComponent(shareData.title);
      const body = encodeURIComponent(`${shareData.text}\n\n${shareData.url}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      showShareMessage('Opening email share.');
    } catch (error) {
      if (error.name !== 'AbortError') showShareMessage('Unable to share right now.');
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section>
          <Link className="footer-brand" to="/" aria-label="Elim Student Residency home">
            <img src="/logo.png" alt="" />
            <span>{site.fullName}</span>
          </Link>
          <p>
            Student accommodation designed for study, safety, community, and everyday convenience.
          </p>
        </section>
        <section>
          <h3>Explore</h3>
          <Link to="/rooms">Rooms</Link>
          <Link to="/#amenities">Amenities</Link>
          <Link to="/tour">Space Preview</Link>
        </section>
        <section>
          <h3>Support</h3>
          <Link to="/contact#enquiry">Contact</Link>
          <Link to="/contact#faq">FAQs</Link>
        </section>
        <section>
          <h3>Contact</h3>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>
            <Phone size={16} />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`}>
            <Mail size={16} />
            {site.email}
          </a>
        </section>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Elim Student Residency. All rights reserved.</span>
        <div className="footer-actions">
          {shareMessage && <span className="footer-share-message">{shareMessage}</span>}
          <button
            className="icon-button footer-share"
            aria-label="Share this page"
            onClick={shareWebsite}
            type="button"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}








