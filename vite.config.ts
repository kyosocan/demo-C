import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 如果仓库名是 username.github.io，base 应该是 '/'
// 如果仓库名是其他名称（如 demo-C），base 应该是 '/仓库名/'
// 可以通过环境变量 VITE_BASE_URL 来设置
// GitHub Actions 会自动设置正确的 base URL
// 本地开发时，base 默认为 '/'，生产构建时使用环境变量或默认值
const base = process.env.VITE_BASE_URL || (process.env.NODE_ENV === 'production' ? '/demo-C/' : '/')

export default defineConfig({
  base: base,
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173,
  },
})

