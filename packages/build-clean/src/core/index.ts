import { type UnpluginFactory, createUnplugin } from 'unplugin';
import { cleanUnusedFiles } from './cleanUnusedFiles';
import { createLogger } from './createLogger';
import { defaults } from './defaults';
import type { Options } from './types';

const pluginFactory: UnpluginFactory<Options | undefined> = (initialOptions: Options = {}) => {
  const options = {
    ...defaults,
    ...initialOptions,
  };

  const logger = createLogger(options);

  return {
    name: 'unplugin-build-cleaner',
    enforce: 'post',

    esbuild: {
      setup(build) {
        build.initialOptions.metafile = true;

        build.onEnd(async (result) => {
          logger.debug('Build completed, starting cleanup process');

          const outdir = build.initialOptions.outdir;
          if (!outdir) {
            throw new Error('[build-cleaner] No output directory specified in build options');
          }

          if (!result.metafile) {
            throw new Error('[build-cleaner] No metafile available - ensure metafile is enabled');
          }

          const builtFiles = new Set(Object.keys(result.metafile.outputs));
          logger.debug(`Found ${builtFiles.size} built files in metafile for directory: "${outdir}"`);

          await cleanUnusedFiles(outdir, builtFiles, options, logger);
        });
      },
    },
  };
};

export const plugin = createUnplugin(pluginFactory);
