import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import LottieAnimation from './LottieAnimation';
import Navigation from './Navigation';
import ParticleBackground from './ParticleBackground';
import Preloader from './Preloader';

const Home: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [currentTitle, setCurrentTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const titles = [
    'Data Scientist',
    'AI Engineer', 
    'Machine Learning Expert',
    'Analytics Professional'
  ];

  // Animation for skill bars
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar) => {
      const width = bar.getAttribute('data-width');
      if (width) {
        (bar as HTMLElement).style.width = width + '%';
      }
    });
  };

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
    let currentIndex = 0;
    let isDeleting = false;
    
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
      
      setTimeout(typeEffect, typeSpeed);
    };
    
    const timer = setTimeout(typeEffect, 1000);
    return () => clearTimeout(timer);
  }, [titleIndex, titles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations based on the section
            if (entry.target === skillsRef.current) {
              setTimeout(animateSkillBars, 500);
            }
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

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(filter));

  return (
    <div>
      <Preloader />
      <Navigation />
      <ParticleBackground />
      
      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar"></div>
      </div>
      
      {/* Header */}
      <header id="home" className="header">
        <img
          className="header-image"
          src="/media/data-science-new-banner.jpg"
          alt="Background"
        />
        <div className="header-overlay"></div>

        <div className="header-content">
          <div className="hero-text">
            <h1 className="header-title small-header-title">
              Hi, I'm <br />
              <span className="gradient-text">Amir Mohammadikarbalaei</span>
            </h1>
            <div className="typing-container">
              <span className="typing-prefix">I'm a </span>
              <span className="typing-text">{currentTitle}</span>
              <span className="cursor">|</span>
            </div>
            <p className="hero-description">
              Transforming data into actionable insights through advanced analytics, 
              machine learning, and AI solutions. Currently at Unilever, driving 
              customer operations excellence.
            </p>
            <div className="hero-buttons">
              <a href="#about" className="btn-primary">
                <i className="fas fa-user"></i>
                About Me
              </a>
              <a href="#projects" className="btn-secondary">
                <i className="fas fa-rocket"></i>
                View Projects
              </a>
            </div>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">5+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">30+</span>
              <span className="hero-stat-label">Projects</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">7</span>
              <span className="hero-stat-label">Companies</span>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
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
                  Port Sunlight, UK
                </div>
                <div className="profile-badge">
                  <i className="fas fa-briefcase"></i>
                  Unilever
                </div>
                <div className="profile-badge">
                  <i className="fas fa-calendar"></i>
                  5+ Years Exp
                </div>
              </div>
            </div>
            <div className="about-text">
              <div className="about-highlights">
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
              </div>
              <p className="about-description">
                I am a dedicated data scientist with a passion for uncovering
                meaningful insights from complex data. Currently working at <strong>Unilever</strong> as a 
                Customer Operations and Una Bot Analyst, I bring expertise in Python, SQL, and advanced 
                analytics to drive business excellence.
              </p>
              <p className="about-description">
                My journey spans from Y Combinator-funded healthcare AI startups to Fortune 500 companies, 
                covering predictive analytics, deep learning, and customer operations optimization. 
                I specialize in creating informative visualizations using Power BI and Tableau, 
                always focusing on using data to drive positive societal change.
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
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="skills-grid" ref={skillsRef}>
            <div className="skill-category">
              <h3>Programming & Data Processing</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">Python</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="95"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">SQL</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="93"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Pandas</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="92"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">NumPy</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="90"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">R</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="75"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">ETL Processes</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="88"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="skill-category">
              <h3>Machine Learning & AI</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">Scikit-Learn</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="92"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">TensorFlow</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="88"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">PyTorch</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="82"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Keras</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="85"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Hugging Face</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="85"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">OpenAI APIs</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="80"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Data Visualization & BI</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">Power BI</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="92"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Tableau</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="85"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Matplotlib</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="87"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Seaborn</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="88"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Plotly</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="83"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Microsoft Excel</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="90"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Database & Cloud Technologies</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">PostgreSQL</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="85"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">MySQL</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="82"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">MongoDB</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="75"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">AWS</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="78"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Docker</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="78"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Git</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="92"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Specialized Tools & Frameworks</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <span className="skill-name">Jupyter Notebooks</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="95"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Apache Spark</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="72"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Streamlit</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="85"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">NLTK/spaCy</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="80"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">MLflow</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="75"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Statistical Analysis</span>
                  <div className="skill-bar">
                    <div className="skill-progress" data-width="88"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
      </section>



      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="projects-header-container">
          <div className="projects-header">
            <h2 className="section-title">Projects</h2>
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
              <button
                className={`filter-btn ${filter === 'AI' ? 'active' : ''}`}
                onClick={() => setFilter('AI')}
              >
                <i className="fas fa-brain"></i>
                Artificial Intelligence
                <span className="project-count">({projects.filter(p => p.category.includes('AI')).length})</span>
              </button>
              <button
                className={`filter-btn ${filter === 'DA' ? 'active' : ''}`}
                onClick={() => setFilter('DA')}
              >
                <i className="fas fa-chart-bar"></i>
                Data Analysis
                <span className="project-count">({projects.filter(p => p.category.includes('DA')).length})</span>
              </button>
              <button
                className={`filter-btn ${filter === 'BI' ? 'active' : ''}`}
                onClick={() => setFilter('BI')}
              >
                <i className="fas fa-business-time"></i>
                Business Intelligence
                <span className="project-count">({projects.filter(p => p.category.includes('BI')).length})</span>
              </button>
            </div>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <Link key={project.id} to={`/project/${project.id}`} className="project-card-link">
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

      {/* Quick Actions Floating Menu */}
      <div className="quick-actions">
        <div className="quick-action-toggle">
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
