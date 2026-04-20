import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['tutorial', 'review', 'case-study', 'news']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    draft: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

export const collections = {
  'posts': posts,
};
