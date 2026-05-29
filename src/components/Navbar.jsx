import { useState, useEffect } from 'react';

const LINKS = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/packages', label: 'Packages', key: 'packages' },
  { href: '/equipment', label: 'Equipment Rentals', key: 'equipment' },
  { href: '/dj', label: 'DJ', key: 'dj' }
];

function IconBars() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="10" width="2.8" height="6" rx="1.4" fill="currentColor"/>
      <rect x="8" y="6" width="2.8" height="14" rx="1.4" fill="currentColor"/>
      <rect x="13" y="3" width="2.8" height="18" rx="1.4" fill="currentColor"/>
      <rect x="18" y="8" width="2.8" height="10" rx="1.4" fill="currentColor"/>
    </svg>
  );
}

export default function Navbar() {
  const [page, setPage] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Detect active page from body dataset
    if (typeof document !== 'undefined') {
      setPage(document.body.dataset.page || 'home');
    }

    // Scroll listener for sticky styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="container nav-inner">
          <a className="brand" href="/" aria-label="Roos Sound Productions home">
            <span className="brand-mark"><IconBars /></span>
            <span>ROOS <span className="brand-sub">SOUND</span></span>
          </a>
          <div className="nav-links">
            {LINKS.map(({ href, label, key }) => (
              <a
                key={key}
                className={`nav-link ${page === key ? 'active' : ''}`}
                href={href}
              >
                {label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="/dj#booking">Book Now</a>
          <button
            className={`hamburger ${isOpen ? 'open' : ''}`}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`} aria-label="Mobile menu">
        {LINKS.map(({ href, label, key }) => (
          <a
            key={key}
            className={`nav-link ${page === key ? 'active' : ''}`}
            href={href}
            onClick={closeMenu}
          >
            {label}
          </a>
        ))}
        <a className="nav-cta" href="/dj#booking" onClick={closeMenu}>Book Now</a>
      </div>
    </>
  );
}
