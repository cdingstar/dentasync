import React, { useState } from 'react'
import './ContactChat.css'

function ContactChat({ contactName, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'received',
      content: '您好，我是工厂客服，关于您昨日上传的咬合数据，我们已收到。',
      timestamp: '2024-11-22 09:12',
      status: 'read',
      sender: contactName
    },
    {
      id: 2,
      type: 'received',
      file: { name: '订单工艺单-ORD-1025111444444301.pdf', size: '284 KB' },
      timestamp: '2024-11-22 09:13',
      status: 'read',
      sender: contactName
    },
    {
      id: 3,
      type: 'sent',
      content: '好的，请查收新的取模照片。',
      timestamp: '2024-11-22 09:15',
      status: 'read',
      sender: '我'
    },
    {
      id: 4,
      type: 'sent',
      file: { name: '取模照片-20241122.zip', size: '1.2 MB' },
      timestamp: '2024-11-22 09:16',
      status: 'unread',
      sender: '我'
    },
    {
      id: 5,
      type: 'received',
      content: '已收到，设计师会根据照片优化边缘线。预计今天傍晚给到预出厂时间。',
      timestamp: '2024-11-22 09:22',
      status: 'unread',
      sender: contactName
    }
  ])

  const [inputMessage, setInputMessage] = useState('')

  const getAvatarText = (name = '') => {
    const n = String(name).trim()
    if (!n) return '我'
    const hasChinese = /[\u4e00-\u9fa5]/.test(n)
    if (hasChinese) {
      return n.slice(-1)
    }
    const parts = n.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    const w = parts[0]
    return (w.slice(0, 2) || w[0]).toUpperCase()
  }

  const handleSendMessage = () => {
    const text = inputMessage.trim()
    if (!text) return
    const newMessage = {
      id: messages.length + 1,
      type: 'sent',
      content: text,
      timestamp: new Date().toLocaleString('zh-CN', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
      }).replace(/\//g, '-'),
      status: 'unread'
    }
    setMessages([...messages, newMessage])
    setInputMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage()
  }

  return (
    <div className="contact-chat-page">
      <div className="chat-header">
        <div className="header-left">
          <div className="back-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="order-title">{contactName}</div>
        </div>
      </div>

      <div className="messages-container">
        {messages.map(m => (
          <div key={m.id} className={`message-item ${m.type}`}>
            <div className="message-row">
              {m.type === 'received' && (
                <div className="chat-avatar">{getAvatarText(m.sender)}</div>
              )}
              <div className={`message-col ${m.type}`}>
                <div className="meta-line">
                  <span className="meta-name">{m.type === 'sent' ? '我' : m.sender}</span>
                  <span className="meta-time">{m.timestamp}</span>
                </div>
                <div className="chat-message">
                  {m.file ? (
                    <div className="file-bubble">
                      <div className="file-icon">📎</div>
                      <div className="file-info">
                        <div className="file-name">{m.file.name}</div>
                        <div className="file-size">{m.file.size}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="message-text">{m.content}</div>
                  )}
                  <div className={`message-status ${m.status}`}>{m.status === 'read' ? '已读' : '未读'}</div>
                </div>
              </div>
              {m.type === 'sent' && (
                <div className="chat-avatar">{getAvatarText(m.sender)}</div>
              )}
            </div>
            <div className="system-time" style={{ display: 'none' }}>{m.timestamp}</div>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="请输入消息"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="message-input"
          />
          <div className="emoji-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2"/>
              <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 9H9.01M15 9H15.01" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="add-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactChat
