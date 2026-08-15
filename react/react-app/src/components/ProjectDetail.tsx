import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import SEOHead from './SEOHead';
import { trackProjectView, trackEvent } from '../utils/analytics';

const SectionText: React.FC<{ value: string; previewLength?: number; minHiddenLength?: number }> = ({
  value,
  previewLength = 240,
  minHiddenLength = 180,
}) => {
  const [expanded, setExpanded] = useState(false);
  const shouldCollapse = value.length > previewLength + minHiddenLength;
  const preview = shouldCollapse ? `${value.slice(0, previewLength).trimEnd()}...` : value;

  return (
    <>
      <p>{expanded || !shouldCollapse ? value : preview}</p>
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

  const visible = expanded ? items : items.slice(0, defaultVisibleCount);
  const shouldCollapse = items.length - defaultVisibleCount >= minHiddenItems;

  return (
    <>
      <ul>
        {visible.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
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

// Small helper: collapsible list for long arrays
const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Track project view in Google Analytics
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

  if (!project) {
    return (
      <div className="project-detail">
        <div className="container">
          <h2>Project not found</h2>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <SEOHead 
        title={`${project.title} - Amir Mohammadi | Data Science Project`}
        description={`${project.description} ${project.content.data ? project.content.data.substring(0, 150) + '...' : ''}`}
        keywords={[
          ...project.tags,
          "Amir Mohammadi",
          "Data Science Project",
          "Machine Learning",
          "AI Project",
          "Portfolio"
        ]}
        url={`https://amir-data.vercel.app/project/${project.id}`}
        type="article"
        image={project.image}
      />
      {/* Navigation */}
      <nav className="project-nav">
        <div className="container">
          <Link to="/" className="nav-brand">Home</Link>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* Main Content */}
      <section className="project-content">
        <div className="container">
          <h2 className="project-detail-title small-header-title">{project.title}</h2>

          {/* small visual divider */}
          <div className="section-divider" aria-hidden="true" />

          {project.htmlSimulation && (
            <div className="project-simulation-container">
              <iframe
                src={project.htmlSimulation}
                title={`${project.title} interactive pipeline simulation`}
                className="project-simulation-iframe"
                loading="lazy"
                style={simulationHeight ? { height: simulationHeight, minHeight: 0 } : undefined}
              />
            </div>
          )}

          <div className="project-layout two-column-layout">
            {/* Left Column - Main Content */}
            <div className="project-main">
              {project.content.data && (
                <div className="project-section">
                  <h3>Project Data</h3>
                  <SectionText value={project.content.data} />
                </div>
              )}

              {project.content.processSections ? (
                <div className="project-section">
                  <h3>Development Process</h3>
                  {Object.entries(project.content.processSections).map(([section, body]) => (
                    <div key={section} style={{ marginBottom: '1rem' }}>
                      <h4 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>{section}</h4>
                      {Array.isArray(body) ? (
                        <SectionList items={body} defaultVisibleCount={2} minHiddenItems={4} />
                      ) : (
                        <SectionText value={body} previewLength={180} minHiddenLength={160} />
                      )}
                    </div>
                  ))}
                </div>
              ) : project.content.process && (
                <div className="project-section">
                  <h3>Development Process</h3>
                  <SectionList items={project.content.process} defaultVisibleCount={3} minHiddenItems={4} />
                </div>
              )}

              {project.content.keyFindings && (
                <div className="project-section">
                  <h3>Key Findings</h3>
                  <SectionList items={project.content.keyFindings} defaultVisibleCount={2} minHiddenItems={4} />
                </div>
              )}

              {project.content.findings && (
                <div className="project-section">
                  <h3>Findings</h3>
                  {Object.entries(project.content.findings).map(([section, bullets]) => (
                    <div key={section} style={{ marginBottom: '1rem' }}>
                      <h4 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>{section}</h4>
                      <SectionList items={bullets} defaultVisibleCount={2} minHiddenItems={4} />
                    </div>
                  ))}
                </div>
              )}

              {project.content.limitations && (
                <div className="project-section">
                  <h3>Limitations</h3>
                  <SectionList items={project.content.limitations} defaultVisibleCount={2} minHiddenItems={4} />
                </div>
              )}

              {/* Action Buttons */}
              <div className="project-actions">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary"
                    onClick={() => trackEvent('github_click', 'Projects', project.title)}
                  >
                    GitHub Repository
                  </a>
                )}
              </div>

              {/* Streamlit Embed */}
              {project.streamlitUrl && (
                <div className="streamlit-container">
                  <iframe 
                    src={project.streamlitUrl}
                    className="streamlit-iframe"
                    title={`${project.title} Streamlit App`}
                  />
                </div>
              )}

              {/* Video Player */}
              {project.video && (
                <div className="project-video-container">
                  <video controls className="project-video">
                    <source src={project.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

            </div>

            {/* Right Column - Images */}
            <div className="project-sidebar">
              {project.content.images?.map((image, index) => (
                <div key={index} className="project-image-container">
                  <img 
                    src={image.src} 
                    alt={image.caption} 
                    className="project-detail-image"
                  />
                  <p className="image-caption">{image.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="contact-title">Get In Touch!</h2>
          <div className="social-links">
            <a
              href="https://github.com/AmirMohammadiKarbalaei"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/amir-mohammadik/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="mailto:a.mohammadikarbalaei@gmail.com"
              className="social-link"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </section>

      <style>
        {`
          .project-video-container {
            position: relative;
            z-index: 1;
            margin-top: 20px; /* Adds gap between GitHub button and video */
          }

          .project-video {
            border-radius: 10px; /* Adds rounded corners to the video */
            width: 100%;
            height: auto;
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
            width: 100%;
            min-height: 1100px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            background: #06080f;
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