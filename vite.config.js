import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ergast': {
        target: 'https://api.jolpi.ca',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
