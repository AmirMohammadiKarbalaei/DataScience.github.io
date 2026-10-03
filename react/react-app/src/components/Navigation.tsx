import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Jump instead of gliding when the visitor has asked for reduced motion.
const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const navItems = React.useMemo(() => [
    { id: 'home', label: 'Home', href: location.pathname === '/' ? '#home' : '/' },
    { id: 'projects', label: 'Projects', href: location.pathname === '/' ? '#projects' : '/#projects' },
    { id: 'about', label: 'About', href: location.pathname === '/' ? '#about' : '/#about' },
    { id: 'skills', label: 'Skills', href: location.pathname === '/' ? '#skills' : '/#skills' },
    { id: 'experience', label: 'Experience', href: '/experience' },
    { id: 'contact', label: 'Contact', href: location.pathname === '/' ? '#contact' : '/#contact' }
  ], [location.pathname]);

  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      // Written straight to the element: a React state update per scroll event
      // would re-render the whole nav dozens of times a second.
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      // Active section is the last one whose top has passed a scan line just
      // under the fixed navbar. Only one can match, so two links are never lit
      // at once. At the very bottom the last section wins even if it is too
      // short to reach the line.
      const sections = navItems
        .map(item => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);
      const atBottom = scrollable - window.scrollY < 2;
      let current = sections[0]?.id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= 120) current = el.id;
      }
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // A route link (Experience) versus a homepage section link. Exactly one link
  // is active: the current route, or on the homepage the section in view.
  // The same answer drives the underline and aria-current, so screen readers
  // hear which page or section is current.
  const isRoute = (href: string) => href.startsWith('/') && !href.includes('#');
  const isActive = (item: { id: string; href: string }) =>
    isRoute(item.href)
      ? location.pathname === item.href
      : (location.pathname === '/' && activeSection === item.id) || location.pathname === item.href;

  // An open menu closes on Escape (focus returns to the button that opened
  // it) and on a tap anywhere outside the bar.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setIsMobileMenuOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [isMobileMenuOpen]);

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
          behavior: scrollBehavior()
        });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav ref={navRef} className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-brand" aria-label="Amir Mohammadikarbalaei, home">
            <span className="brand-full">Amir Mohammadikarbalaei</span>
            <span className="brand-short" aria-hidden="true">Amir</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-menu desktop-nav">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                {isRoute(item.href) ? (
                  <Link
                    to={item.href}
                    className={`nav-link ${isActive(item) ? 'active' : ''}`}
                    aria-current={isActive(item) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`nav-link ${isActive(item) ? 'active' : ''}`}
                    aria-current={isActive(item) ? 'location' : undefined}
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
              ref={toggleRef}
              type="button"
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div id="mobile-nav" className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-menu">
            {navItems.map((item) => (
              <li key={item.id} className="mobile-nav-item">
                {isRoute(item.href) ? (
                  <Link
                    to={item.href}
                    className={`mobile-nav-link ${isActive(item) ? 'active' : ''}`}
                    aria-current={isActive(item) ? 'page' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`mobile-nav-link ${isActive(item) ? 'active' : ''}`}
                    aria-current={isActive(item) ? 'location' : undefined}
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
      <div className="scroll-progress" aria-hidden="true">
        <div ref={progressRef} className="scroll-progress-bar"></div>
      </div>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${isScrolled ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
        aria-label="Back to top"
      >
        <i className="fas fa-chevron-up" aria-hidden="true"></i>
      </button>
    </>
  );
};

export default Navigation;