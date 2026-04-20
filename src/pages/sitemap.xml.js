import { getCollection } from 'astro:content';

export const GET = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft && !data.noindex);

  const siteUrl = 'https://mosuoai.com';

  const staticPages = [
    { url: siteUrl, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '1.0' },
    { url: `${siteUrl}/about`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
  ];

  const allTags = [...new Set(posts.flatMap((post) => post.data.tags))];
  const tagPages = allTags.map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.6',
  }));

  const postPages = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastmod: post.data.updatedDate
      ? post.data.updatedDate.toISOString()
      : post.data.pubDate.toISOString(),
    changefreq: 'weekly',
    priority: '0.7',
  }));

  const allPages = [...staticPages, ...tagPages, ...postPages];

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
