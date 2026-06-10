import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    planetColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  }),
});

export const collections = { blog };
