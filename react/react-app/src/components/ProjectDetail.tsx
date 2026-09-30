import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useViewTransitionState } from 'react-router-dom';
import type { Project } from '../data/projects';
import { projects } from '../data/projects';
import { primaryDomain } from '../data/domains';
import SEOHead from './SEOHead';
import NotFound from './NotFound';
import { prefersReducedMotion } from '../utils/motion';
import { trackProjectView, trackEvent } from '../utils/analytics';

// The collapsed preview ends where a reader would pause: at the end of a
// sentence near the target length, or failing that at a word boundary.
// Slicing at a fixed character count cut text mid-token ("[EMAIL_...").
// Returns where the cut falls and whether it needs an ellipsis (a word cut
// does, a sentence cut does not).
const previewOf = (value: string, target: number) => {
  const window = value.slice(0, Math.round(target * 1.4));
  const sentenceEnds = [...window.matchAll(/[.!?](?=\s)/g)].map(m => (m.index ?? 0) + 1);
  const sentenceCut = sentenceEnds.filter(i => i >= target * 0.6).shift();
  if (sentenceCut) return { cut: sentenceCut, ellipsis: false };
  const wordCut = value.lastIndexOf(' ', target);
  const end = wordCut > 0 ? wordCut : target;
  return { cut: value.slice(0, end).replace(/[\s,;:]+$/, '').length, ellipsis: true };
};

