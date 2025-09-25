import React from 'react'
import './Messages.css'

function Messages() {
  const messages = [
    {
      id: 1,
      sender: '系统通知',
      content: '您有新的订单需要处理',
      time: '10:30',
      unread: true,
      type: 'system'
    },
    {
      id: 2,
      sender: '客户服务',
      content: '产品咨询回复：关于氧化锆材料的详细信息...',
      time: '09:15',
      unread: true,
      type: 'service'
    },
    {
      id: 3,
      sender: '订单更新',
      content: '订单 #12345 已发货，预计明天到达',
      time: '昨天',
      unread: false,
      type: 'order'
    },
    {
      id: 4,
      sender: '技术支持',
      content: '系统维护通知：今晚22:00-24:00进行系统升级',
      time: '昨天',
      unread: false,
      type: 'tech'
    }
  ]

  const getMessageIcon = (type) => {
    switch (type) {
      case 'system': return '🔔'
      case 'service': return '💬'
      case 'order': return '📦'
      case 'tech': return '🔧'
      default: return '💬'
    }
  }

  return (
    <div className="messages-page">
      <div className="messages-header">
        <h2>消息中心</h2>
        <div className="header-actions">
          <button className="mark-all-read">全部已读</button>
        </div>
      </div>

      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className={`message-item ${message.unread ? 'unread' : ''}`}>
            <div className="message-icon">
              {getMessageIcon(message.type)}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-sender">{message.sender}</span>
                <span className="message-time">{message.time}</span>
              </div>
              <div className="message-text">{message.content}</div>
            </div>
            {message.unread && <div className="unread-dot"></div>}
          </div>
        ))}
      </div>

      <div className="empty-state" style={{ display: 'none' }}>
        <div className="empty-icon">📭</div>
        <div className="empty-text">暂无消息</div>
      </div>
    </div>
  )
}

export default Messages