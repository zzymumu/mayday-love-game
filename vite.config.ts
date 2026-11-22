import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 專案站台需要以 repository name 作為 base path。
export default defineConfig({
  plugins: [react()],
  base: '/mayday-love-game/',
})