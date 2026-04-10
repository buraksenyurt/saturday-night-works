import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080  // NW.js desktop modu: package.json'daki "main": "http://localhost:8080" ile uyumlu
  }
})
