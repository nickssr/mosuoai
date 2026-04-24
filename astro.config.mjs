// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginFrames } from '@expressive-code/plugin-frames';
import icon from 'astro-icon';
import { siteConfig } from './src/config.mjs';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  output: 'static',
  integrations: [
    icon(),
    expressiveCode({
      plugins: [pluginLineNumbers(), pluginFrames()],
      theme: 'dark-plus',
      themes: ['dark-plus'],
    }),
  ],
});
