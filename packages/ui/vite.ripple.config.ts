import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/ripple.ts'),
      name: 'CompanyUIRipple',
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'ripple.js' : 'ripple.cjs'
    },
    rollupOptions: {
      external: ['vue', '@hbdlzy/ui-core/ripple'],
      output: {
        exports: 'named'
      }
    }
  }
})
