import type { ILogger, Options } from './types';

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  green: '\x1b[32m',
};

export function createLogger(options: Options): ILogger {
  const prefix = '[build-cleaner]';

  return {
    debug: (message: string, ...args: any[]) => {
      if (options.debug) {
        console.log(`${colors.gray}${prefix} DEBG${colors.reset} ${message}`, ...args);
      }
    },
    verbose: (message: string, ...args: any[]) => {
      if (options.verbose) {
        console.log(`${colors.blue}${prefix} VERB${colors.reset} ${message}`, ...args);
      }
    },
    info: (message: string, ...args: any[]) => {
      console.log(`${colors.green}${prefix} INFO${colors.reset} ${message}`, ...args);
    },
    warn: (message: string, ...args: any[]) => {
      console.warn(`${colors.yellow}${prefix} WARN${colors.reset} ${message}`, ...args);
    },
    error: (message: string, ...args: any[]) => {
      console.error(`${colors.red}${prefix} EROR${colors.reset} ${message}`, ...args);
    },
  };
}
