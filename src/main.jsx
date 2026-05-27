import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Mount Navbar if exists
const navRoot = document.getElementById('navbar-root');
if (navRoot) {
  createRoot(navRoot).render(<Navbar />);
}

// Mount Footer if exists
const footerRoot = document.getElementById('footer-root');
if (footerRoot) {
  createRoot(footerRoot).render(<Footer />);
}

// Mount FluidVenueRibbon if exists and conditions met
const ribbonRoot = document.getElementById('fluid-venue-ribbon-root');
const canRunFluidRibbon =
  ribbonRoot &&
  window.matchMedia('(min-width: 900px)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canRunFluidRibbon) {
  import('./FluidVenueRibbon.jsx').then(({ default: FluidVenueRibbon }) => {
    createRoot(ribbonRoot).render(<FluidVenueRibbon />);
  });
}

// Mount ReviewPlayer if exists
const reviewRoot = document.getElementById('review-player-root');
if (reviewRoot) {
  import('./components/ReviewPlayer.jsx').then(({ default: ReviewPlayer }) => {
    createRoot(reviewRoot).render(<ReviewPlayer />);
  });
}

// Mount EquipmentCatalog if exists
const catalogRoot = document.getElementById('equipment-catalog-root');
if (catalogRoot) {
  import('./components/EquipmentCatalog.jsx').then(({ default: EquipmentCatalog }) => {
    createRoot(catalogRoot).render(<EquipmentCatalog />);
  });
}
