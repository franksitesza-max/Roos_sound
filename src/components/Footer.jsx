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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="stack">
            <a className="brand" href="index.html">
              <span className="brand-mark"><IconBars /></span>
              <span>ROOS <span className="brand-sub">SOUND</span></span>
            </a>
            <p>DJ-led events and a clear route into equipment rentals for events across Stellenbosch and South Africa.</p>
          </div>
          <div>
            <h4>Pages</h4>
            <div className="footer-links">
              <a href="packages.html">Packages</a>
              <a href="equipment.html">Equipment Rentals</a>
              <a href="dj.html">DJ Services</a>
            </div>
          </div>
          <div>
            <h4>Packages</h4>
            <div className="footer-links">
              <span>DJ Hire</span>
              <span>Event Packages</span>
              <span>Equipment Rentals</span>
              <span>Custom Quotes</span>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <div className="footer-links">
              <a href="dj.html#booking">Book an Event</a>
              <a href="mailto:info@roossound.co.za">info@roossound.co.za</a>
              <span>Stellenbosch, South Africa</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 Roos Sound Productions. All rights reserved.</span>
          <span>Website by Franksites, 2026.</span>
        </div>
      </div>
    </footer>
  );
}
