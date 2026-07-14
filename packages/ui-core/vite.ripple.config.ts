import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/ripple/index.ts'),
      name: 'CompanyUIRipple',
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'ripple/index.js' : 'ripple/index.cjs'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named'
      }
    }
  }
})
