import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'

// Ensure Vite has an entry index.html during build/dev
copyFileSync(new URL('./index.vite.html', import.meta.url), new URL('./index.html', import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: '/moccasins-for-markers/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
