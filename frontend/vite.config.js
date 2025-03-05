import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Asegura que Vite escuche en todas las interfaces
    port: 5173,        // Asegura que el puerto sea 5173 (puedes cambiarlo si lo deseas)
  },
})
