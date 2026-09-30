import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Shared by unknown routes and unknown project ids. It says what was looked
// up, in the instrument's voice, then gives the way back.
const NotFound: React.FC<{ title?: string; readout?: string }> = ({
  title = 'Page not found',
  readout,
}) => {
  const { pathname } = useLocation();

  // The tab should say the page is missing, not show the homepage title.
  useEffect(() => {
    document.title = `${title} | Amir Mohammadikarbalaei`;
  }, [title]);

  return (
    <div className="project-detail">
      <nav className="project-nav">
        <div className="container">
          <Link to="/" className="nav-brand" aria-label="Amir Mohammadikarbalaei, home">
            <span className="brand-full">Amir Mohammadikarbalaei</span>
            <span className="brand-short" aria-hidden="true">Amir</span>
          </Link>
        </div>
      </nav>
      <main id="main">
      <section className="project-not-found">
        <div className="container">
          <h1 className="section-title">{title}</h1>
          <p className="not-found-readout">{readout ?? `nothing lives at ${pathname}`}</p>
          <p>It may have been renamed or taken down.</p>
          <Link to="/" className="btn-primary">
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            Back to home
          </Link>
        </div>
      </section>
      </main>
    </div>
  );
};

export default NotFound;
