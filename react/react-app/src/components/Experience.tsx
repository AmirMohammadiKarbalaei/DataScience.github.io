import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import ParticleBackground from './ParticleBackground';
import SEOHead from './SEOHead';
import { DOMAINS } from '../data/domains';

// Roles span several domains (NLP is part of ML, forecasting sits inside an
// analytics role), so colour marks individual skills rather than whole roles.
// Each tag takes the hue of the domain it names, by the same rule and hues as
// the project cards. Tags outside the ML domains (tools, context, soft
// skills) stay neutral, so a hue always means a domain.
const TAG_DOMAINS: Record<string, string> = {
  'NLP': 'nlp',
  'Natural Language Processing': 'nlp',
  'Natural Language Processing (NLP)': 'nlp',
  'NLTK': 'nlp',
  'Large Language Models (LLM)': 'nlp',
  'Machine Learning': 'ml',
  'MLflow': 'ml',
  'Predictive Modelling': 'ml',
  'Computer Vision': 'ml',
  'Forecasting': 'ts',
  'Reinforcement Learning': 'ml',
  'SQL': 'data',
  'Microsoft Power BI': 'data',
  'Data Pipelines': 'data',
  'Database Management': 'data',
  'Data Analytics': 'data',
};

const RoleTag: React.FC<{ label: string }> = ({ label }) => {
  const key = TAG_DOMAINS[label];
  return <span className={`timeline-tag${key ? ` domain-${key}` : ''}`}>{label}</span>;
};

