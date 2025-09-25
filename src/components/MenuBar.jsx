import React from 'react'
import './MenuBar.css'

function MenuBar({ currentPage, onPageChange }) {
  const menuItems = [
    { id: 'workspace', label: '工作台', icon: '🏠' },
    { id: 'messages', label: '消息', icon: '💬' },
    { id: 'order', label: '下单', icon: '📝' },
    { id: 'orders', label: '订单', icon: '📋' },
    { id: 'more', label: '更多', icon: '⋯' }
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