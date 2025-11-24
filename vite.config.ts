import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions 会通过 VITE_BASE_URL 环境变量自动设置正确的 base URL
// 本地开发时默认为 '/'
const base = process.env.VITE_BASE_URL || '/'

export default defineConfig({
  base: base,
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173,
  },
})