// The key lists only the domains the tags actually use, in DOMAINS order.
const TAG_KEY = DOMAINS.filter(d => Object.values(TAG_DOMAINS).includes(d.key));

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
        title="Experience | Amir Mohammadikarbalaei"
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
      <main id="main">
      
      {/* Hero Section */}
      <section className="experience-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Experience</h1>
            <p className="hero-subtitle">
              Roles, most recent first, with education below. Skill tags are coloured by domain.
            </p>
            <ul className="domain-legend" aria-label="Colour key for the skill tags">
              {TAG_KEY.map(domain => (
                <li key={domain.key} className={`project-domain domain-${domain.key}`}>{domain.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="timeline-section" aria-labelledby="timeline-heading">
        <div className="container">
          <h2 id="timeline-heading" className="sr-only">Career timeline</h2>
          <div className="timeline" ref={timelineRef}>
            <div className="timeline-item">
              <div className="timeline-date">Sep 2026 – Present</div>
              <div className="timeline-content">
                <div className="company-logo has-mark">
                  <img src="/media/logos/unilever.svg" alt="" />
                </div>
                <div className="job-header">
                  <h3>Data Expertise Analyst</h3>
                  <div className="achievement-badge current">Current role</div>
                </div>
                <p className="company-name">Unilever · Full-time</p>
                <div className="location">Port Sunlight, UK · Hybrid</div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Jun 2025 – Sep 2026</div>
              <div className="timeline-content">
                <div className="company-logo has-mark">
                  <img src="/media/logos/unilever.svg" alt="" />
                </div>
                <div className="job-header">
                  <h3>Customer Operations and Una Bot Analyst</h3>
                </div>
                <p className="company-name">Unilever · Full-time</p>
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
                  <RoleTag label="NLP" />
                  <RoleTag label="MLflow" />
                  <RoleTag label="Forecasting" />
                  <RoleTag label="ServiceNow" />
                  <RoleTag label="Process Optimisation" />
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Feb 2025 – May 2025</div>
              <div className="timeline-content">
                <div className="company-logo has-mark">
                  <img src="/media/logos/university-of-bath.svg" alt="" />
                </div>
                <h3>Research Assistant</h3>
                <p className="company-name">School of Management, University of Bath · Part-time</p>
                <div className="location">Bath, UK</div>
                <ul className="responsibilities">
                  <li>Built the data pipeline for a School of Management research project analysing US patent text.</li>
                  <li>Took 700K+ USPTO records a year from raw bulk XML to a queryable database in one command, spread across CPU cores with batched writes to survive multi-year runs.</li>
                  <li>Wrote the classification stage with NLTK part-of-speech tagging and linguistic feature extraction, plus a labelled validation set built from an external benchmark to test it against.</li>
                </ul>
                <Link to="/project/patent-text-pipeline" className="timeline-project-link">
                  See the project <i aria-hidden="true" className="fas fa-arrow-right"></i>
                </Link>
                <div className="timeline-tags">
                  <RoleTag label="Natural Language Processing (NLP)" />
                  <RoleTag label="Data Pipelines" />
                  <RoleTag label="SQL" />
                  <RoleTag label="CLI Tooling" />
                  <RoleTag label="NLTK" />
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Nov 2024 – Dec 2024</div>
              <div className="timeline-content">
                <div className="company-logo has-mark">
                  <img src="/media/logos/enterprise-bath.png" alt="" />
                </div>
                <h3>Technical Lead</h3>
                <p className="company-name">Enterprise Bath · Part-time</p>
                <div className="location">Bath, UK · Remote</div>
                <p>
                  Led the development of a secure attendance tracking system for the University of Bath's
                  entrepreneurial community.
                </p>
                <ul className="responsibilities">
                  <li>Designed an end‑to‑end data pipeline integrating multiple sources for automated attendance tracking.</li>
                  <li>Built a Power BI dashboard to provide real‑time engagement insights for stakeholders.</li>
                </ul>
                <Link to="/project/beat" className="timeline-project-link">
                  See the project <i aria-hidden="true" className="fas fa-arrow-right"></i>
                </Link>
                <div className="timeline-tags">
                  <RoleTag label="Software Development" />
                  <RoleTag label="Project Delivery" />
                  <RoleTag label="Database Management" />
                  <RoleTag label="Microsoft Power BI" />
                  <RoleTag label="Shell Scripting" />
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Dec 2023 – Feb 2024</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i aria-hidden="true" className="fas fa-brain"></i>
                </div>
                <div className="job-header">
                  <h3>Data Scientist - AI Healthcare Applications</h3>
                  <div className="achievement-badge startup">Y Combinator</div>
                </div>
                <p className="company-name">Nightingaile, later Simplifine (Y Combinator) · Part-time</p>
                <div className="location">San Francisco, US · Remote</div>
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
                  <RoleTag label="Data Science" />
                  <RoleTag label="Large Language Models (LLM)" />
                  <RoleTag label="Software Development" />
                  <RoleTag label="Healthcare AI" />
                  <RoleTag label="Startups" />
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Oct 2023 – Jan 2024</div>
              <div className="timeline-content">
                <div className="company-logo has-mark">
                  <img src="/media/logos/generation-uk.svg" alt="" />
                </div>
                <div className="job-header">
                  <h3>Data Analytics Trainee</h3>
                 
                </div>
                <p className="company-name">Generation UK & Ireland · Full-time</p>
                <div className="location">Leeds, UK · Remote</div>
                <p>
                  Data analytics training programme covering business applications, team leadership
                  and mentoring.
                </p>

                <ul className="responsibilities">
                  <li>Analysed the Olist dataset with Power BI and SQL to find what drives customer satisfaction</li>
                  <li>Led two teams through their interim and final projects; both scored 100%</li>
                  <li>Co-delivered lessons with the instructors and mentored less experienced learners</li>
                  <li>Explored and prepared data with Excel, SQL, Python, NumPy, Pandas and Matplotlib</li>
                </ul>
                <div className="timeline-tags">
                  <RoleTag label="Leadership" />
                  <RoleTag label="Python" />
                  <RoleTag label="SQL" />
                  <RoleTag label="Microsoft Power BI" />
                  <RoleTag label="Data Analytics" />
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Sep 2020 – Oct 2023</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i aria-hidden="true" className="fas fa-laptop-code"></i>
                </div>
                <h3>Independent Data Scientist</h3>
                <p className="company-name">Personal Projects</p>
                <p>
                  Independent data science projects covering machine learning, deep learning, computer
                  vision and competitive programming challenges.
                </p>
                <ul className="responsibilities">
                  <li>Utilised time series forecasting and classification techniques to detect and analyse <Link to="/project/eeg-detection" className="timeline-inline-link">EEG biopotential signals</Link></li>
                  <li>Applied unsupervised learning to cluster retail customers enabling targeted marketing strategies</li>
                  <li>Implemented Q-learning to train autonomous agents for Gym environment games</li>
                  <li>Competed in the Kaggle <Link to="/project/detect-sleep-states" className="timeline-inline-link">"Detecting Sleep State"</Link> competition with thorough EDA and feature engineering</li>
                  <li>Developed advanced models including diabetes classification and custom hand gesture recognition with YOLOv5</li>
                </ul>
                <div className="timeline-tags">
                  <RoleTag label="Machine Learning" />
                  <RoleTag label="Computer Vision" />
                  <RoleTag label="Natural Language Processing" />
                  <RoleTag label="Reinforcement Learning" />
                  <RoleTag label="Predictive Modelling" />
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
              <div className="education-icon has-mark">
                <img src="/media/logos/university-of-bath-crest.svg" alt="" />
              </div>
              <div className="education-body">
                <h3>MSc Data Science</h3>
                <p className="education-institution">University of Bath</p>
                <p className="education-note">
                  Dissertation on efficient fine-tuning of large language models.
                </p>
              </div>
            </article>

            <article className="education-card">
              <div className="education-icon has-mark">
                <img src="/media/logos/newcastle-university-shield.svg" alt="" />
              </div>
              <div className="education-body">
                <h3>
                  BEng (Hons) Mechanical Engineering
                  <span className="education-grade">First Class</span>
                </h3>
                <p className="education-institution">Newcastle University</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* The page ends on the next step for a reader who has just read the
          whole career: getting in touch. Home is always one tap away in the
          nav. Same labelled links as the project pages. */}
      <section id="contact" className="contact-section" aria-labelledby="experience-contact-title">
        <div className="container">
          <h2 id="experience-contact-title" className="contact-title">Contact</h2>
          <div className="social-links">
            <a href="mailto:a.mohammadikarbalaei@gmail.com" className="social-link">
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
    </div>
  );
};

export default Experience;