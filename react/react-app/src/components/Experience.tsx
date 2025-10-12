import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import ParticleBackground from './ParticleBackground';

const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 200); // Staggered animation
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      timelineItems.forEach((item) => observer.observe(item));
    }

    // Add scroll progress functionality
    const handleScroll = () => {
      const timeline = timelineRef.current?.querySelector('.timeline::before') as HTMLElement;
      if (timeline) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        timeline.style.background = `linear-gradient(180deg, #00d4ff 0%, #5b73f0 ${Math.min(scrollPercent, 100)}%, transparent ${Math.min(scrollPercent, 100)}%)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timelineRef.current) {
        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
        timelineItems.forEach((item) => observer.unobserve(item));
      }
    };
  }, []);

  return (
    <div className="experience-page">
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
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              {/* <div className="stat-item">
                <span className="stat-number">7</span>
                <span className="stat-label">Companies</span>
              </div> */}
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="timeline" ref={timelineRef}>
            <div className="timeline-item">
              <div className="timeline-date">Jun 2025 - Present</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i className="fas fa-industry"></i>
                </div>
                <div className="job-header">
                  <h3>Customer Operations and Una Bot Analyst</h3>
                  <div className="achievement-badge current">Current Role</div>
                </div>
                <h4 className="company-name">Unilever · Full-time</h4>
                <div className="location">Port Sunlight, UK · Hybrid</div>
                <p>
                  Working at one of the world's leading consumer goods companies, focusing on customer operations 
                  and AI bot analytics to enhance customer experience and operational efficiency.
                </p>
                <div className="timeline-tags">
                  <span className="timeline-tag">Customer Operations</span>
                  <span className="timeline-tag">AI Analytics</span>
                  <span className="timeline-tag">Process Optimisation</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Feb 2025 - May 2025</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i className="fas fa-university"></i>
                </div>
                <h3>Research Assistant</h3>
                <h4 className="company-name">School of Management, University of Bath · Part-time</h4>
                <div className="location">Bath, UK</div>
                <ul className="responsibilities">
                  <li>Built Python tools to automate large-scale data extraction and processing.</li>
                  <li>Applied NLP to structure unstructured text into analysis‑ready datasets.</li>
                  <li>Partnered with researchers to design pipelines and validate data quality.</li>
                </ul>
                <div className="timeline-tags">
                  <span className="timeline-tag">Natural Language Processing (NLP)</span>
                  <span className="timeline-tag">Machine Learning</span>
                  <span className="timeline-tag">Data Science</span>
                  <span className="timeline-tag">Data Collection</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Nov 2024 - Dec 2024</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i className="fas fa-rocket"></i>
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
                  <i className="fas fa-brain"></i>
                </div>
                <div className="job-header">
                  <h3>Data Scientist - AI Healthcare Applications</h3>
                  <div className="achievement-badge startup">Y Combinator</div>
                </div>
                <h4 className="company-name">Simplifine (YC S24) · Part-time</h4>
                <div className="location">San Francisco, California, United States · Remote</div>
                <p>
                  Worked in a dynamic Y Combinator-funded startup environment, developing cutting-edge localised 
                  language models (LLMs) specifically designed for healthcare professionals. Led Windows application 
                  development that significantly improved documentation, diagnosis, and patient communication processes.
                </p>
             
                <ul className="responsibilities">
                  <li>Developed cutting-edge localised language models (LLMs) for healthcare professionals</li>
                  <li>Main developer for Windows application improving documentation and diagnosis processes</li>
                  <li>Contributed to securing Y Combinator funding and positioning startup for future success</li>
                  <li>Enhanced patient communication processes for doctors through AI-powered solutions</li>
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
                  <i className="fas fa-chart-line"></i>
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
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h3>Independent Data Scientist</h3>
                <h4 className="company-name">Personal Projects</h4>
                <p>
                  Extensive portfolio of independent data science projects covering machine learning, 
                  deep learning, computer vision, and competitive programming challenges.
                </p>
                <ul className="responsibilities">
                  <li>Utilised time series forecasting and classification techniques to detect and analyse EEG biopotential signals</li>
                  <li>Applied unsupervised learning to cluster retail customers enabling targeted marketing strategies</li>
                  <li>Implemented Q-learning to train autonomous agents for Gym environment games</li>
                  <li>Competed in Kaggle "Detecting Sleep State" competition with thorough EDA and feature engineering</li>
                  <li>Developed advanced models including diabetes classification and custom hand gesture recognition with YOLO5</li>
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

            <div className="timeline-item">
              <div className="timeline-date">Jul 2019 - Sep 2019</div>
              <div className="timeline-content">
                <div className="company-logo">
                  <i className="fas fa-cogs"></i>
                </div>
                <h3>Student Mechanical Engineer</h3>
                <h4 className="company-name">AVID Technology Group Limited</h4>
                <div className="location">Cramlington</div>
                <p>
                  Engineering internship focusing on software review, manufacturing quality control, 
                  and product lifecycle management.
                </p>
                <ul className="responsibilities">
                  <li>Conducted software review of OpenModelica and Xcos Scilab for modeling and simulating dynamic systems</li>
                  <li>Enhanced product longevity by flagging significant manufacturing concern regarding impeller surface finish</li>
                  <li>Gained valuable experience in project and product life cycle management</li>
                </ul>
                <div className="timeline-tags">
                  <span className="timeline-tag">Project Delivery</span>
                  <span className="timeline-tag">Quality Control</span>
                  <span className="timeline-tag">Engineering</span>
                  <span className="timeline-tag">Process Improvement</span>
                </div>
              </div>
            </div>
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
          <i className="fas fa-arrow-up"></i>
        </button>
        <Link to="/" className="floating-btn back-home" title="Back to Home">
          <i className="fas fa-home"></i>
        </Link>
      </div>

      {/* Back to Home */}
      <section className="back-to-home">
        <div className="container">
          <Link to="/" className="back-home-btn">
            <i className="fas fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Experience;