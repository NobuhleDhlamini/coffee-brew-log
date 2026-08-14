import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/coffee-brew-log/',
  server: {
    port: 5175,
  },
})