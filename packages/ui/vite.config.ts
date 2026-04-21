import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CompanyUI',
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'index.js' : 'index.cjs'
    },
    rollupOptions: {
      external: [
        'vue',
        'element-plus',
        '@hbdlzy/tokens',
        '@hbdlzy/ui-core',
        '@hbdlzy/ui-energy'
      ]
    }
  }
})
