# @shellicar/build-clean

Build plugin that automatically cleans unused files from output directories.

## Installation & Quick Start

```sh
pnpm add -D @shellicar/build-clean
```

## Quick Example

```ts
// esbuild
import cleanPlugin from '@shellicar/build-clean/esbuild'

await build({
  plugins: [cleanPlugin({ destructive: true })]
})
```

```ts
// tsup.config.ts
import cleanPlugin from '@shellicar/build-clean/esbuild'

export default defineConfig({
  clean: false,
  esbuildPlugins: [cleanPlugin({ destructive: true })]
})
```

## Documentation

For full documentation, examples, and configuration options, visit the [GitHub repository](https://github.com/shellicar/build-clean).
