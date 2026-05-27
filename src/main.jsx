import { createRoot } from 'react-dom/client';

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
