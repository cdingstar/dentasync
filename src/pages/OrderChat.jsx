import React, { useState } from 'react'
import './OrderChat.css'
import OrderDetail from './OrderDetail'
import { useLanguage } from '../context/LanguageContext'

function OrderChat({ orderId, onClose }) {
  const { t } = useLanguage()
  const [showDetail, setShowDetail] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: `【${t('chat.customerService')}】韦洁`,
      timestamp: '2024-11-21 11:08',
      isSystem: true
    },
    {
      id: 2,
      type: 'received',
      content: t('chat.mock.img_msg'),
      timestamp: '2024-11-21 11:08',
      hasImage: true,
      imageUrl: '/api/placeholder/200/150',
      status: 'read',
      sender: t('chat.customerService')
    },
    {
      id: 3,
      type: 'received',
      content: `【${t('chat.customerService')}】韦洁`,
      timestamp: '2024-11-21 11:08',
      sender: '韦洁'
    },
    {
      id: 4,
      type: 'received',
      content: t('chat.mock.cs_msg_1'),
      timestamp: '2024-11-21 11:08',
      status: 'read',
      sender: t('chat.customerService')
    },
    {
      id: 5,
      type: 'received',
      content: `【${t('chat.customerService')}】韦洁`,
      timestamp: '2024-11-21 16:58',
      sender: '韦洁'
    },
    {
      id: 6,
      type: 'received',
      content: t('chat.mock.wechat'),
      timestamp: '2024-11-21 16:58',
      status: 'unread',
      sender: t('chat.customerService')
    },
    {
      id: 7,
      type: 'notification',
      content: t('chat.mock.notif_time'),
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
      content: t('chat.mock.notif_prod'),
      details: {
        message: t('chat.mock.notif_prod_detail')
      },
      timestamp: '2024-11-21 17:30',
      notificationType: 'production-start'
    }
  ])

  const [inputMessage, setInputMessage] = useState('')

  const getAvatarText = (name = '') => {
    const n = String(name).trim()
    if (!n) return t('chat.me')
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
        ,
        status: 'unread',
        sender: t('chat.me')
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
    const mockOrder = {
      id: orderId,
      patientName: 'JOSHUA LIM TZE HAO',
      productType: 'D1氧化锆全瓷牙',
      toothPosition: '21, 22',
      status: 'processing',
      statusText: t('orders.processing'),
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

      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message-item ${message.type}`}>
            {message.type === 'system' && (
              <div className="system-message">
                <div className="system-time">{message.timestamp}</div>
              </div>
            )}
            
            {(message.type === 'received' || message.type === 'sent') && (
              <div className="message-row">
                {message.type === 'received' && (
                  <div className="chat-avatar">{getAvatarText(message.sender)}</div>
                )}
                <div className={`message-col ${message.type}`}>
                  <div className="meta-line">
                    <span className="meta-name">{message.type === 'sent' ? t('chat.me') : message.sender}</span>
                    <span className="meta-time">{message.timestamp}</span>
                  </div>
                  <div className="chat-message">
                    <div className="message-sender">{message.content}</div>
                    {message.hasImage && (
                      <div className="message-image">
                        <img src={message.imageUrl} alt="聊天图片" />
                      </div>
                    )}
                    {!message.hasImage && message.content !== `【${t('chat.customerService')}】韦洁` && (
                      <div className="message-text">{message.content}</div>
                    )}
                    {message.status && (
                      <div className={`message-status ${message.status}`}>{message.status === 'read' ? t('chat.read') : t('chat.unread')}</div>
                    )}
                  </div>
                </div>
                {message.type === 'sent' && (
                  <div className="chat-avatar">{getAvatarText(t('chat.me'))}</div>
                )}
              </div>
            )}
            
            {message.type === 'notification' && (
              <div className="notification-message">
                <div className="notification-content">
                  <div className="notification-title">{message.content}</div>
                  {message.notificationType === 'time-change' && (
                    <div className="notification-details">
                      <div className="time-change-row">
                        <span className="old-time">{message.details.original}</span>
                        <span className="arrow">→</span>
                        <span className="new-time">{message.details.new}</span>
                      </div>
                    </div>
                  )}
                  {message.notificationType === 'production-start' && (
                    <div className="notification-details">
                      <div className="production-msg">{message.details.message}</div>
                    </div>
                  )}
                </div>
                <div className="system-time">{message.timestamp}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder={t('chat.inputPlaceholder')}
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
        <div className="order-detail-overlay">
           <div className="order-detail-panel">
             <OrderDetail order={{
                id: orderId,
                patientName: 'JOSHUA LIM TZE HAO',
                productType: 'D1氧化锆全瓷牙',
                toothPosition: '21, 22',
                status: 'processing',
                statusText: t('orders.processing'),
                createTime: '2024-11-21 11:08',
                expectedTime: '2025-10-01',
                urgency: 'normal',
                doctorName: '黄向荣',
                clinic: 'ASIANTECH PTE. LTD.',
                factory: '南宁市后齐科技'
             }} onClose={handleDetailClose} />
           </div>
        </div>
      )}
    </div>
  )
}

export default OrderChat
