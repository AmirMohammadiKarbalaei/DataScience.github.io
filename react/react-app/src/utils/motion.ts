// True when the visitor has asked for reduced motion (on Windows: Settings >
// Accessibility > Visual effects > Animation effects off). Kept out of the
// component files so React Fast Refresh can hot-reload them cleanly.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
