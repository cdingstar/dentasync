import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const mount = (el) => {
  console.info('DentaSync: mount start')
  const root = ReactDOM.createRoot(el)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.info('DentaSync: mount done')
}

const container = document.getElementById('root')
try {
  if (container) {
    mount(container)
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('root')
      if (el) mount(el)
    })
  }
} catch (e) {
  console.error('DentaSync: mount error', e)
  const rootEl = document.getElementById('root')
  if (rootEl) {
    rootEl.textContent = '页面加载失败，请查看控制台错误信息'
  }
}
