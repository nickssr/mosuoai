import { getCollection } from 'astro:content';

export const GET = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 20);

  const siteUrl = 'https://mosuoai.com';
  const siteTitle = 'MosuoAI';
  const siteDescription = 'AI Agent 开发者的深度指南';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${sortedPosts
  .map(
    (post) => `    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/posts/${post.slug}</guid>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml' },
  });
};
