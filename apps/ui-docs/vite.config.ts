import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@hbdlzy/tokens': path.resolve(__dirname, '../../packages/tokens/src/index.ts'),
      '@hbdlzy/ui-core': path.resolve(__dirname, '../../packages/ui-core/src/index.ts'),
      '@hbdlzy/ui-energy': path.resolve(__dirname, '../../packages/ui-energy/src/index.ts')
    }
  }
})
