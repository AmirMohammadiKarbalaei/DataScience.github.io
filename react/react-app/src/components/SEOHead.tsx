import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Amir Mohammadikarbalaei - Data Scientist & AI Engineer",
  description = "Data Scientist and AI Engineer working on NLP, LLMs and machine learning at Unilever. MSc Data Science, University of Bath. Python, PyTorch, Hugging Face, SQL and MLflow.",
  keywords = [
    "Amir Mohammadikarbalaei",
    "Data Scientist", 
    "AI Engineer",
    "Machine Learning",
    "Deep Learning", 
    "Computer Vision",
    "Natural Language Processing",
    "Reinforcement Learning",
    "Python",
    "SQL",
    "Power BI",
    "Data Analytics",
    "Artificial Intelligence",
    "Portfolio",
    "Data Science Projects",
    "UK Data Scientist"
  ],
  image = "/media/data-science-new-banner.jpg",
  url = "https://amir-data.vercel.app/",
  type = "website",
  author = "Amir Mohammadikarbalaei",
  publishedTime,
  modifiedTime,
  schema
}) => {
  const siteUrl = url || "https://amir-data.vercel.app/";
  const fullImageUrl = image?.startsWith('http') ? image : `${siteUrl}${image?.replace(/^\//, '')}`;
  
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Amir Mohammadikarbalaei",
    "jobTitle": "Data Scientist & AI Engineer",
    "description": description,
    "url": siteUrl,
    "image": fullImageUrl,
    "sameAs": [
      "https://github.com/AmirMohammadiKarbalaei",
      "https://www.linkedin.com/in/amir-mohammadik/"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Unilever"
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "University of Bath"
      }
    ],
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
      "Power BI",
      "Data Analytics"
    ]
  };

  // react-helmet-async 2.x does not support React 19: its tags never reached
  // the document, so every page kept the homepage's title and canonical URL.
  // The tags are written directly instead. index.html carries static copies
  // of the same tags for link previews; these updates keep them in step with
  // the page the visitor is actually on.
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, content?: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!content) { el?.remove(); return; }
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords.join(', '));
    setMeta('name', 'author', author);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', siteUrl);
    setMeta('property', 'og:image', fullImageUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullImageUrl);
    setMeta('property', 'article:published_time', publishedTime);
    setMeta('property', 'article:modified_time', modifiedTime);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = siteUrl;

    let ld = document.head.querySelector<HTMLScriptElement>('script[data-seo="page"]');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.dataset.seo = 'page';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(schema || defaultSchema);
  });

  return null;
};

export default SEOHead;
