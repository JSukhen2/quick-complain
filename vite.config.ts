import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'GEMINI_'], // GEMINI_API_KEY를 클라이언트에서 읽을 수 있도록 허용
})
