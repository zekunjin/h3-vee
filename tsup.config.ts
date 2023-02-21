import { defineConfig } from 'tsup'

export default defineConfig(options => ({
  entry: ['./index.ts'],
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  dts: true,
  format: ['cjs', 'esm', 'iife'],
  external: ['veelidate', 'h3'],
  minify: !options.watch
}))
