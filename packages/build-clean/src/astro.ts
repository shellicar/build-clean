import type { Options } from './core/types';

import { plugin } from './core';

export default (options: Options): any => ({
  name: 'build-clean',
  hooks: {
    'astro:config:setup': async (astro: any) => {
      astro.config.vite.plugins ||= [];
      astro.config.vite.plugins.push(plugin.vite(options));
    },
  },
});
