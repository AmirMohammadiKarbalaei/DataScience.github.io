import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Track page view in Google Analytics
    trackPageView(pathname);
  }, [pathname]);

  return null;
};

export default ScrollToTop;