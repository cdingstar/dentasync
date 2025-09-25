import React, { useState } from 'react'
import './OrderChat.css'
import OrderDetail from './OrderDetail'

function OrderChat({ orderId, onClose }) {
  const [showDetail, setShowDetail] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: '【客服】韦洁',
      timestamp: '2024-11-21 11:08',
      isSystem: true
    },
    {
      id: 2,
      type: 'received',
      content: '【客服】韦洁',
      timestamp: '2024-11-21 11:08',
      hasImage: true,
      imageUrl: '/api/placeholder/200/150'
    },
    {
      id: 3,
      type: 'received',
      content: '【客服】韦洁',
      timestamp: '2024-11-21 11:08'
    },
    {
      id: 4,
      type: 'received',
      content: '医生早上好！JOSHUA LIM TZE HAO 顾客的数据边缘不清晰，建议发PLY彩色格式的压缩包数据给我们哦，谢谢。',
      timestamp: '2024-11-21 11:08'
    },
    {
      id: 5,
      type: 'received',
      content: '【客服】韦洁',
      timestamp: '2024-11-21 16:58'
    },
    {
      id: 6,
      type: 'received',
      content: '微信对接中',
      timestamp: '2024-11-21 16:58'
    },
    {
      id: 7,
      type: 'notification',
      content: '预出厂时间变更',
      details: {
        original: '2024-11-25 20:30',
        new: '2024-11-23 20:30'
      },
      timestamp: '2024-11-21 16:58',
      notificationType: 'time-change'
    },
    {
      id: 8,
      type: 'notification',
      content: '订单开始制作',
      details: {
        message: '该订单已进入生产线开始制作'
      },
      timestamp: '2024-11-21 17:30',
      notificationType: 'production-start'
    }
  ])

  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'sent',
        content: inputMessage,
        timestamp: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).replace(/\//g, '-')
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleDetailOpen = () => {
    // 创建一个模拟的订单对象，实际应用中应该根据 orderId 获取完整订单信息
    const mockOrder = {
      id: orderId,
      patientName: 'JOSHUA LIM TZE HAO',
      productType: 'D1氧化锆全瓷牙',
      toothPosition: '21, 22',
      status: 'processing',
      statusText: '制作中',
      createTime: '2024-11-21 11:08',
      expectedTime: '2025-10-01',
      urgency: 'normal'
    }
    setShowDetail(true)
  }

  const handleDetailClose = () => {
    setShowDetail(false)
  }

  return (
    <div className="order-chat-page">
      {/* 顶部导航栏 */}
      <div className="chat-header">
        <div className="header-left">
          <div className="back-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="order-title">{orderId || '102411214443O1-JOSHUA LIM TZE H...'}</div>
        </div>
        <div className="header-right">
          <div className="menu-btn" onClick={handleDetailOpen}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="14" height="2" fill="#00BCD4"/>
              <rect x="3" y="7" width="14" height="2" fill="#00BCD4"/>
              <rect x="3" y="11" width="14" height="2" fill="#00BCD4"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message-item ${message.type}`}>
            {message.type === 'system' && (
              <div className="system-message">
                <div className="system-time">{message.timestamp}</div>
              </div>
            )}
            
            {(message.type === 'received' || message.type === 'sent') && (
              <div className="chat-message">
                <div className="message-sender">{message.content}</div>
                {message.hasImage && (
                  <div className="message-image">
                    <img src={message.imageUrl} alt="聊天图片" />
                  </div>
                )}
                {!message.hasImage && message.content !== '【客服】韦洁' && (
                  <div className="message-text">{message.content}</div>
                )}
              </div>
            )}

            {message.type === 'notification' && (
              <div className="notification-message">
                <div className="system-time">{message.timestamp}</div>
                <div className={`notification-card ${message.notificationType}`}>
                  <div className="notification-header">
                    <div className="notification-icon">●</div>
                    <div className="notification-title">{message.content}</div>
                    {message.notificationType === 'production-start' && (
                      <div className="notification-arrow">&gt;&gt;</div>
                    )}
                  </div>
                  {message.details && (
                    <div className="notification-details">
                      {message.notificationType === 'time-change' && (
                        <>
                          <div className="detail-row">
                            <span className="detail-label">原预出厂时间：</span>
                            <span className="detail-value">{message.details.original}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">新预出厂时间：</span>
                            <span className="detail-value">{message.details.new}</span>
                          </div>
                        </>
                      )}
                      {message.notificationType === 'production-start' && (
                        <div className="production-message">{message.details.message}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部输入栏 */}
      <div className="chat-input-container">
        <div className="input-wrapper">
          <div className="voice-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="#666"/>
              <path d="M19 10V12C19 16.42 15.42 20 11 20H13C17.42 20 21 16.42 21 12V10H19Z" fill="#666"/>
              <path d="M5 10V12C5 16.42 8.58 20 13 20H11C6.58 20 3 16.42 3 12V10H5Z" fill="#666"/>
              <path d="M12 20V23M8 23H16" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
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

      {showDetail && (
        <OrderDetail 
          order={{
            id: orderId,
            patientName: 'JOSHUA LIM TZE HAO',
            productType: 'D1氧化锆全瓷牙',
            toothPosition: '21, 22',
            status: 'processing',
            statusText: '制作中',
            createTime: '2024-11-21 11:08',
            expectedTime: '2025-10-01',
            urgency: 'normal'
          }}
          onClose={handleDetailClose}
        />
      )}
    </div>
  )
}

export default OrderChat