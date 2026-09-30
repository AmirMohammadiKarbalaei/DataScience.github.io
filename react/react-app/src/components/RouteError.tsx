import React, { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

// After a redeploy, a visitor holding the old page asks for page chunks that
// no longer exist. The browser reports it as a failed dynamic import; one
// reload fetches the new build and the page works. Anything else is a real
// error, shown plainly with a way back.
const isStaleChunk = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error ?? '');
  return /dynamically imported module|Importing a module script failed|error loading dynamically imported module|Loading chunk/i.test(message);
};

const RELOAD_KEY = 'route-error-reloaded';

const RouteError: React.FC = () => {
  const error = useRouteError();
  const stale = isStaleChunk(error);

  // Reload once, not in a loop: the flag survives the reload and is cleared
  // on the next successful page view.
  useEffect(() => {
    if (!stale) return;
    try {
      if (!sessionStorage.getItem(RELOAD_KEY)) {
        sessionStorage.setItem(RELOAD_KEY, '1');
        window.location.reload();
      }
    } catch {
      // Storage blocked: fall through to the message below.
    }
  }, [stale]);

  useEffect(() => {
    document.title = 'Page did not load | Amir Mohammadikarbalaei';
  }, []);

  return (
    <div className="project-detail">
      <main id="main">
        <section className="project-not-found">
          <div className="container">
            <h1 className="section-title">This page didn’t load</h1>
            <p className="not-found-readout">
              {stale ? 'the site was updated while this tab was open' : 'something went wrong while showing this page'}
            </p>
            <p>Reloading usually fixes it. The rest of the site is still available from the homepage.</p>
            <div className="route-error-actions">
              <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
                <i className="fas fa-rotate-right" aria-hidden="true"></i>
                Reload page
              </button>
              <a href="/" className="btn-secondary">
                Go to homepage
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RouteError;
