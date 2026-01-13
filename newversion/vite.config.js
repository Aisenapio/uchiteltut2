import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3001,
    strictPort: true,
    allowedHosts: ['rflow.ru.tuna.am'],
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
    strictPort: true,
  }
})
