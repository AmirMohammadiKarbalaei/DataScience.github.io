import React from 'react';
import { Helmet } from 'react-helmet-async';

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

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={`${author} - Data Scientist Portfolio`} />
      <meta property="og:site_name" content="Amir Mohammadikarbalaei - Data Science Portfolio" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional Meta Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;