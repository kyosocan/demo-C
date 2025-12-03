import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 根据环境设置 base URL
  // 优先使用环境变量 VITE_BASE_URL，如果没有则根据 mode 判断
  // 生产环境使用 /demo-C/，本地开发使用 /
  const base = env.VITE_BASE_URL || (mode === 'production' ? '/demo-C/' : '/')

  return {
    base: base,
    plugins: [react()],
    server: {
      host: '0.0.0.0', // 允许外部访问
      port: 5173,
    },
  }
})

