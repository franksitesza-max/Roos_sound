'use strict';

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

function iconBars() {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '23');
  svg.setAttribute('height', '23');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');

  [
    { x: '3', y: '10', w: '2.8', h: '6' },
    { x: '8', y: '6', w: '2.8', h: '14' },
    { x: '13', y: '3', w: '2.8', h: '18' },
    { x: '18', y: '8', w: '2.8', h: '10' }
  ].forEach(({ x, y, w, h }) => {
    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', w);
    rect.setAttribute('height', h);
    rect.setAttribute('rx', '1.4');
    rect.setAttribute('fill', 'currentColor');
    svg.append(rect);
  });

  return svg;
}

function createNavLink(href, label, isActive) {
  const link = document.createElement('a');
  link.className = `nav-link${isActive ? ' active' : ''}`;
  link.href = href;
  link.textContent = label;
  return link;
}

function injectChrome() {
  const page = document.body.dataset.page || 'home';
  const links = [
    ['/', 'Home', 'home'],
    ['/packages', 'Packages', 'packages'],
    ['/equipment', 'Equipment Rentals', 'equipment'],
    ['/dj', 'DJ', 'dj']
  ];
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const navInner = document.createElement('div');
  navInner.className = 'container nav-inner';

  const brand = document.createElement('a');
  brand.className = 'brand';
  brand.href = '/';
  brand.setAttribute('aria-label', 'Roos Sound Productions home');

  const brandMark = document.createElement('span');
  brandMark.className = 'brand-mark';
  brandMark.append(iconBars());
  brand.append(brandMark);

  const brandText = document.createElement('span');
  brandText.append(document.createTextNode('ROOS '));
  const brandSub = document.createElement('span');
  brandSub.className = 'brand-sub';
  brandSub.textContent = 'SOUND';
  brandText.append(brandSub);
  brand.append(brandText);

  const navLinks = document.createElement('div');
  navLinks.className = 'nav-links';
  links.forEach(([href, label, key]) => {
    navLinks.append(createNavLink(href, label, page === key));
  });

  const navCta = document.createElement('a');
  navCta.className = 'nav-cta';
  navCta.href = '/dj#booking';
  navCta.textContent = 'Book Now';

  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.type = 'button';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.setAttribute('aria-expanded', 'false');
  for (let i = 0; i < 3; i += 1) {
    hamburger.append(document.createElement('span'));
  }

  navInner.append(brand, navLinks, navCta, hamburger);
  nav.append(navInner);

  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.setAttribute('aria-label', 'Mobile menu');
  links.forEach(([href, label, key]) => {
    mobileMenu.append(createNavLink(href, label, page === key));
  });

  const mobileCta = document.createElement('a');
  mobileCta.className = 'nav-cta';
  mobileCta.href = '/dj#booking';
  mobileCta.textContent = 'Book Now';
  mobileMenu.append(mobileCta);

  document.body.prepend(mobileMenu);
  document.body.prepend(nav);
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

function hardenAnchors() {
  qsa('a[href]').forEach(anchor => {
    const rawHref = anchor.getAttribute('href');
    if (typeof rawHref !== 'string') return;

    const trimmed = rawHref.trim().toLowerCase();
    if (trimmed.startsWith('javascript:')) {
      anchor.removeAttribute('href');
      anchor.setAttribute('aria-disabled', 'true');
      return;
    }

    if (anchor.getAttribute('target') === '_blank') {
      const rel = new Set((anchor.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      rel.add('noreferrer');
      anchor.setAttribute('rel', [...rel].join(' '));
    }
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
hardenAnchors();
injectChrome();
initNav();
buildWaves();
initPortraits();
initReveal();
initFilters();
initTabs();
initReviewPlayer();
});
