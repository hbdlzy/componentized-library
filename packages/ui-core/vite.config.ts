import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CompanyUICore',
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'index.js' : 'index.cjs'
    },
    rollupOptions: {
      external: ['vue', 'element-plus', 'xlsx', 'file-saver']
    }
  }
})
