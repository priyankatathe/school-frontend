import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
// import React from 'react'
export default defineConfig({
  plugins: [
    tailwindcss(), viteReact,
  ],
})