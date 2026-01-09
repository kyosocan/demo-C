import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePageDemo from './HomePageDemo.tsx'
import './index.css'

// 使用新的首页组件（1:1 还原 Figma 设计稿）
// 如需切换回原有页面，将 HomePageDemo 替换为 App
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HomePageDemo />
  </React.StrictMode>,
)

