import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import ParticleBackground from './ParticleBackground';
import SEOHead from './SEOHead';

const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const items = Array.from(timeline.querySelectorAll<HTMLElement>('.timeline-item'));

    // Stagger by the item's own position, not its index within the observer
    // batch. Scrolling normally delivers one entry at a time, so batch index
    // was always 0 and nothing ever staggered.
    const positions = new Map(items.map((item, index) => [item, index]));
    let firstReveal = -1;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const position = positions.get(entry.target as HTMLElement) ?? 0;
          if (firstReveal === -1) firstReveal = position;
          const delay = Math.min(Math.max(position - firstReveal, 0), 4) * 120;
          window.setTimeout(() => entry.target.classList.add('visible'), delay);
          // Reveal once; without this the timeout re-fires on every re-entry.
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="experience-page">
      <SEOHead 
        title="Professional Experience - Amir Mohammadikarbalaei | Data Scientist Career Journey"
        description="Amir Mohammadikarbalaei's professional journey as a Data Scientist and AI Engineer, from a Y Combinator healthcare AI startup to NLP and machine learning at Unilever, alongside an MSc in Data Science at the University of Bath."
        keywords={[
          "Amir Mohammadikarbalaei Experience",
          "Data Scientist Career",
          "AI Engineer Experience", 
          "Unilever Data Scientist",
          "Y Combinator",
          "Healthcare AI",
          "Machine Learning Career",
          "Professional Journey",
          "Data Science Experience",
          "UK Data Scientist",
          "Career Timeline"
        ]}
        url="https://amir-data.vercel.app/experience"
      />
      <Navigation />
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="experience-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Professional Journey</h1>
            <p className="hero-subtitle">
              A timeline of my career progression in data science and analytics
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">4+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="timeline-section" aria-labelledby="timeline-heading">
        <div className="container">
          <h2 id="timeline-heading" className="sr-only">Career timeline</h2>
          <div className="timeline" ref={timelineRef}>
            <div className="timeline-item">
              <div className="timeline-date">Jun 2025 - Present</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i aria-hidden="true" className="fas fa-industry"></i>
                </div>
                <div className="job-header">
                  <h3>Customer Operations and Una Bot Analyst</h3>
                  <div className="achievement-badge current">Current Role</div>
                </div>
                <h4 className="company-name">Unilever · Full-time</h4>
                <div className="location">Port Sunlight, UK · Hybrid</div>
                <p>
                  NLP and analytics on millions of ServiceNow and Moveworks records in Unilever's
                  global Employee Technology function.
                </p>
                <ul className="responsibilities">
                  <li>Built an automated knowledge article validation system in Python using NLP, saving <strong>1,300 hours</strong> of manual review a year.</li>
                  <li>Developed a quality scoring framework across <strong>15,000+ knowledge articles</strong> using metadata, content signals and semantic similarity.</li>
                  <li>Built ticket volume forecasting with ensemble methods and automated weekly MLflow retraining, holding average error <strong>under 10%</strong>.</li>
                  <li>Drove <strong>12% agent escalation deflection</strong> by diagnosing user experience friction with the automation team.</li>
                </ul>
                <div className="timeline-tags">
                  <span className="timeline-tag">NLP</span>
                  <span className="timeline-tag">MLflow</span>
                  <span className="timeline-tag">Forecasting</span>
                  <span className="timeline-tag">ServiceNow</span>
                  <span className="timeline-tag">Process Optimisation</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Feb 2025 - May 2025</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i aria-hidden="true" className="fas fa-university"></i>
                </div>
                <h3>Research Assistant</h3>
                <h4 className="company-name">School of Management, University of Bath · Part-time</h4>
                <div className="location">Bath, UK</div>
                <ul className="responsibilities">
                  <li>Built the data pipeline for a School of Management research project analysing US patent text.</li>
                  <li>Took 700K+ USPTO records a year from raw bulk XML to a queryable database in one command, spread across CPU cores with batched writes to survive multi-year runs.</li>
                  <li>Wrote the classification stage with NLTK part-of-speech tagging and linguistic feature extraction, plus a labelled validation set built from an external benchmark to test it against.</li>
                </ul>
                <div className="timeline-tags">
                  <span className="timeline-tag">Natural Language Processing (NLP)</span>
                  <span className="timeline-tag">Data Pipelines</span>
                  <span className="timeline-tag">SQL</span>
                  <span className="timeline-tag">CLI Tooling</span>
                  <span className="timeline-tag">NLTK</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Nov 2024 - Dec 2024</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i aria-hidden="true" className="fas fa-rocket"></i>
                </div>
                <h3>Technical Lead</h3>
                <h4 className="company-name">Enterprise Bath · Part-time</h4>
                <div className="location">Bath, England, United Kingdom · Remote</div>
                <p>
                  Led the development of a secure, scalable attendance tracking system for the University of Bath's 
                  entrepreneurial community, enhancing student engagement and data accessibility.
                </p>
                <ul className="responsibilities">
                  <li>Designed an end‑to‑end data pipeline integrating multiple sources for automated attendance tracking.</li>
                  <li>Built a Power BI dashboard to provide real‑time engagement insights for stakeholders.</li>
                </ul>
                <Link to="/project/beat" className="timeline-project-link">
                  See the project <i aria-hidden="true" className="fas fa-arrow-right"></i>
                </Link>
                <div className="timeline-tags">
                  <span className="timeline-tag">Software Development</span>
                  <span className="timeline-tag">Project Delivery</span>
                  <span className="timeline-tag">Database Management</span>
                  <span className="timeline-tag">Microsoft Power BI</span>
                  <span className="timeline-tag">Shell Scripting</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Dec 2023 - Feb 2024</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i aria-hidden="true" className="fas fa-brain"></i>
                </div>
                <div className="job-header">
                  <h3>Data Scientist - AI Healthcare Applications</h3>
                  <div className="achievement-badge startup">Y Combinator</div>
                </div>
                <h4 className="company-name">Nightingaile, later Simplifine (Y Combinator) · Part-time</h4>
                <div className="location">San Francisco, California, United States · Remote</div>
                <p>
                  Built localised language models for healthcare professionals at an early-stage startup,
                  and was main developer on the Windows application that put them in front of doctors.
                </p>
                <ul className="responsibilities">
                  <li>Developed localised large language models tailored to healthcare professionals</li>
                  <li>Main developer for the Windows application supporting documentation, diagnosis and patient communication workflows</li>
                  <li>Contributed to the product that helped secure <strong>$500K</strong> in Y Combinator funding</li>
                  <li>Worked with multidisciplinary teams on user needs and clinical domain requirements</li>
                </ul>
                <div className="timeline-tags">
                  <span className="timeline-tag">Data Science</span>
                  <span className="timeline-tag">Large Language Models (LLM)</span>
                  <span className="timeline-tag">Software Development</span>
                  <span className="timeline-tag">Healthcare AI</span>
                  <span className="timeline-tag">Startups</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Oct 2023 - Jan 2024</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i aria-hidden="true" className="fas fa-chart-line"></i>
                </div>
                <div className="job-header">
                  <h3>Data Analytics Trainee</h3>
                 
                </div>
                <h4 className="company-name">Generation UK & Ireland · Full-time</h4>
                <div className="location">Leeds, England, United Kingdom · Remote</div>
                <p>
                  Comprehensive data analytics training program focusing on real-world business applications, 
                  team leadership, and mentoring responsibilities.
                </p>

                <ul className="responsibilities">
                  <li>Conducted comprehensive analysis of Olist dataset using Power BI and SQL, investigating customer satisfaction factors</li>
                  <li>Guided two teams in completing interim and final projects, achieving 100% scores through effective leadership</li>
                  <li>Collaborated with instructors to deliver lessons and mentored less experienced learners</li>
                  <li>Demonstrated expertise in data exploration and manipulation through Excel, SQL, Python, NumPy, Pandas, and Matplotlib</li>
                </ul>
                <div className="timeline-tags">
                  <span className="timeline-tag">Leadership</span>
                  <span className="timeline-tag">Python</span>
                  <span className="timeline-tag">SQL</span>
                  <span className="timeline-tag">Microsoft Power BI</span>
                  <span className="timeline-tag">Data Analytics</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Sep 2020 - Oct 2023</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i aria-hidden="true" className="fas fa-laptop-code"></i>
                </div>
                <h3>Independent Data Scientist</h3>
                <h4 className="company-name">Personal Projects</h4>
                <p>
                  Extensive portfolio of independent data science projects covering machine learning, 
                  deep learning, computer vision, and competitive programming challenges.
                </p>
                <ul className="responsibilities">
                  <li>Utilised time series forecasting and classification techniques to detect and analyse <Link to="/project/eeg-detection" className="timeline-inline-link">EEG biopotential signals</Link></li>
                  <li>Applied unsupervised learning to cluster retail customers enabling targeted marketing strategies</li>
                  <li>Implemented Q-learning to train autonomous agents for Gym environment games</li>
                  <li>Competed in the Kaggle <Link to="/project/detect-sleep-states" className="timeline-inline-link">"Detecting Sleep State"</Link> competition with thorough EDA and feature engineering</li>
                  <li>Developed advanced models including <Link to="/project/diabetes-classification" className="timeline-inline-link">diabetes classification</Link> and custom hand gesture recognition with YOLOv5</li>
                </ul>
                <div className="timeline-tags">
                  <span className="timeline-tag">Machine Learning</span>
                  <span className="timeline-tag">Computer Vision</span>
                  <span className="timeline-tag">Natural Language Processing</span>
                  <span className="timeline-tag">Reinforcement Learning</span>
                  <span className="timeline-tag">Predictive Modeling</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Education */}
      <section className="education-section" aria-labelledby="education-heading">
        <div className="container">
          <h2 id="education-heading" className="section-title">Education</h2>
          <div className="education-grid">
            <article className="education-card">
              <div className="education-icon">
                <i aria-hidden="true" className="fas fa-graduation-cap"></i>
              </div>
              <div className="education-body">
                <h3>MSc Data Science</h3>
                <h4 className="education-institution">University of Bath</h4>
                <p className="education-note">
                  Dissertation on efficient fine-tuning of large language models.
                </p>
              </div>
            </article>

            <article className="education-card">
              <div className="education-icon">
                <i aria-hidden="true" className="fas fa-cogs"></i>
              </div>
              <div className="education-body">
                <h3>
                  BEng (Hons) Mechanical Engineering
                  <span className="education-grade">First Class</span>
                </h3>
                <h4 className="education-institution">Newcastle University</h4>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Skills Evolution
      <section className="skills-evolution">
        <div className="container">
          <h2 className="section-title">Skills Evolution</h2>
          <div className="evolution-timeline">
            <div className="evolution-item">
              <div className="evolution-year">2019</div>
              <div className="evolution-skills">
                <span className="skill-badge basic">Engineering</span>
                <span className="skill-badge basic">Quality Control</span>
                <span className="skill-badge basic">Project Delivery</span>
              </div>
            </div>
            <div className="evolution-item">
              <div className="evolution-year">2020-2021</div>
              <div className="evolution-skills">
                <span className="skill-badge basic">Python</span>
                <span className="skill-badge basic">Machine Learning</span>
                <span className="skill-badge basic">Data Analysis</span>
                <span className="skill-badge basic">Computer Vision</span>
              </div>
            </div>
            <div className="evolution-item">
              <div className="evolution-year">2022-2023</div>
              <div className="evolution-skills">
                <span className="skill-badge intermediate">Deep Learning</span>
                <span className="skill-badge intermediate">NLP</span>
                <span className="skill-badge intermediate">Reinforcement Learning</span>
                <span className="skill-badge intermediate">Time Series</span>
              </div>
            </div>
            <div className="evolution-item">
              <div className="evolution-year">2024</div>
              <div className="evolution-skills">
                <span className="skill-badge advanced">Large Language Models</span>
                <span className="skill-badge advanced">Healthcare AI</span>
                <span className="skill-badge advanced">SQL</span>
                <span className="skill-badge advanced">Power BI</span>
                <span className="skill-badge advanced">Leadership</span>
              </div>
            </div>
            <div className="evolution-item">
              <div className="evolution-year">2025</div>
              <div className="evolution-skills">
                <span className="skill-badge expert">Database Management</span>
                <span className="skill-badge expert">Software Development</span>
                <span className="skill-badge expert">Customer Operations</span>
                <span className="skill-badge expert">AI Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        <button 
          className="floating-btn scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to Top"
        >
          <i aria-hidden="true" className="fas fa-arrow-up"></i>
        </button>
        <Link to="/" className="floating-btn back-home" title="Back to Home">
          <i aria-hidden="true" className="fas fa-home"></i>
        </Link>
      </div>

      {/* Back to Home */}
      <section className="back-to-home">
        <div className="container">
          <Link to="/" className="back-home-btn">
            <i aria-hidden="true" className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Experience;