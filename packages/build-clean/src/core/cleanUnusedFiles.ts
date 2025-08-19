import { unlink } from 'node:fs/promises';
import { relative } from 'node:path';
import { getAllFiles } from './getAllFiles';
import type { ILogger, Options } from './types';
import { validateOutDir } from './validateOutDir';

export async function cleanUnusedFiles(outDir: string, builtFiles: Set<string>, options: Options, logger: ILogger): Promise<void> {
  validateOutDir(outDir, logger);

  try {
    logger.debug(`Starting cleanup of directory: "${outDir}"`);
    logger.debug(`Built files count: ${builtFiles.size}`);

    const existingFiles = await getAllFiles(outDir, logger);
    logger.debug(`Existing files count: ${existingFiles.length}`);

    if (existingFiles.length === 0 && builtFiles.size > 0) {
      logger.error('Disable tsup "clean: true" to use this plugin.');
      return;
    }

    logger.info(`Processing ${existingFiles.length} existing files vs ${builtFiles.size} built files`);

    const filesToDelete: string[] = [];

    for (const file of existingFiles) {
      const relativePath = relative(process.cwd(), file);
      logger.verbose(`Checking file: "${relativePath}"`);

      if (!builtFiles.has(relativePath)) {
        filesToDelete.push(file);
        logger.verbose(`Marked for deletion: "${relativePath}"`);
      } else {
        logger.verbose(`Keeping built file: "${relativePath}"`);
      }
    }

    if (filesToDelete.length > 0) {
      const dryRunSuffix = options.dry ? ' (dry run)' : '';
      logger.warn(`Files marked for deletion: ${filesToDelete.length}${dryRunSuffix}`);
    } else {
      logger.info('No files marked for deletion');
    }

    let deletedCount = 0;
    for (const file of filesToDelete) {
      const relativePath = relative(process.cwd(), file);

      if (!options.dry) {
        await unlink(file);
      }

      logger.info(`Deleting: "${relativePath}"`);
      deletedCount++;
    }

    if (deletedCount === 0) {
      logger.info('No unused files found');
    }
  } catch (error) {
    logger.error('Error during cleanup:', error);
    throw error;
  }
}
