// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginFrames } from '@expressive-code/plugin-frames';

// https://astro.build/config
export default defineConfig({
  site: 'https://mosuoai.com',
  output: 'static',
  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers(), pluginFrames()],
      theme: 'dark-plus',
      themes: ['dark-plus'],
    }),
  ],
});
