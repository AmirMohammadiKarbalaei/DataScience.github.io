import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = React.useMemo(() => [
    { id: 'home', label: 'Home', href: location.pathname === '/' ? '#home' : '/' },
    { id: 'about', label: 'About', href: location.pathname === '/' ? '#about' : '/#about' },
    { id: 'skills', label: 'Skills', href: location.pathname === '/' ? '#skills' : '/#skills' },
    { id: 'experience', label: 'Experience', href: '/experience' },
    { id: 'projects', label: 'Projects', href: location.pathname === '/' ? '#projects' : '/#projects' },
    { id: 'contact', label: 'Contact', href: location.pathname === '/' ? '#contact' : '/#contact' }
  ], [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a route link (starts with /) but not an anchor link, don't prevent default
    if (href.startsWith('/') && !href.includes('#')) {
      setIsMobileMenuOpen(false);
      return;
    }
    
    // If we're on a different page and trying to navigate to a home section, navigate to home first
    if (href.startsWith('/#') && location.pathname !== '/') {
      setIsMobileMenuOpen(false);
      window.location.href = href; // This will navigate to home page and then to the anchor
      return;
    }
    
    // Handle anchor links on the same page
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            <span className="brand-text">Amir</span>
            <span className="brand-dot">.</span>
            <span className="brand-domain">Data</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-menu desktop-nav">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                {item.href.startsWith('/') && !item.href.includes('#') ? (
                  <Link
                    to={item.href}
                    className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`nav-link ${
                      location.pathname === '/' && activeSection === item.id ? 'active' : 
                      location.pathname === item.href ? 'active' : ''
                    }`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="nav-actions">
            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-menu">
            {navItems.map((item) => (
              <li key={item.id} className="mobile-nav-item">
                {item.href.startsWith('/') && !item.href.includes('#') ? (
                  <Link
                    to={item.href}
                    className={`mobile-nav-link ${location.pathname === item.href ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`mobile-nav-link ${
                      location.pathname === '/' && activeSection === item.id ? 'active' : 
                      location.pathname === item.href ? 'active' : ''
                    }`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div 
          className="scroll-progress-bar"
          style={{
            width: `${(window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
          }}
        ></div>
      </div>

      {/* Floating Navigation Dots */}
      <div className="floating-nav">
        {navItems.filter(item => !item.href.startsWith('/')).map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`floating-nav-dot ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, item.href)}
            title={item.label}
          >
            <span className="dot-tooltip">{item.label}</span>
          </a>
        ))}
      </div>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${isScrolled ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
};

export default Navigation;