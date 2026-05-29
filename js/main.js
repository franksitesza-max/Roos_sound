'use strict';

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

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
  qsa('.reveal').forEach(el => el.classList.add('visible'));
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

document.addEventListener('DOMContentLoaded', () => {
  hardenAnchors();
  buildWaves();
  initPortraits();
  initReveal();
  initFilters();
  initTabs();
});
