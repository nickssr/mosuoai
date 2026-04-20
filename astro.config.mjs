// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mosuoai.com',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
    },
  },
});
