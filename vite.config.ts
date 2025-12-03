import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')

// 根据环境设置 base URL
  // 优先使用环境变量 VITE_BASE_URL（GitHub Actions 中设置）
  // 如果设置了 NODE_ENV=production，使用 /demo-C/
  // 本地开发使用 /
  // 注意：GitHub Pages 部署时，仓库名是 demo-C，所以 base 必须是 /demo-C/
  const base = env.VITE_BASE_URL || 
               (process.env.NODE_ENV === 'production' ? '/demo-C/' : '/')

  return {
  base: base,
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173,
  },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  }
})

