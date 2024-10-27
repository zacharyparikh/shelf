import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { join } from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: join(import.meta.dirname, 'src/client'),
  plugins: [TanStackRouterVite({}), react()],
  build: {
    emptyOutDir: true,
    outDir: join(import.meta.dirname, 'dist/client'),
  },
  resolve: {
    alias: {
      client: join(import.meta.dirname, 'src/client'),
    },
  },
})