const SectionText: React.FC<{ value: string; previewLength?: number; minHiddenLength?: number }> = ({
  value,
  previewLength = 240,
  minHiddenLength = 180,
}) => {
  const [expanded, setExpanded] = useState(false);
  const shouldCollapse = value.length > previewLength + minHiddenLength;
  const { cut, ellipsis } = previewOf(value, previewLength);
  const head = value.slice(0, cut);

  // Expanding continues the same paragraph: the rest fades in after the part
  // already read, rather than the whole paragraph re-rendering.
  return (
    <>
      <p>
        {!shouldCollapse ? value : (
          <>
            {head}
            {expanded
              ? <span className="section-more">{value.slice(cut)}</span>
              : ellipsis && '…'}
          </>
        )}
      </p>
      {shouldCollapse && (
        <button
          type="button"
          className="btn-text"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </>
  );
};

const SectionList: React.FC<{ items: string[]; defaultVisibleCount?: number; minHiddenItems?: number }> = ({
  items,
  defaultVisibleCount = 3,
  minHiddenItems = 4,
}) => {
  const [expanded, setExpanded] = useState(false);
  if (!items || items.length === 0) return null;

  const shouldCollapse = items.length - defaultVisibleCount >= minHiddenItems;
  // Only a list long enough to have a "Show more" is shortened. Cutting a
  // shorter list hid its last items with no way to reach them.
  const visible = expanded || !shouldCollapse ? items : items.slice(0, defaultVisibleCount);

  return (
    <>
      <ul>
        {visible.map((item, index) => {
          // Items revealed by "Show more" settle in, a few ms apart (capped).
          const revealed = expanded && shouldCollapse && index >= defaultVisibleCount;
          const step = Math.min(index - defaultVisibleCount, 5);
          return (
            <li
              key={index}
              className={revealed ? 'section-list-more' : undefined}
              style={revealed ? { animationDelay: `${step * 40}ms` } : undefined}
            >
              {item}
            </li>
          );
        })}
      </ul>
      {shouldCollapse && (
        <button
          type="button"
          className="btn-text"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : `Show ${items.length - defaultVisibleCount} more`}
        </button>
      )}
    </>
  );
};

// Up next: the following project in the same domain, wrapping round, so a
// reader who finishes an NLP write-up is handed the next NLP one. Falls back
// to the next project overall when the domain has no other.
const findNext = (project: Project) => {
  const domainKey = primaryDomain(project)?.key;
  const index = projects.findIndex(p => p.id === project.id);
  const ordered = [...projects.slice(index + 1), ...projects.slice(0, index)];
  const sameDomain = ordered.find(p => primaryDomain(p)?.key === domainKey);
  return { next: sameDomain ?? ordered[0], sameDomain: Boolean(sameDomain) };
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const upNext = project ? findNext(project) : undefined;
  const next = upNext?.next;

  // The header is the landing place of the card morph. While the page is
  // leaving for (or returning from) the up-next project, the up-next card
  // carries the names instead, so no name is ever used twice.
  const morphingViaUpNext = useViewTransitionState(next ? `/project/${next.id}` : '/__no-next__');
  // Names only while this page is being opened or closed: a named element is
  // its own stacking context and backdrop root, which would change how the
  // page's glass panels blur if it were named all the time.
  const pageMorphing = useViewTransitionState(`/project/${id}`);
  const reduced = prefersReducedMotion();
  const headerName = (n: string): React.CSSProperties | undefined =>
    pageMorphing && !morphingViaUpNext && !reduced ? { viewTransitionName: n } : undefined;
  const upNextName = (n: string): React.CSSProperties | undefined =>
    morphingViaUpNext && !reduced ? { viewTransitionName: n } : undefined;

  // Track project view in Google Analytics. Scroll position is owned by the
  // router's <ScrollRestoration>, so Back returns to where the reader was.
  useEffect(() => {
    if (project) {
      trackProjectView(project.id, project.title);
    }
  }, [id, project]);

  // Let an embedded simulation report its own height, so the iframe fits its
  // content instead of relying on a fixed min-height that is wrong at some
  // widths. Simulations that never post a message keep the CSS default.
  const [simulationHeight, setSimulationHeight] = useState<number | null>(null);

  useEffect(() => {
    setSimulationHeight(null);

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; height?: number } | null;
      if (!data || data.type !== 'simulation:height') return;
      const height = Number(data.height);
      if (Number.isFinite(height)) {
        setSimulationHeight(Math.min(4000, Math.max(320, Math.ceil(height))));
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [id]);

  // Reading instruments for long write-ups: a trace in the domain hue that
  // fills as the page is read, and a readout of the section in view. The trace
  // is written straight to the DOM on scroll, so reading never re-renders.
  const traceRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (traceRef.current) traceRef.current.style.transform = `scaleX(${progress})`;

      // The current section is the last heading that has passed under the
      // bar. Computed from positions on each frame, so a fast scroll or a jump
      // to the end still lands on the right name.
      const headings = document.querySelectorAll<HTMLElement>('.project-main .project-section > h2');
      let current: string | null = null;
      headings.forEach((h) => {
        if (h.getBoundingClientRect().top < 96) current = h.textContent;
      });
      setCurrentSection(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [id]);

  if (!project) {
    return <NotFound title="Project not found" readout={`no project with the id “${id}”`} />;
  }

  const domain = primaryDomain(project);
  const sameDomain = upNext?.sameDomain;
  const nextDomain = next ? primaryDomain(next) : undefined;
  // A recording can be audio only (the Jarvis demo is an .m4a), which needs
  // an audio player rather than an empty video frame.
  const isAudio = /\.(m4a|mp3|wav|ogg|aac)$/i.test(project.video ?? '');
  // A few images sit beside the write-up. Many images would outgrow the text
  // and leave a long empty column beside it, so from four up they become a
  // gallery under the write-up instead. With none, the write-up runs as one
  // readable column.
  const imageCount = project.content.images?.length ?? 0;
  const hasGallery = imageCount >= 4;
  const hasSidebar = imageCount > 0 && !hasGallery;

  return (
    <div
      className={`project-detail${domain ? ` domain-${domain.key}` : ''}`}
      style={headerName('project-surface')}
    >
      <SEOHead
        title={`${project.title} | Amir Mohammadikarbalaei`}
        description={`${project.description} ${project.content.data ? project.content.data.substring(0, 150) + '...' : ''}`}
        keywords={[
          ...project.tags,
          "Amir Mohammadikarbalaei",
          "Data Science Project",
          "Machine Learning",
          "AI Project",
          "Portfolio"
        ]}
        url={`https://amir-data.vercel.app/project/${project.id}`}
        type="article"
        image={project.image}
      />
      {/* Navigation: sticky, carrying the reading trace and section readout. */}
      <nav className="project-nav project-nav-sticky">
        <div className="container">
          {/* The same brand as every other page, linking home, then the routes
              a reader landing here from LinkedIn needs next. */}
          <Link to="/" viewTransition className="nav-brand" aria-label="Amir Mohammadikarbalaei, home">
            <span className="brand-full">Amir Mohammadikarbalaei</span>
            <span className="brand-short" aria-hidden="true">Amir</span>
          </Link>
          <Link to="/#projects" viewTransition className="nav-link">Projects</Link>
          <Link to="/experience" viewTransition className="nav-link">Experience</Link>
          <a href="#contact" className="nav-link">Contact</a>
          <span className="section-readout" aria-hidden="true">
            {currentSection}
          </span>
        </div>
        <div className="reading-trace" ref={traceRef} aria-hidden="true" />
      </nav>
      <main id="main">

      {/* Main Content */}
      <section className="project-content">
        <div className="container">
          <header className="project-header">
            <h1 className="project-detail-title small-header-title">
              <span className="project-title-text">{project.title}</span>
            </h1>
            {domain && (
              <p className="project-domain">{domain.label}</p>
            )}
            {/* The tools, moved here from the homepage card: one quiet line of
                plain text, the same treatment as the skills list. */}
            {project.tags.length > 0 && (
              <ul className="project-tools" aria-label="Tools and topics">
                {project.tags.map(tag => <li key={tag}>{tag}</li>)}
              </ul>
            )}
          </header>

          {/* small visual divider */}
          <div className="section-divider" aria-hidden="true" />

          {/* The demo leads: hearing or watching the thing work is the
              strongest evidence on the page, so it comes before the write-up. */}
          {project.video && (
            <section className="project-demo" aria-labelledby="project-demo-title">
              <h2 id="project-demo-title" className="project-demo-title">Demo</h2>
              {isAudio ? (
                <audio controls preload="metadata" className="project-demo-audio" aria-label={`${project.title}: demo recording`}>
                  <source src={project.video} type="audio/mp4" />
                </audio>
              ) : (
                <video controls preload="metadata" className="project-video" aria-label={`${project.title}: demo video`}>
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </section>
          )}

          {project.htmlSimulation && (
            <div className={`project-simulation-container${project.simulationFallback ? ' has-fallback' : ''}`}>
              <iframe
                src={project.htmlSimulation}
                title={`${project.title} interactive pipeline simulation`}
                className="project-simulation-iframe"
                loading="lazy"
                style={simulationHeight ? { height: simulationHeight, minHeight: 0 } : undefined}
              />
            </div>
          )}
          {/* On phones a wide interactive diagram can only be clipped, so a
              static version of the same diagram stands in for it. */}
          {project.simulationFallback && (
            <figure className="project-simulation-fallback">
              <img src={project.simulationFallback.src} alt={project.simulationFallback.caption} />
              <figcaption className="image-caption">{project.simulationFallback.caption}</figcaption>
            </figure>
          )}

          <div className={`project-layout ${hasSidebar ? 'two-column-layout' : 'single-column-layout'}`}>
            {/* Left Column - Main Content */}
            <div className="project-main">
              {project.content.data && (
                <div className="project-section">
                  <h2>Overview</h2>
                  <p>{project.content.data}</p>
                </div>
              )}

              {project.content.processSections ? (
                <div className="project-section">
                  <h2>How it works</h2>
                  {Object.entries(project.content.processSections).map(([section, body]) => (
                    <div key={section} style={{ marginBottom: '1.5rem' }}>
                      <h3>{section}</h3>
                      {Array.isArray(body) ? (
                        <SectionList items={body} defaultVisibleCount={3} minHiddenItems={3} />
                      ) : (
                        <SectionText value={body} previewLength={180} minHiddenLength={160} />
                      )}
                    </div>
                  ))}
                </div>
              ) : project.content.process && (
                <div className="project-section">
                  <h2>How it works</h2>
                  <SectionList items={project.content.process} defaultVisibleCount={3} minHiddenItems={4} />
                </div>
              )}

              {project.content.keyFindings && (
                <div className="project-section">
                  <h2>Findings</h2>
                  <SectionList items={project.content.keyFindings} defaultVisibleCount={project.content.keyFindings.length} />
                </div>
              )}

              {project.content.findings && (
                <div className="project-section">
                  <h2>Findings</h2>
                  {Object.entries(project.content.findings).map(([section, bullets]) => (
                    <div key={section} style={{ marginBottom: '1.5rem' }}>
                      <h3>{section}</h3>
                      <SectionList items={bullets} defaultVisibleCount={bullets.length} />
                    </div>
                  ))}
                </div>
              )}

              {project.content.limitations && (
                <div className="project-section">
                  <h2>Limitations</h2>
                  <SectionList items={project.content.limitations} defaultVisibleCount={project.content.limitations.length} />
                </div>
              )}

            </div>

            {/* Right Column - Images */}
            {hasSidebar && (
              <div className="project-sidebar">
                {project.content.images?.map((image, index) => (
                  <div key={index} className="project-image-container">
                    <img
                      src={image.src}
                      alt={image.caption}
                      className="project-detail-image"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.hidden = true; }}
                    />
                    <p className="image-caption">{image.caption}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {hasGallery && (
            <section className="project-gallery" aria-labelledby="project-gallery-title">
              <h2 id="project-gallery-title" className="project-gallery-title">Figures</h2>
              <div className="project-gallery-grid">
                {project.content.images?.map((image, index) => (
                  <figure key={index} className="project-gallery-item">
                    <img src={image.src} alt={image.caption} loading="lazy" onError={(e) => { e.currentTarget.hidden = true; }} />
                    <figcaption className="image-caption">{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Actions after all the evidence. The live app opens in its own tab
              instead of an embed: a sleeping Streamlit app rendered as 600px
              of empty frame. */}
          {(project.githubUrl || project.streamlitUrl) && (
            <div className="project-actions">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  onClick={() => trackEvent('github_click', 'Projects', project.title)}
                >
                  GitHub repository
                </a>
              )}
              {project.streamlitUrl && (
                <a
                  href={project.streamlitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  onClick={() => trackEvent('live_app_click', 'Projects', project.title)}
                >
                  Live app
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Up next: the end of a write-up hands the reader the next one. */}
      {next && next.id !== project.id && (
        <section className="up-next" aria-labelledby="up-next-label">
          <div className="container">
            <p id="up-next-label" className="up-next-readout">
              {sameDomain && domain ? (
                <>next in <span className={`domain-${domain.key} up-next-domain`}>{domain.label}</span></>
              ) : (
                'next project'
              )}
            </p>
            <Link
              to={`/project/${next.id}`}
              viewTransition
              className={`up-next-card${nextDomain ? ` domain-${nextDomain.key}` : ''}`}
              style={upNextName('project-surface')}
              onClick={() => trackEvent('up_next_click', 'Projects', next.title)}
            >
              <span className="up-next-body">
                <span className="up-next-title">{next.title}</span>
                <span className="up-next-description">{next.description}</span>
              </span>
              <i className="fas fa-arrow-right up-next-arrow" aria-hidden="true"></i>
            </Link>
            <Link to="/#projects" viewTransition className="btn-text up-next-all">
              All projects
            </Link>
          </div>
        </section>
      )}

      {/* Contact Section: labelled links, the same as the homepage. */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="contact-title">Contact</h2>
          <div className="social-links">
            <a
              href="mailto:a.mohammadikarbalaei@gmail.com"
              className="social-link"
            >
              <i className="fas fa-envelope" aria-hidden="true"></i>
              Email
            </a>
            <a
              href="https://github.com/AmirMohammadiKarbalaei"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fab fa-github" aria-hidden="true"></i>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/amir-mohammadik/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fab fa-linkedin" aria-hidden="true"></i>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      </main>
      <style>
        {`
          /* Demo: first after the header. Audio sits in a short strip; video
             is capped so it never outgrows a reading column. */
          .project-demo {
            margin: 0 0 40px;
          }

          .project-demo-title {
            font-size: var(--type-heading);
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 16px;
          }

          .project-demo-audio {
            display: block;
            width: 100%;
            max-width: 560px;
            color-scheme: dark;
          }

          .project-video {
            display: block;
            width: 100%;
            max-width: 960px;
            height: auto;
            border-radius: 12px;
          }

          /* One column when there are no images: the write-up keeps a
             readable measure instead of running the full container width. */
          .project-layout.single-column-layout .project-main {
            max-width: 780px;
          }

          /* Gallery: the figures of an image-heavy project, two to a row under
             the write-up, one to a row on phones. */
          .project-gallery {
            margin-top: 2.5rem;
            padding-top: 2.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .project-gallery-title {
            font-size: var(--type-heading);
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 1.25rem;
          }

          .project-gallery-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 32px 28px;
            align-items: start;
          }

          .project-gallery-item {
            margin: 0;
          }

          .project-gallery-item img {
            display: block;
            width: 100%;
            height: auto;
            border-radius: 12px;
          }

          @media (max-width: 768px) {
            .project-gallery-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }
          }

          .project-simulation-fallback {
            display: none;
            margin: 0 0 40px;
          }

          .project-simulation-fallback img {
            display: block;
            width: 100%;
            height: auto;
            border-radius: 12px;
          }

          @media (max-width: 768px) {
            .project-simulation-container.has-fallback {
              display: none;
            }

            .project-simulation-fallback {
              display: block;
            }
          }

          .project-content .container {
            max-width: 1600px;
          }

          .project-layout.two-column-layout {
            gap: 56px;
          }

          .project-layout.two-column-layout .project-main {
            flex: 2.1;
          }

          .project-layout.two-column-layout .project-sidebar {
            flex: 1.4;
          }

          .project-sidebar {
            position: relative;
            z-index: 0;
          }

          .project-image-container img {
            width: 100%; /* Ensure the image takes up the full width of its container */
            height: auto; /* Maintain aspect ratio */
            max-width: 1400px; /* Further increased maximum width for larger displays */
            margin: 0 auto; /* Center the image horizontally */
            display: block; /* Ensure proper centering */
          }

          .project-simulation-container {
            width: 100%;
            margin: 0 0 40px 0;
          }

          .project-simulation-iframe {
            /* The height the demo reports is its content height, so the
               1px border must sit outside it. With the site-wide border-box
               the border ate 2px and forced a scrollbar inside the frame. */
            box-sizing: content-box;
            display: block;
            width: calc(100% - 2px);
            min-height: 1100px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            background: var(--field-solid);
            box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
          }

          .section-preview {
            display: block;
          }
        `}
      </style>
    </div>
  );
};

export default ProjectDetail;