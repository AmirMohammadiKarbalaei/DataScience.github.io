import { projects } from '../data/projects';

export const generateSitemap = () => {
  const baseUrl = 'https://amirmohammadikarbalai.github.io/DataScience.github.io';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    {
      loc: baseUrl + '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: baseUrl + '/experience',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    ...projects.map(project => ({
      loc: `${baseUrl}/project/${project.id}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = () => {
  const baseUrl = 'https://amirmohammadikarbalai.github.io/DataScience.github.io';
  
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
};