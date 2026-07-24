import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Camera, Expand, Info, Share2 } from 'lucide-react';

const tourSpaces = [
  {
    name: 'Single Rooms',
    floor: 'Student Rooms',
    note: 'Private study, storage, and rest space.',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85'
    ]
  },
  {
    name: 'Sharing Rooms',
    floor: 'Shared Living',
    note: 'Affordable shared accommodation with essential furniture.',
    images: [
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=85'
    ]
  },
  {
    name: 'Outdoor Relaxation',
    floor: 'Courtyard',
    note: 'Outdoor areas for breaks between study sessions.',
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85'
    ]
  }
];

export function TourPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [actionMessage, setActionMessage] = useState('');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const active = tourSpaces[activeIndex];
  const activeImage = active.images[activeImageIndex];

  function selectSpace(index) {
    setActiveIndex(index);
    setActiveImageIndex(0);
    setIsSelectorOpen(false);
  }

  function previousImage() {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
      return;
    }

    const previousSpaceIndex = activeIndex === 0 ? tourSpaces.length - 1 : activeIndex - 1;
    setActiveIndex(previousSpaceIndex);
    setActiveImageIndex(tourSpaces[previousSpaceIndex].images.length - 1);
  }

  function nextImage() {
    if (activeImageIndex < active.images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
      return;
    }

    const nextSpaceIndex = activeIndex === tourSpaces.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextSpaceIndex);
    setActiveImageIndex(0);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') previousImage();
      if (event.key === 'ArrowRight') nextImage();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  function showActionMessage(message) {
    setActionMessage(message);
    window.setTimeout(() => setActionMessage(''), 2200);
  }

  async function sharePreview() {
    const shareUrl = `${window.location.origin}/tour`;
    const title = `${active.name} preview`;
    const text = `View the ${active.name} space preview at Elim Student Residency.`;

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: shareUrl });
        showActionMessage('Share sheet opened.');
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      showActionMessage('Preview link copied.');
    } catch (error) {
      const subject = encodeURIComponent(title);
      const body = encodeURIComponent(`${text}\n\n${shareUrl}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      showActionMessage('Opening email share.');
    }
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        showActionMessage('Exited fullscreen.');
        return;
      }

      await document.querySelector('.tour-stage')?.requestFullscreen();
      showActionMessage('Opened fullscreen.');
    } catch (error) {
      showActionMessage('Fullscreen is not available.');
    }
  }

  async function downloadCurrentImage() {
    try {
      const response = await fetch(activeImage);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `${active.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${activeImageIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
      showActionMessage('Image download started.');
    } catch (error) {
      window.open(activeImage, '_blank', 'noopener,noreferrer');
      showActionMessage('Opened image in a new tab.');
    }
  }

  return (
    <>
      <section className="tour-stage" style={{ backgroundImage: `url(${activeImage})` }}>
        <aside className={`tour-selector ${isSelectorOpen ? 'open' : 'collapsed'}`}>
          <button
            className="tour-selector-summary"
            type="button"
            onClick={() => setIsSelectorOpen((current) => !current)}
            aria-expanded={isSelectorOpen}
          >
            <span>
              <strong>Room Preview</strong>
              <small>{active.name}</small>
            </span>
            <ArrowRight size={18} />
          </button>
          <div className="tour-selector-panel">
          <span className="eyebrow">Room Preview</span>
          <h1>Explore the Space</h1>
          <p>Switch between Elim student living areas and room previews.</p>
          <div className="tour-options">
            {tourSpaces.map((space, index) => (
              <button
                className={index === activeIndex ? 'active' : ''}
                key={space.name}
                onClick={() => selectSpace(index)}
                type="button"
              >
              {space.name}
            </button>
          ))}
          </div>
          </div>
        </aside>
        <button
          className="tour-hotspot hotspot-one"
          type="button"
          aria-label={`View ${active.name}`}
          onClick={nextImage}
        />
        <button
          className="tour-hotspot hotspot-two"
          type="button"
          aria-label="Move to previous preview"
          onClick={previousImage}
        />
        <div className="tour-controls">
          <button aria-label="Previous preview" onClick={previousImage}>
            <ArrowLeft size={20} />
            {/* <span className="control-label">Previous</span> */}
          </button>
          <button aria-label="Next preview" onClick={nextImage}>
            <ArrowRight size={20} />
            {/* <span className="control-label">Next</span> */}
          </button>
          <button aria-label="Expand" onClick={toggleFullscreen}>
            <Expand size={20} />
          </button>
          <span>
            <Info size={19} />
            {active.name} - {activeImageIndex + 1}/{active.images.length}
          </span>
          <button aria-label="Share" onClick={sharePreview}>
            <Share2 size={20} />
          </button>
          <button aria-label="Capture" onClick={downloadCurrentImage}>
            <Camera size={20} />
          </button>
        </div>
        {actionMessage && <div className="tour-action-message">{actionMessage}</div>}
        <div className="tour-thumbnails" aria-label={`${active.name} photos`}>
          {active.images.map((image, index) => (
            <button
              className={index === activeImageIndex ? 'active' : ''}
              key={image}
              onClick={() => setActiveImageIndex(index)}
              type="button"
              aria-label={`Show ${active.name} photo ${index + 1}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </section>
      <section className="section split-section">
        <div>
          <span className="eyebrow">Student Living Preview</span>
          <h2>See the spaces that support study, comfort, and community.</h2>
          <p>
            Select each space to preview the student rooms, shared living, and outdoor
            relaxation spaces. These previews help you compare the room options and shared spaces before arranging a viewing.
          </p>
        </div>
        <div className="stat-stack">
          <span>{active.name}</span>
          <span>{active.note}</span>
          <span>Secure Access</span>
          <span>Unlimited Wi-Fi</span>
        </div>
      </section>
    </>
  );
}

