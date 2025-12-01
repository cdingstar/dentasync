import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    host: true,
    open: true,
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  preview: {
    port: 3003,
    host: true,
    strictPort: true
  },
  build: {
    outDir: 'dist'
  }
})
