import React from 'react'
import './StatusBar.css'

function StatusBar() {
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  return (
    <div className="status-bar">
      <div className="status-left">
        <span>{getCurrentTime()}</span>
      </div>
      <div className="status-right">
        <span>●●●●</span>
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  )
}

export default StatusBar