// Image optimization utility for SEO
export const getOptimizedImageProps = (src: string, alt: string, priority: boolean = false) => {
  return {
    src,
    alt,
    loading: priority ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
    // Add width and height if known for better CLS (Cumulative Layout Shift)
  };
};

// Generate structured data for projects
export const generateProjectSchema = (project: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "author": {
      "@type": "Person",
      "name": "Amir Mohammadi Karbalaei"
    },
    "dateCreated": "2024", // Update with actual project dates
    "keywords": project.tags.join(", "),
    "genre": project.category,
    "url": `https://amirmohammadikarbalai.github.io/DataScience.github.io/project/${project.id}`,
    "image": project.image,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Amir Mohammadi - Data Science Portfolio",
      "url": "https://amirmohammadikarbalai.github.io/DataScience.github.io/"
    }
  };
};

// Generate breadcrumb schema
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Meta tag validation
export const validateMetaTags = (title: string, description: string) => {
  const warnings = [];
  
  if (title.length > 60) {
    warnings.push(`Title too long: ${title.length} chars (recommended: 50-60)`);
  }
  
  if (description.length > 160) {
    warnings.push(`Description too long: ${description.length} chars (recommended: 150-160)`);
  }
  
  if (title.length < 30) {
    warnings.push(`Title too short: ${title.length} chars (recommended: 30-60)`);
  }
  
  if (description.length < 120) {
    warnings.push(`Description too short: ${description.length} chars (recommended: 120-160)`);
  }
  
  return warnings;
};