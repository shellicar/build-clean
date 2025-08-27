export interface Options {
  debug?: boolean;
  verbose?: boolean;
  destructive?: boolean;
}

export type ILogger = {
  debug: (typeof console)['debug'];
  verbose: (typeof console)['debug'];
  info: (typeof console)['info'];
  warn: (typeof console)['warn'];
  error: (typeof console)['error'];
};
