import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CompanyTokens',
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'index.js' : 'index.cjs'
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
})
