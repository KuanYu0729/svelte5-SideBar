import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: 'src/export.ts',
      name: 'SvelteSideBar',
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'bundle.esm.js' : 'bundle.cjs.js',
    },
    rollupOptions: {
      // Do not bundle peer dependencies
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'svelte',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
