import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repo is published at https://project-lederhof-living-clean.github.io/ui-v3-prototyp/
export default defineConfig({
  base: '/ui-v3-prototyp/',
  plugins: [react(), tailwindcss()],
})
