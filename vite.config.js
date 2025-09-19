import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // This handles client-side routing
    proxy: {
      "/api": { target: "http://localhost:4000", changeOrigin: true, secure: false }
    }
  },
  build: {
    outDir: 'dist'
  },
  rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material']
        }
      }
    }
})
