'use strict';

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

function iconBars() {
  return `
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="10" width="2.8" height="6" rx="1.4" fill="currentColor"/>
      <rect x="8" y="6" width="2.8" height="14" rx="1.4" fill="currentColor"/>
      <rect x="13" y="3" width="2.8" height="18" rx="1.4" fill="currentColor"/>
      <rect x="18" y="8" width="2.8" height="10" rx="1.4" fill="currentColor"/>
    </svg>`;
}

function injectChrome() {
  const page = document.body.dataset.page || 'home';
  const links = [
    ['index.html', 'Home', 'home'],
    ['packages.html', 'Packages', 'packages'],
    ['equipment.html', 'Equipment Rentals', 'equipment'],
    ['dj.html', 'DJ', 'dj']
  ];
  const navLinks = links.map(([href, label, key]) => `<a class="nav-link ${page === key ? 'active' : ''}" href="${href}">${label}</a>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `
    <nav class="nav" aria-label="Main navigation">
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="Roos Sound Productions home">
          <span class="brand-mark">${iconBars()}</span>
          <span>ROOS <span class="brand-sub">SOUND</span></span>
        </a>
        <div class="nav-links">${navLinks}</div>
        <a class="nav-cta" href="dj.html#booking">Book Now</a>
        <button class="hamburger" type="button" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </nav>
    <div class="mobile-menu" aria-label="Mobile menu">${navLinks}<a class="nav-cta" href="dj.html#booking">Book Now</a></div>
  `);
}

function injectFooter() {
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="stack">
            <a class="brand" href="index.html">
              <span class="brand-mark">${iconBars()}</span>
              <span>ROOS <span class="brand-sub">SOUND</span></span>
            </a>
            <p>DJ-led events and a clear route into equipment rentals for events across Stellenbosch and South Africa.</p>
          </div>
          <div>
            <h4>Pages</h4>
            <div class="footer-links">
              <a href="packages.html">Packages</a>
              <a href="equipment.html">Equipment Rentals</a>
              <a href="dj.html">DJ Services</a>
            </div>
          </div>
          <div>
            <h4>Packages</h4>
            <div class="footer-links">
              <span>DJ Hire</span>
              <span>Event Packages</span>
              <span>Equipment Rentals</span>
              <span>Custom Quotes</span>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <div class="footer-links">
              <a href="dj.html#booking">Book an Event</a>
              <a href="mailto:info@roossound.co.za">info@roossound.co.za</a>
              <span>Stellenbosch, South Africa</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Copyright 2026 Roos Sound Productions. All rights reserved.</span>
          <span>Website by Franksites, 2026.</span>
        </div>
      </div>
    </footer>
  `);
}

