import { defineCollection, z } from 'astro:content';

const tutorials = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('老李'),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('老李'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'tutorials': tutorials,
  'blog': blog,
};
