import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import LottieAnimation from './LottieAnimation';
import Navigation from './Navigation';
import ParticleBackground from './ParticleBackground';
import Preloader from './Preloader';
import SEOHead from './SEOHead';
import { trackContactInteraction, trackEvent } from '../utils/analytics';

// Filter row is generated from this list rather than hardcoded, so counts can
// never drift from the data. Each filter matches a project if the project carries
// ANY of its keys, which keeps the row short: nine single-tag filters was too many,
// and several returned a single result.
const CATEGORY_FILTERS: { key: string; label: string; icon: string; match: string[] }[] = [
  { key: 'aiml', label: 'AI & Machine Learning', icon: 'fas fa-brain',
    match: ['AI', 'ML', 'RL', 'TimeSeries', 'CV'] },
  { key: 'nlp',  label: 'NLP & LLMs',            icon: 'fas fa-robot',
    match: ['NLP', 'LLM'] },
  { key: 'data', label: 'Data & BI',             icon: 'fas fa-chart-bar',
    match: ['DA', 'BI'] },
];

const Home: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [currentTitle, setCurrentTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [isClickedOpen, setIsClickedOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // useMemo keeps the array identity stable across renders. Without it the typing
  // effect below re-runs on every state tick and spawns overlapping timer chains.
  const titles = useMemo(
    () => ['a Data Scientist', 'an AI Engineer', 'a ML Engineer'],
    []
  );

  // Skills section no longer uses progress bars; simple chips are displayed.

  // Animation for stats counter
  const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target') || '0');
      const increment = target / 100;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.ceil(current).toString();
      }, 20);
    });
  };

  // Scroll progress effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
  let currentText = '';
  let isDeleting = false;
  let timer: ReturnType<typeof setTimeout>;
    
    const typeEffect = () => {
      const fullText = titles[titleIndex];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }
      
      setCurrentTitle(currentText);
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && currentText === fullText) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        setTitleIndex((prev) => (prev + 1) % titles.length);
        typeSpeed = 500;
      }
      
      // Reassigning the same handle means the cleanup below always clears the
      // pending timeout, not just the initial one.
      timer = setTimeout(typeEffect, typeSpeed);
    };

    timer = setTimeout(typeEffect, 1000);
    return () => clearTimeout(timer);
  }, [titleIndex, titles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations based on the section
            // No skill bar animation needed
            if (entry.target === statsRef.current) {
              setTimeout(animateStats, 500);
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const refs = [aboutRef, skillsRef, statsRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Close quick actions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.quick-actions')) {
        setQuickActionsOpen(false);
        setIsClickedOpen(false);
      }
    };

    if (quickActionsOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [quickActionsOpen]);

  const activeFilter = CATEGORY_FILTERS.find(f => f.key === filter);
  const filteredProjects = !activeFilter
    ? projects
    : projects.filter(p => p.category.some(c => activeFilter.match.includes(c)));

  // Map skill names to Font Awesome icons for visual variety
  const getSkillIcon = (name: string) => {
    const s = name.toLowerCase();
    if (s.includes('python')) return 'fab fa-python';
    if (s.includes('sql')) return 'fas fa-database';
    if (s.includes('pandas')) return 'fas fa-table';
    if (s.includes('numpy')) return 'fas fa-cubes';
    if (s.includes('scikit') || s.includes('xgboost') || s.includes('lightgbm')) return 'fas fa-project-diagram';
    if (s.includes('pytorch')) return 'fas fa-fire';
    if (s.includes('tensor')) return 'fas fa-layer-group';
    if (s.includes('power bi')) return 'fas fa-chart-bar';
    if (s.includes('tableau')) return 'fas fa-chart-pie';
    if (s.includes('feature')) return 'fas fa-tools';
    if (s.includes('spacy')) return 'fas fa-language';
    if (s.includes('transformer')) return 'fas fa-robot';
    if (s.includes('vision') || s.includes('opencv')) return 'fas fa-camera';
    if (s.includes('time series')) return 'fas fa-chart-line';
    if (s.includes('a/b') || s.includes('experiment')) return 'fas fa-vial';
    if (s.includes('statistical')) return 'fas fa-superscript';
    if (s.includes('explainability') || s.includes('shap') || s.includes('lime')) return 'fas fa-lightbulb';
    if (s.includes('matplotlib') || s.includes('seaborn') || s.includes('visualis')) return 'fas fa-chart-area';
    if (s.includes('mlops') || s.includes('mlflow')) return 'fas fa-cogs';
    return 'fas fa-circle';
  };

  const SkillPill: React.FC<{ text: string }> = ({ text }) => (
    <span className="skill-pill">
      <i className={`${getSkillIcon(text)} pill-icon`} aria-hidden="true"></i>
      {text}
    </span>
  );

  return (
    <div>
      <SEOHead 
        title="Amir Mohammadikarbalaei - Data Scientist & AI Engineer | Portfolio"
        description="Data Scientist and AI Engineer working on NLP, LLMs and machine learning at Unilever. MSc Data Science, University of Bath. Portfolio of applied ML projects in NLP, deep learning, computer vision and reinforcement learning."
        keywords={[
          "Amir Mohammadikarbalaei",
          "Data Scientist",
          "AI Engineer",
          "Machine Learning Engineer",
          "NLP Engineer",
          "LLM Engineer",
          "Deep Learning",
          "PyTorch",
          "Hugging Face",
          "PEFT",
          "LoRA",
          "Computer Vision",
          "Natural Language Processing",
          "Reinforcement Learning",
          "Python",
          "SQL",
          "MLflow",
          "UK Data Scientist",
          "University of Bath",
          "Data Science Portfolio"
        ]}
        url="https://amir-data.vercel.app/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Amir Mohammadikarbalaei",
          "jobTitle": ["Data Scientist", "AI Engineer", "Machine Learning Engineer"],
          "description": "Data Scientist and AI Engineer working on NLP, LLMs and machine learning at Unilever. MSc Data Science, University of Bath.",
          "url": "https://amir-data.vercel.app/",
          "image": "https://amir-data.vercel.app/media/data-science-new-banner.jpg",
          "sameAs": [
            "https://github.com/AmirMohammadiKarbalaei",
            "https://www.linkedin.com/in/amir-mohammadik/"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Unilever",
            "description": "Global consumer goods company"
          },
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "University of Bath"
          },
          "knowsAbout": [
            "Data Science",
            "Machine Learning", 
            "Artificial Intelligence",
            "Deep Learning",
            "Computer Vision",
            "Natural Language Processing",
            "Reinforcement Learning",
            "Python Programming",
            "SQL",
            "PyTorch",
            "Hugging Face Transformers",
            "Large Language Models",
            "MLflow",
            "Power BI",
            "Data Analytics",
            "Statistical Analysis"
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "degree",
              "name": "MSc Data Science, University of Bath"
            }
          ],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://amir-data.vercel.app/"
          }
        }}
      />
      <Preloader />
      <Navigation />
      <ParticleBackground />
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar"></div>
      </div>
      
      {/* Header */}
      <header id="home" className="header" role="banner">
        <img
          className="header-image"
          src="/media/data-science-new-banner.jpg"
          alt="Amir Mohammadi Data Scientist and AI Engineer banner showing data visualization and machine learning concepts"
          loading="eager"
        />
        <div className="header-overlay" aria-hidden="true"></div>

        <div className="header-content">
          <div className="hero-text">
            <h1 className="visually-hidden">
              Amir Mohammadikarbalaei - Data Scientist and AI Engineer
            </h1>
            <div className="typing-container">
              <span className="typing-prefix">I'm </span>
              <span className="typing-text">{currentTitle}</span>
              <span className="cursor">|</span>
            </div>
            <p className="hero-description">
              Building machine learning, NLP and LLM-powered solutions that deliver
              real-world impact. Currently at Unilever, working on NLP and analytics
              for employee-facing chatbot and service desk systems.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">
                <i className="fas fa-rocket"></i>
                View Projects
              </a>
              <a href="#about" className="btn-secondary">
                <i className="fas fa-user"></i>
                About Me
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="container">
          <h2 id="about-title" className="section-title">About Me</h2>
          <div className="about-content" ref={aboutRef}>
            <div className="profile-container">
              <img
                className="profile-image"
                src="/media/profile.jpg"
                alt="Profile"
              />
              <div className="profile-badges">
                <div className="profile-badge">
                  <i className="fas fa-map-marker-alt"></i>
                  Liverpool, UK
                </div>
                <div className="profile-badge">
                  <i className="fas fa-briefcase"></i>
                  Unilever
                </div>
                <div className="profile-badge">
                  <i className="fas fa-calendar"></i>
                  4+ Years Exp
                </div>
              </div>
            </div>
            <div className="about-text">
              {/* <div className="about-highlights">
                <div className="highlight-item">
                  <i className="fas fa-brain"></i>
                  <span>AI & Machine Learning Expert</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-chart-line"></i>
                  <span>Data-Driven Decision Making</span>
                </div>
                <div className="highlight-item">
                  <i className="fas fa-rocket"></i>
                  <span>Y Combinator Experience</span>
                </div>
              </div> */}
              <p className="about-description">
                I am a dedicated data scientist with a passion for uncovering
                meaningful insights from complex data. Currently working at <strong>Unilever</strong> as a 
                Customer Operations and Una Bot Analyst.
              </p>
              <p className="about-description">
                Beyond technical proficiency, my primary focus is on using data to drive positive societal change. I believe that uncovering insights is a commitment to guiding better decisions, and I am deeply invested in advancing a future where data science is ethical, transparent, and inclusive. By championing responsible AI and fostering interpretability, I strive to contribute to a field that balances innovation with accountability.
              </p>
              <div className="about-cta">
                <Link to="/experience" className="btn-outline">
                  <i className="fas fa-timeline"></i>
                  View Full Journey
                </Link>
                <a href="#contact" className="btn-text">
                  <i className="fas fa-envelope"></i>
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section" aria-label="Skills">
        <div className="container">
          <h2 className="section-title">Skills & Tools</h2>
          {/* Core stack row: your primary tools */}
          


          {/* Categorised skills matrix - concise 4 buckets */}
          <div className="skills-grid">
            <div className="skills-category">
              <h3><i className="fas fa-code"></i> Core Data & ML</h3>
              <div className="skills-list">
                {['Python','SQL','Pandas','NumPy','Scikit-Learn','XGBoost/LightGBM','Feature Engineering'].map(s => (
                  <SkillPill key={`coreml-${s}`} text={s} />
                ))}
              </div>
            </div>

            <div className="skills-category">
              <h3><i className="fas fa-robot"></i> Deep Learning & AI</h3>
              <div className="skills-list">
                {['PyTorch','TensorFlow','spaCy','Transformers','Computer Vision (OpenCV)'].map(s => (
                  <SkillPill key={`dlai-${s}`} text={s} />
                ))}
              </div>
            </div>

            <div className="skills-category">
              <h3><i className="fas fa-chart-line"></i> Analytics & Experimentation</h3>
              <div className="skills-list">
                {['A/B Testing & Experimentation','Statistical Inference','Model Explainability (SHAP/LIME)'].map(s => (
                  <SkillPill key={`analytics-${s}`} text={s} />
                ))}
              </div>
            </div>

            <div className="skills-category">
              <h3><i className="fas fa-chart-bar"></i> BI & Visualisation</h3>
              <div className="skills-list">
                {['Power BI','Tableau','Matplotlib','Seaborn'].map(s => (
                  <SkillPill key={`biviz-${s}`} text={s} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width banner of project types */}
        <div className="skills-works">
          <div className="container works-inner">
            <span className="works-title">
              <i className="fas fa-briefcase" aria-hidden="true"></i> What I build:
            </span>
            <div className="works-list">
              {[
                'Reinforcement Learning',
                'Time Series Forecasting',
                'Classification',
                "Predictive Models",
                'Object Detection',
                'Clustering',
                'Anomaly Detection',
                'Recommendation Systems',
                'LLM & NLP Solutions',
                'Topic Modeling',
                'RAG Apps',
                'BI Dashboards',


              ].map((item) => (
                <span key={`work-${item}`} className="work-pill">
                  <i
                    className={`${
                      item.toLowerCase().includes('time series') ? 'fas fa-chart-line' :
                      item.toLowerCase().includes('object') ? 'fas fa-crosshairs' :
                      item.toLowerCase().includes('cluster') ? 'fas fa-project-diagram' :
                      item.toLowerCase().includes('anomaly') ? 'fas fa-exclamation-triangle' :
                      item.toLowerCase().includes('recommend') ? 'fas fa-thumbs-up' :
                      item.toLowerCase().includes('nlp') ? 'fas fa-language' :
                      item.toLowerCase().includes('topic') ? 'fas fa-comments' :
                      item.toLowerCase().includes('rag') ? 'fas fa-book-open' :
                      item.toLowerCase().includes('dashboard') ? 'fas fa-chart-bar' :
                      item.toLowerCase().includes('classification') ? 'fas fa-check-circle' :
                      item.toLowerCase().includes('reinforcement') ? 'fas fa-dice' :
                      item.toLowerCase().includes('predict') ? 'fas fa-bullseye' :
                      'fas fa-circle'

                      
                    } pill-icon`}
                    aria-hidden="true"
                  ></i>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid" ref={statsRef}>
            <div className="stat-card">
              <div className="stat-number" data-target="25">0</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" data-target="5">0</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" data-target="15">0</div>
              <div className="stat-label">Technologies Mastered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" data-target="100">0</div>
              <div className="stat-label">Problems Solved</div>
            </div>
          </div>
        </div>
      </section> */}



      {/* Projects Section */}
      <section id="projects" className="projects-section" aria-labelledby="projects-title">
        <div className="projects-header-container">
          <div className="projects-header">
            <h2 id="projects-title" className="section-title">Projects</h2>
          </div>
        </div>
        <div className="container">
          {/* Enhanced Filter Buttons */}
          <div className="filter-container">
            <div className="filter-label">
              <i className="fas fa-filter"></i>
              Filter by Category:
            </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                <i className="fas fa-th"></i>
                All Projects
                <span className="project-count">({projects.length})</span>
              </button>
              {CATEGORY_FILTERS.map(({ key, label, icon, match }) => {
                const count = projects.filter(p => p.category.some(c => match.includes(c))).length;
                if (count === 0) return null;   // never render an empty filter
                return (
                  <button
                    key={key}
                    className={`filter-btn ${filter === key ? 'active' : ''}`}
                    onClick={() => setFilter(key)}
                  >
                    <i className={icon}></i>
                    {label}
                    <span className="project-count">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <Link 
                key={project.id} 
                to={`/project/${project.id}`} 
                className="project-card-link"
                onClick={() => trackEvent('project_click', 'Projects', project.title)}
              >
                <div className="project-card">
                  <div className="project-image-container">
                    {project.animation ? (
                      <LottieAnimation
                        animationPath={project.animation}
                        className="project-animation"
                        style={{ width: '100%', height: '100%' }}
                      />
                    ) : (
                      <img
                        className="project-image"
                        src={project.image}
                        alt={project.title}
                      />
                    )}
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">
                      {project.title}
                    </h3>
                    <p className="project-description">
                      {project.description}
                    </p>
                    <div className="project-tags">
                      {project.tags.map((tag, index) => (
                        <span key={index} className={`tag tag-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="container">
          <h2 id="contact-title" className="contact-title">Get In Touch!</h2>
          <div className="social-links">
            <a
              href="https://github.com/AmirMohammadiKarbalaei"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
              onClick={() => trackContactInteraction('github')}
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/amir-mohammadik/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
              onClick={() => trackContactInteraction('linkedin')}
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="mailto:a.mohammadikarbalaei@gmail.com"
              className="social-link"
              aria-label="Email Amir"
              onClick={() => trackContactInteraction('email')}
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Actions Floating Menu */}
      <div 
        className={`quick-actions ${quickActionsOpen ? 'active' : ''}`}
        onMouseEnter={() => {
          if (!isClickedOpen) {
            setQuickActionsOpen(true);
          }
        }}
        onMouseLeave={() => {
          if (!isClickedOpen) {
            setQuickActionsOpen(false);
          }
        }}
      >
        <div 
          className="quick-action-toggle"
          onClick={(e) => {
            e.stopPropagation();
            const newState = !quickActionsOpen;
            setQuickActionsOpen(newState);
            setIsClickedOpen(newState);
          }}
        >
          <i className="fas fa-plus"></i>
        </div>
        <div className="quick-actions-menu">
          <a href="#contact" className="quick-action-btn" title="Contact Me">
            <i className="fas fa-envelope"></i>
          </a>
          <Link to="/experience" className="quick-action-btn" title="My Experience">
            <i className="fas fa-user-tie"></i>
          </Link>
          <a href="#skills" className="quick-action-btn" title="My Skills">
            <i className="fas fa-code"></i>
          </a>
          <button 
            className="quick-action-btn" 
            title="Scroll to Top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
