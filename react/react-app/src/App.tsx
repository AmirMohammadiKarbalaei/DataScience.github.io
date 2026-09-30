import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import Home from './components/Home';
import RouteError from './components/RouteError';
import { trackPageView } from './utils/analytics';

// Google Analytics is loaded by the gtag snippet in index.html. initGA() from
// utils/analytics injects a second copy of the same snippet, which double-counts
// every pageview, so it is deliberately not called here.

// A data router rather than <BrowserRouter>: Link's viewTransition (the card
// to project page morph) only works in data mode, and the data router replays
// the transition in reverse on browser Back.
//
// <ScrollRestoration> replaces the old hand-rolled ScrollToTop: new pages
// open at the top, /#section links land on the section, and Back restores the
// homepage scroll, so a card is exactly where it was when the morph returns.
const isProject = (path: string) => path.startsWith('/project/');

function RootLayout() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(pathname);

  // Which way the card morph runs: 'open' grows a card into a page, 'close'
  // shrinks a page back into its card. Set during the route update, before
  // the browser styles the transition, so html[data-vt-dir] selectors apply.
  // Between two project pages, Back closes and anything else opens.
  useLayoutEffect(() => {
    const from = previousPath.current;
    const closing =
      (isProject(from) && !isProject(pathname)) ||
      (isProject(from) && isProject(pathname) && navigationType === 'POP');
    document.documentElement.dataset.vtDir = closing ? 'close' : 'open';
    previousPath.current = pathname;
  }, [pathname, navigationType]);

  useEffect(() => {
    trackPageView(pathname);
    // A page rendered, so a later stale-chunk error may reload once again.
    try { sessionStorage.removeItem('route-error-reloaded'); } catch { /* storage blocked */ }
  }, [pathname]);

  return (
    <>
      <ScrollRestoration />
      {/* First stop for keyboard users: jumps past the nav to the page content. */}
      <a href="#main" className="skip-link">Skip to content</a>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    // Any failure while loading or rendering a page, including a page chunk
    // that vanished in a redeploy, lands on a readable screen with a way out.
    errorElement: <RouteError />,
    // Nothing to show while a lazy page chunk loads on first visit: the page
    // appears when it is ready. Declared so the router does not warn.
    HydrateFallback: () => null,
    children: [
      { path: '/', element: <Home /> },
      // Secondary pages are separate chunks. The router's lazy() loads a chunk
      // before it commits the navigation, so the card-to-page transition
      // always has the real page to expand into (React.lazy would render an
      // empty Suspense fallback at that moment and break the morph).
      { path: '/experience', lazy: async () => ({ Component: (await import('./components/Experience')).default }) },
      { path: '/project/:id', lazy: async () => ({ Component: (await import('./components/ProjectDetail')).default }) },
      { path: '*', lazy: async () => ({ Component: (await import('./components/NotFound')).default }) },
    ],
  },
]);

// Warm the project page chunk once the homepage is idle, so the first card
// click doesn't wait on the network before its transition starts.
if (typeof window !== 'undefined') {
  const warm = () => { void import('./components/ProjectDetail'); };
  if ('requestIdleCallback' in window) window.requestIdleCallback(warm, { timeout: 4000 });
  else setTimeout(warm, 2500);
}

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
