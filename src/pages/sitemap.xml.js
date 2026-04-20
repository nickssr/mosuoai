import { getCollection } from 'astro:content';

export const GET = async () => {
  // 获取所有内容集合
  const news = await getCollection('news', ({ data }) => !data.draft);
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const tutorials = await getCollection('tutorials', ({ data }) => !data.draft);
  const resources = await getCollection('resources', ({ data }) => !data.draft);

  const siteUrl = 'https://mosuoai.com';

  // 静态页面
  const staticPages = [
    { url: siteUrl, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '1.0' },
    { url: `${siteUrl}/about`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
    { url: `${siteUrl}/news`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.9' },
    { url: `${siteUrl}/reviews`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
    { url: `${siteUrl}/tutorials`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
    { url: `${siteUrl}/resources`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
  ];

  // 资讯文章
  const newsPages = news.map((item) => ({
    url: `${siteUrl}/news/${item.id}`,
    lastmod: item.data.updatedDate
      ? item.data.updatedDate.toISOString()
      : item.data.pubDate.toISOString(),
    changefreq: 'weekly',
    priority: '0.7',
  }));

  // 评测文章
  const reviewsPages = reviews.map((item) => ({
    url: `${siteUrl}/reviews/${item.id}`,
    lastmod: item.data.updatedDate
      ? item.data.updatedDate.toISOString()
      : item.data.pubDate.toISOString(),
    changefreq: 'weekly',
    priority: '0.7',
  }));

  // 教程文章
  const tutorialsPages = tutorials.map((item) => ({
    url: `${siteUrl}/tutorials/${item.id}`,
    lastmod: item.data.updatedDate
      ? item.data.updatedDate.toISOString()
      : item.data.pubDate.toISOString(),
    changefreq: 'weekly',
    priority: '0.7',
  }));

  // 资源链接
  const resourcesPages = resources.map((item) => ({
    url: `${siteUrl}/resources/${item.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.6',
  }));

  const allPages = [...staticPages, ...newsPages, ...reviewsPages, ...tutorialsPages, ...resourcesPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