function initNav() {
  const nav = qs('.nav');
  const hamburger = qs('.hamburger');
  const mobile = qs('.mobile-menu');
  const setScrolled = () => nav.classList.toggle('scrolled', scrollY > 18);
  setScrolled();
  addEventListener('scroll', setScrolled, { passive: true });
  hamburger?.addEventListener('click', () => {
    const open = !mobile.classList.contains('open');
    mobile.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  qsa('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
    mobile.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}

function buildWaves() {
  qsa('[data-wave]').forEach(wave => {
    wave.replaceChildren();
    for (let i = 0; i < 28; i += 1) {
      wave.append(document.createElement('span'));
    }
  });
}

function initPortraits() {
  qsa('.avatar-photo img').forEach(img => {
    const frame = img.closest('.avatar-photo');
    const markReady = () => frame?.classList.add('photo-ready');
    const markMissing = () => frame?.classList.remove('photo-ready');
    if (img.complete && img.naturalWidth > 0) markReady();
    img.addEventListener('load', markReady, { once: true });
    img.addEventListener('error', markMissing, { once: true });
  });
}

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px' });
  qsa('.reveal').forEach(el => observer.observe(el));
}

function initFilters() {
  const items = qsa('[data-cat]');
  qsa('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      qsa('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

function initTabs() {
  qsa('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const root = btn.closest('[data-tabs]');
      qsa('.tab-btn', root).forEach(b => b.classList.remove('active'));
      qsa('[data-panel]', root).forEach(panel => { panel.hidden = true; });
      btn.classList.add('active');
      qs(`[data-panel="${btn.dataset.tab}"]`, root).hidden = false;
    });
  });
}

function initReviewPlayer() {
  const root = qs('[data-review-player]');
  if (!root) return;

  const reviews = [
    {
      client: 'Simonsberg Met',
      initials: 'SM',
      event: 'Residence event - Stellenbosch',
      quote: 'The setup was clean, the levels were right from the first song, and the floor stayed busy until the last track.'
    },
    {
      client: 'Eendrag',
      initials: 'E',
      event: 'Housedance - Stellenbosch',
      quote: 'Michael read the room properly. The sound had punch without getting messy, and every changeover felt smooth.'
    },
    {
      client: 'Huis Marais',
      initials: 'HM',
      event: 'Private residence function',
      quote: 'Professional from arrival to pack-down. The gear looked sharp, the playlist landed, and the whole night felt effortless.'
    },
    {
      client: 'Stellenbosch Choir',
      initials: 'SC',
      event: 'Society event - Stellenbosch',
      quote: 'Clear communication, reliable timing and a polished sound setup. It made the event feel considered from start to finish.'
    }
  ];

  const title = qs('[data-review-title]', root);
  const quote = qs('[data-review-quote]', root);
  const initials = qs('[data-review-initials]', root);
  const client = qs('[data-review-client]', root);
  const event = qs('[data-review-event]', root);
  const progress = qs('[data-review-progress]', root);
  const toggle = qs('[data-review-toggle]', root);
  const toggleIcon = qs('[data-review-toggle-icon]', root);
  const dots = qsa('[data-review-dot]', root);
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalMs = 6000;
  let active = 0;
  let isPlaying = !prefersReducedMotion;
  let timer;

  const wrap = index => (index + reviews.length) % reviews.length;

  const restartProgress = () => {
    if (!progress) return;
    progress.style.animation = 'none';
    progress.offsetHeight;
    progress.style.animation = '';
  };

  const schedule = () => {
    clearInterval(timer);
    root.classList.toggle('is-playing', isPlaying);
    toggle?.setAttribute('aria-pressed', String(isPlaying));
    toggle?.setAttribute('aria-label', isPlaying ? 'Pause review carousel' : 'Play review carousel');
    if (toggleIcon) {
      toggleIcon.classList.toggle('control-icon-pause', isPlaying);
      toggleIcon.classList.toggle('control-icon-play', !isPlaying);
    }
    if (!isPlaying) return;
    timer = setInterval(() => setReview(active + 1), intervalMs);
  };

  function setReview(index) {
    active = wrap(index);
    const review = reviews[active];

    if (title) title.textContent = review.client;
    if (quote) quote.textContent = `"${review.quote}"`;
    if (initials) initials.textContent = review.initials;
    if (client) client.textContent = review.client;
    if (event) event.textContent = review.event;

    dots.forEach((dot, dotIndex) => {
      const selected = dotIndex === active;
      dot.classList.toggle('active', selected);
      dot.setAttribute('aria-selected', String(selected));
    });

    restartProgress();
    schedule();
  }

  qs('[data-review-prev]', root)?.addEventListener('click', () => setReview(active - 1));
  qs('[data-review-next]', root)?.addEventListener('click', () => setReview(active + 1));
  toggle?.addEventListener('click', () => {
    isPlaying = !isPlaying;
    restartProgress();
    schedule();
  });
  dots.forEach(dot => {
    dot.addEventListener('click', () => setReview(Number(dot.dataset.reviewDot)));
  });

  if (prefersReducedMotion) root.classList.remove('is-playing');
  setReview(0);
}

document.addEventListener('DOMContentLoaded', () => {
injectChrome();
injectFooter();
initNav();
buildWaves();
initPortraits();
initReveal();
initFilters();
initTabs();
initReviewPlayer();
});
