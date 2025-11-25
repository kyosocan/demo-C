import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 根据环境设置 base URL
// 生产环境使用 /demo-C/，本地开发使用 /
const base = process.env.NODE_ENV === 'production' ? '/demo-C/' : '/'

export default defineConfig({
  base: base,
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173,
  },
})

