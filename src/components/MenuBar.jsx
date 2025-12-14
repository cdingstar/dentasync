import React from 'react'
import './MenuBar.css'
import { useLanguage } from '../context/LanguageContext'

function MenuBar({ currentPage, onPageChange }) {
  const { t } = useLanguage()
  const menuItems = [
    { id: 'workspace', label: t('menu.workspace'), icon: '🏠' },
    { id: 'messages', label: t('menu.messages'), icon: '💬' },
    { id: 'order', label: t('menu.order'), icon: '📝' },
    { id: 'orders', label: t('menu.orders'), icon: '📋' },
    { id: 'my', label: t('menu.my'), icon: '👤' }
  ]

  return (
    <div className="bottom-nav">
      <div className="nav-container">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuBar
