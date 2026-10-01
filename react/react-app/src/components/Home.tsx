import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { DOMAINS } from '../data/domains';
import ProjectCard from './ProjectCard';
import Navigation from './Navigation';
import ParticleBackground from './ParticleBackground';
import SEOHead from './SEOHead';
import { trackContactInteraction, trackEvent } from '../utils/analytics';

const SKILL_GROUPS: { label: string; skills: string[] }[] = [
  { label: 'Core Data & ML',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'XGBoost/LightGBM', 'Feature Engineering'] },
  { label: 'Deep Learning & LLMs',
    skills: ['PyTorch', 'Hugging Face Transformers', 'GLiNER', 'Ollama', 'Gemini API', 'RAG & Embeddings', 'Zero-shot NER', 'spaCy', 'NLTK', 'Computer Vision (OpenCV)'] },
  { label: 'Engineering & Delivery',
    skills: ['PostgreSQL', 'SQLAlchemy', 'Docker', 'GitHub Actions CI', 'pytest', 'CLI Tooling', 'Streamlit'] },
  { label: 'Analytics, BI & Visualisation',
    skills: ['A/B Testing & Experimentation', 'Statistical Inference', 'Model Explainability (SHAP/LIME)', 'Power BI', 'Matplotlib', 'Seaborn'] },
];

const Home: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [currentTitle, setCurrentTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const aboutRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstFilter = useRef(true);

  // useMemo keeps the array identity stable across renders. Without it the typing
  // effect below re-runs on every state tick and spawns overlapping timer chains.
  // useMemo keeps the array identity stable across renders. Without it the typing
  // effect below re-runs on every state tick and spawns overlapping timer chains.
  const titles = useMemo(
    () => ['a Data Scientist', 'a Data Analyst', 'an ML Engineer'],
    []
  );

  // Typing animation effect. Deliberately runs even under reduced motion: the
  // cycling roles are a confirmed part of the hero, and a frozen first role
  // read as broken. Screen readers get the full list from a hidden sentence.
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
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const refs = [aboutRef];
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

  const activeFilter = DOMAINS.find(f => f.key === filter);
  const filteredProjects = !activeFilter
    ? projects
    : projects.filter(p => p.category.some(c => activeFilter.match.includes(c)));

  // When a filter changes, the cards that remain settle into place one after
  // another, so the grid visibly answers the choice. Web Animations rather than
  // remounting, so Lottie cards aren't torn down and reloaded. Skipped on first
  // render and under reduced motion.
  useEffect(() => {
    if (isFirstFilter.current) {
      isFirstFilter.current = false;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.project-card');
    cards?.forEach((card, i) => {
      card.animate(
        [
          { opacity: 0, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 420, delay: Math.min(i, 8) * 45, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' }
      );
    });
  }, [filter]);

  // The address is shown in full so it can be copied; this makes that one
  // click. On failure the address is still on screen to select by hand.
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('a.mohammadikarbalaei@gmail.com');
      setCopyState('copied');
      trackEvent('contact_copy', 'Contact', 'email');
    } catch {
      setCopyState('failed');
    }
    window.setTimeout(() => setCopyState('idle'), 2400);
  };

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
      <Navigation />
      <ParticleBackground />
      <main id="main">

      {/* Header */}
      {/* No stock banner: the hero sits on the site's own particle field and
          grid, so the name, title and proof line are the only things to read.
          The banner image is still the link-preview image in index.html. */}
      <header id="home" className="header">

        <div className="header-content">
          <div className="hero-text">
            <h1 className="header-title hero-name">
              Amir Mohammadikarbalaei
            </h1>
            {/* The typed role changes every few seconds; screen readers get the
                full list once instead of hearing every keystroke. */}
            <p className="visually-hidden">
              I'm a Data Scientist, a Data Analyst and an ML Engineer.
            </p>
            <div className="typing-container" aria-hidden="true">
              <span className="typing-prefix">I'm </span>
              {/* Cursor inside the typed span so it sits right after the last
                  letter instead of at the far edge of the reserved width. */}
              <span className="typing-text">
                {currentTitle}
                <span className="cursor">|</span>
              </span>
            </div>
            <p className="hero-description">
              I build machine learning, NLP and LLM systems. At Unilever I work on
              NLP and analytics for the employee-facing chatbot and service desk.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">
                <i className="fas fa-arrow-down" aria-hidden="true"></i>
                View projects
              </a>
              <a href="#contact" className="btn-secondary">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                Contact
              </a>
            </div>
          </div>
        </div>
      </header>

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
            <div className="filter-buttons" role="group" aria-label="Filter projects by domain">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
              >
                All projects
              </button>
              {DOMAINS.map(({ key, label, match }) => {
                const count = projects.filter(p => p.category.some(c => match.includes(c))).length;
                if (count === 0) return null;   // never render an empty filter
                return (
                  <button
                    key={key}
                    className={`filter-btn domain-${key} ${filter === key ? 'active' : ''}`}
                    onClick={() => setFilter(key)}
                    aria-pressed={filter === key}
                  >
                    {/* The swatch is the colour key: the same square, in the
                        same hue, as the domain label on the cards it shows. */}
                    <span className="domain-key" aria-hidden="true"></span>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="projects-grid" ref={gridRef}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="container">
          <h2 id="about-title" className="section-title">About</h2>
          <div className="about-content" ref={aboutRef}>
            <div className="profile-container">
              <img
                className="profile-image"
                src="/media/profile.jpg"
                alt="Portrait of Amir Mohammadikarbalaei"
              />
              <div className="profile-badges">
                <div className="profile-badge">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  Liverpool, UK
                </div>
              </div>
            </div>
            <div className="about-text">
              <p className="about-description">
                I build data and ML systems that make it out of the notebook and
                into daily use.
              </p>
              <p className="about-description">
                Today that means NLP and forecasting at <strong>Unilever</strong>, where
                one system I built saves over a thousand hours of manual review a
                year. Before that, I built LLM tools for doctors at
                a <strong>Y Combinator</strong> startup and data pipelines for research
                at the <strong>University of Bath</strong>.
              </p>
              <p className="about-description">
                Trained as a mechanical engineer, I judge a model by how it holds
                up in use rather than how it scores in a notebook.
              </p>
              <div className="about-cta">
                <Link to="/experience" className="btn-outline">
                  <i className="fas fa-briefcase" aria-hidden="true"></i>
                  See full experience
                </Link>
                <a href="#contact" className="btn-text">
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  Contact me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section" aria-label="Skills">
        <div className="container">
          <h2 className="section-title">Skills &amp; tools</h2>
          {/* One instrument panel read as a spec sheet: a row per category,
              the label in the mono prompt voice, the tools beside it as plain
              text. Bordered pills made ~35 separate objects compete. */}
          <div className="skills-sheet">
            {SKILL_GROUPS.map(({ label, skills }) => (
              <div key={label} className="skills-row">
                <h3 className="skills-row-label">{label}</h3>
                <ul className="skills-list">
                  {skills.map(s => (
                    <li key={`${label}-${s}`}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="container">
          <h2 id="contact-title" className="contact-title">Contact</h2>
          {/* The address is shown in full so it can be read or copied without
              relying on a mail client being set up. */}
          <a
            href="mailto:a.mohammadikarbalaei@gmail.com"
            className="btn-primary contact-email"
            onClick={() => trackContactInteraction('email')}
          >
            <i className="fas fa-envelope" aria-hidden="true"></i>
            a.mohammadikarbalaei@gmail.com
          </a>
          <div className="copy-email-row">
            <button
              type="button"
              className={`copy-email ${copyState}`}
              onClick={copyEmail}
            >
              <i
                className={copyState === 'copied' ? 'fas fa-check' : 'far fa-copy'}
                aria-hidden="true"
              ></i>
              Copy address
            </button>
            <span className="copy-email-readout" role="status">
              {/* Keyed so each new readout fades in; the live region itself
                  stays mounted so screen readers keep announcing it. */}
              {copyState !== 'idle' && (
                <span key={copyState} className="readout-text">
                  {copyState === 'copied' ? 'address copied' : "couldn't copy: select the address above instead"}
                </span>
              )}
            </span>
          </div>
          <div className="social-links">
            <a
              href="https://github.com/AmirMohammadiKarbalaei"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              onClick={() => trackContactInteraction('github')}
            >
              <i className="fab fa-github" aria-hidden="true"></i>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/amir-mohammadik/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              onClick={() => trackContactInteraction('linkedin')}
            >
              <i className="fab fa-linkedin" aria-hidden="true"></i>
              LinkedIn
            </a>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
};

export default Home;
