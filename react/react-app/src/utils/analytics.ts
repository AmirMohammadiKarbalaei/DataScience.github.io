// Google Analytics 4 Configuration
// Your actual Google Analytics 4 Measurement ID

export const GA_MEASUREMENT_ID = 'G-FQ3XRNKMPF'; // Your GA4 Measurement ID

// Google Analytics 4 integration
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4 - Using your exact tracking code
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);

    // Make gtag available globally
    (window as any).gtag = (...args: any[]) => {
      (window as any).dataLayer.push(args);
    };
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track project views
export const trackProjectView = (projectId: string, projectTitle: string) => {
  trackEvent('view_project', 'Projects', projectTitle);
  gtag('event', 'page_view', {
    page_title: `${projectTitle} - Project Detail`,
    page_location: `${window.location.origin}/project/${projectId}`,
    content_group1: 'Projects',
  });
};

// Track contact interactions
export const trackContactInteraction = (method: 'email' | 'linkedin' | 'github') => {
  trackEvent('contact_click', 'Contact', method);
};