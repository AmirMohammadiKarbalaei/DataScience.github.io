import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';

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
          <div className="project-layout two-column-layout">
            {/* Left Column - Main Content */}
            <div className="project-main">
              <h2 className="project-detail-title small-header-title" >{project.title}</h2>
              
              {project.content.data && (
                <div className="project-section">
                  <h3>Project Data</h3>
                  <p>{project.content.data}</p>
                </div>
              )}

              {project.content.process && (
                <div className="project-section">
                  <h3>Development Process</h3>
                  <ul>
                    {project.content.process.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.content.keyFindings && (
                <div className="project-section">
                  <h3>Key Findings</h3>
                  <ul>
                    {project.content.keyFindings.map((finding, index) => (
                      <li key={index}>{finding}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.content.limitations && (
                <div className="project-section">
                  <h3>Limitations</h3>
                  <ul>
                    {project.content.limitations.map((limitation, index) => (
                      <li key={index}>{limitation}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="project-actions">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
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
              href="https://www.linkedin.com/in/amir-mohammadikarbalaei-65b958193"
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
    </div>
  );
};

export default ProjectDetail;