import { defineConfig } from 'tsup';
import cleanPlugin from '@shellicar/build-clean/esbuild';

export default defineConfig((config) => ({
  entry: ['src/main.ts'],
  splitting: true,
  sourcemap: false,
  treeshake: true,
  dts: false,
  clean: false,
  minify: false,
  keepNames: true,
  bundle: true,
  tsconfig: 'tsconfig.json',
  target: 'node22',
  format: ['esm'],
  outDir: 'dist',
  esbuildPlugins: [cleanPlugin({
    destructive: true,
    verbose: true,
    debug: true,
  })],
}));
