import { getCollection } from 'astro:content';

export const GET = async () => {
  const news = await getCollection('news', ({ data }) => !data.draft);

  const sortedItems = news.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 20);

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
${sortedItems
  .map(
    (item) => `    <item>
      <title><![CDATA[${item.data.title}]]></title>
      <link>${siteUrl}/news/${item.id}</link>
      <guid isPermaLink="true">${siteUrl}/news/${item.id}</guid>
      <description><![CDATA[${item.data.description}]]></description>
      <pubDate>${item.data.pubDate.toUTCString()}</pubDate>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml' },
  });
};
