import React, { useEffect, useMemo, useState } from 'react'
import './Messages.css'
import OrderChat from './OrderChat'
import ContactChat from './ContactChat'

function Messages() {
  const [searchQuery, setSearchQuery] = useState('')
  const threads = [
    {
      id: 'ORD-1025111444444301',
      type: 'order',
      title: '订单1025111444444301',
      initial: '订',
      color: '#7e57c2',
      unreadCount: 5,
      time: '10:56'
    },
    {
      id: 'DR-HXR',
      type: 'contact',
      title: '黄向荣医生',
      initial: '黄',
      color: '#2196f3',
      unreadCount: 3,
      time: '10:53'
    },
    {
      id: 'DR-WSF',
      type: 'contact',
      title: '王师傅',
      initial: '王',
      color: '#4caf50',
      unreadCount: 1,
      time: '10:01'
    },
    {
      id: 'DR-LYS',
      type: 'contact',
      title: '李医生',
      initial: '李',
      color: '#2196f3',
      unreadCount: 0,
      time: '昨天'
    }
  ]

  const [showOrderChat, setShowOrderChat] = useState(false)
  const [showContactChat, setShowContactChat] = useState(false)
  const [selectedThread, setSelectedThread] = useState(null)

  const getInitialStyle = (color) => ({ backgroundColor: color })

  useEffect(() => {
    const handler = (e) => {
      const { page, query } = e.detail || {}
      if (page === 'messages') {
        setSearchQuery(query || '')
      }
    }
    window.addEventListener('globalSearch', handler)
    return () => window.removeEventListener('globalSearch', handler)
  }, [])

  const filteredMessages = useMemo(() => {
    const q = (searchQuery || '').toLowerCase()
    if (!q) return threads
    return threads.filter(t => {
      const idText = String(t.id)
      return (
        idText.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q)
      )
    })
  }, [threads, searchQuery])

  const openThread = (thread) => {
    setSelectedThread(thread)
    if (thread.type === 'order') {
      setShowOrderChat(true)
    } else {
      setShowContactChat(true)
    }
  }

  useEffect(() => {
    const closeHandler = () => {
      setShowOrderChat(false)
      setShowContactChat(false)
    }
    window.addEventListener('requestCloseDialogs', closeHandler)
    return () => window.removeEventListener('requestCloseDialogs', closeHandler)
  }, [])

  return (
    <>
    <div className="messages-page">
      <div className="messages-list">
        {filteredMessages.map(thread => (
          <div key={thread.id} className={`thread-item ${thread.unreadCount > 0 ? 'unread' : ''}`} onClick={() => openThread(thread)}>
            <div className="thread-initial" style={getInitialStyle(thread.color)}>{thread.initial}</div>
            <div className="thread-title">{thread.title}</div>
            <div className="thread-right">
              <span className="thread-time">{thread.time}</span>
              {thread.unreadCount > 0 && (
                <span className="thread-badge">{thread.unreadCount}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="empty-state" style={{ display: 'none' }}>
        <div className="empty-icon">📭</div>
        <div className="empty-text">暂无消息</div>
      </div>
    </div>
    {showOrderChat && selectedThread && (
      <OrderChat orderId={selectedThread.id} onClose={() => setShowOrderChat(false)} />
    )}
    {showContactChat && selectedThread && (
      <ContactChat contactName={selectedThread.title} onClose={() => setShowContactChat(false)} />
    )}
  </>
  )
}

export default Messages
