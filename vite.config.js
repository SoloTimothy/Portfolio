import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Configurazione di Vite.
// - react():       abilita JSX e il fast-refresh durante `npm run dev`
// - tailwindcss(): integra Tailwind CSS direttamente nella build
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
