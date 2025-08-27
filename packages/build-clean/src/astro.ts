import { plugin } from './core';
import type { Options } from './core/types';

export default (options: Options): any => ({
  name: 'build-clean',
  hooks: {
    'astro:config:setup': async (astro: any) => {
      astro.config.vite.plugins ||= [];
      astro.config.vite.plugins.push(plugin.vite(options));
    },
  },
});
