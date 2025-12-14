import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }).replace(/\//g, '-'))
  },
  base: './',
  plugins: [react()],
  server: {
    port: 3003,
    host: '127.0.0.1',
    open: false,
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  preview: {
    port: 3003,
    host: '127.0.0.1',
    strictPort: true
  },
  build: {
    outDir: 'dist'
  }
})
