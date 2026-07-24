import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Wifi } from 'lucide-react';
import { about, amenities, rooms, safety } from '../data/site.js';
import { RoomCard } from '../components/RoomCard.jsx';

const heroImage =
  'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1800&q=85';
const communityImage =
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85';

export function HomePage() {
  return (
    <>
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,62,46,.82), rgba(0,62,46,.22)), url(${heroImage})` }}>
        <div className="hero-panel">
          <span className="eyebrow">Student Accommodation</span>
          <h1>Student accommodation for study and everyday living.</h1>
          <p>
            Secure, welcoming accommodation where students can study, grow, and build lifelong
            friendships.
          </p>
          <div className="button-row">
            <Link className="pill-button gold" to="/contact#enquiry">
              Check Availability
              <ArrowRight size={18} />
            </Link>
            <Link className="outline-button hero-secondary" to="/tour">
              View Spaces
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <span>
            <ShieldCheck size={18} />
            Secure Living
          </span>
          <span>
            <Wifi size={18} />
            Unlimited Wi-Fi
          </span>
          <span>
            <CheckCircle2 size={18} />
            Furnished Rooms
          </span>
          <span>
            <Users size={18} />
            Student Community
          </span>
        </div>
      </section>

      <section className="section split-section">
        <div>
          <span className="eyebrow">{about.eyebrow}</span>
          <h2>{about.title}</h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <img className="feature-image" src={communityImage} alt="Students relaxing together" />
      </section>

      <section className="section rooms-preview">
        <div className="section-heading">
          <span className="eyebrow">Our Rooms</span>
          <h2>Comfortable Living Spaces</h2>
          <p>Choose from accommodation options that suit your needs and budget.</p>
        </div>
        {rooms.map((room, index) => (
          <RoomCard key={room.name} room={room} reversed={index % 2 === 1} />
        ))}
      </section>

      <section className="section amenities-section" id="amenities">
        <div className="section-heading centered">
          <span className="eyebrow">Amenities</span>
          <h2>Everything you need for student living.</h2>
        </div>
        <div className="amenity-grid">
          {amenities.map(([title, Icon, description]) => (
            <article className="amenity-card" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section safety-band">
        <div>
          <span className="eyebrow">Safety & Security</span>
          <h2>Your safety is our priority.</h2>
        </div>
        <div className="safety-grid">
          {safety.map(([label, Icon]) => (
            <span key={label}>
              <Icon size={20} />
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="testimonial-band">
        <div className="testimonial-copy">
          <span className="eyebrow">Voices from our Community</span>
          <h2>Students feel secure, supported, and at home.</h2>
          <article>
            <div className="stars">5/5</div>
            <p>
              "The environment at Elim is peaceful and secure. It gives students the space to
              focus, rest, and connect with others."
            </p>
            <strong>Resident Feedback</strong>
          </article>
        </div>
        <div className="testimonial-media">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85"
            alt="Students in a shared living space"
          />
          <div>
            <strong>Secure Living</strong>
            <span>Controlled access and secure gates</span>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <h2>Find your place at Elim.</h2>
        <p>Send an enquiry and our team will help with room availability and viewing options.</p>
        <Link className="pill-button" to="/contact#enquiry">
          Enquire Now
        </Link>
      </section>
    </>
  );
}

