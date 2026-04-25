import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 资讯集合（板块 1：资讯快报）
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['news', 'announcement', 'update']).default('news'),
    draft: z.boolean().default(false),
  }),
});

// 评测集合（板块 2：工具评测）
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    rating: z.number().min(1).max(5),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    verdict: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 教程集合（板块 3：部署教程）
const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tutorials' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['setup', 'skill-dev', 'memory', 'proactivity', 'integration']).default('setup'),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    duration: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 开源集合（板块 4：开源项目）
const opensource = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/opensource' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// 资源集合（板块 7：资源导航）
const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    icon: z.string().optional(),
    category: z.enum(['tools', 'frameworks', 'platforms', 'learning', 'community']).default('tools'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// 学习路径集合
const paths = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paths' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    color: z.string().default('#00D4E0'),
    duration: z.string().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    steps: z.array(z.object({
      title: z.string(),
      description: z.string().optional(),
      content: z.array(z.string()).optional(),
    })).optional(),
    draft: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

export const collections = {
  'news': news,
  'reviews': reviews,
  'tutorials': tutorials,
  'opensource': opensource,
  'resources': resources,
  'paths': paths,
};
