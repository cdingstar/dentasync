import React, { useEffect, useState } from 'react'
import './Orders.css'
import OrderChat from './OrderChat'
import OrderDetail from './OrderDetail'
import { useLanguage } from '../context/LanguageContext'

function Orders({ defaultTab = 'all', onGoPlaceOrder }) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [searchQuery, setSearchQuery] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      patientName: '张三',
      doctorName: '黄向荣',
      clinic: '仁爱口腔诊所',
      productType: '氧化锆牙冠',
      toothPosition: '11, 12',
      status: 'processing',
      statusText: '制作中',
      createTime: '2024-01-15 10:30',
      expectedTime: '2024-01-22',
      urgency: 'normal',
      factory: '南宁市谱佳齿科技术中心'
    },
    {
      id: 'ORD-2024-002',
      patientName: '李四',
      doctorName: '王医生',
      clinic: '康乐牙科门诊',
      productType: '全瓷贴面',
      toothPosition: '21-24',
      status: 'shipped',
      statusText: '已发货',
      createTime: '2024-01-14 14:20',
      expectedTime: '2024-01-20',
      urgency: 'urgent',
      factory: '优质牙科实验室'
    },
    {
      id: 'ORD-2024-003',
      patientName: '王五',
      doctorName: '李医生',
      clinic: '美齿口腔',
      productType: '金属烤瓷桥',
      toothPosition: '14-16',
      status: 'completed',
      statusText: '已完成',
      createTime: '2024-01-10 09:15',
      expectedTime: '2024-01-18',
      urgency: 'normal',
      factory: '精工义齿制作中心'
    },
    {
      id: 'ORD-2024-004',
      patientName: '赵六',
      doctorName: '周医生',
      clinic: '瑞康口腔门诊',
      productType: '氧化锆嵌体',
      toothPosition: '36',
      status: 'pending',
      statusText: '待处理',
      createTime: '2024-01-16 16:45',
      expectedTime: '2024-01-25',
      urgency: 'emergency',
      factory: '南宁市谱佳齿科技术中心'
    },
    {
      id: 'ORD-2024-005',
      patientName: '陈七',
      doctorName: '刘医生',
      clinic: '爱康口腔',
      productType: 'D1氧化锆全瓷牙',
      toothPosition: '21, 22',
      status: 'draft',
      statusText: '待下单',
      createTime: '2024-01-17 11:20',
      expectedTime: '2024-01-26',
      urgency: 'normal',
      factory: '优质牙科实验室'
    },
    {
      id: 'ORD-2024-006',
      patientName: '刘八',
      doctorName: '张医生',
      clinic: '德恩口腔',
      productType: '全瓷冠',
      toothPosition: '16',
      status: 'draft',
      statusText: '待下单',
      createTime: '2024-01-17 15:30',
      expectedTime: '2024-01-27',
      urgency: 'urgent',
      factory: '精工义齿制作中心'
    }
  ])

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return '#9c27b0'
      case 'pending': return '#ff9800'
      case 'processing': return '#2196f3'
      case 'shipped': return '#4caf50'
      case 'completed': return '#8bc34a'
      default: return '#666'
    }
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency': return '#f44336'
      case 'urgent': return '#ff9800'
      case 'normal': return '#4caf50'
      default: return '#666'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'draft': return t('workspace.toOrder')
      case 'pending': return t('workspace.pending')
      case 'processing': return t('workspace.processing')
      case 'shipped': return t('workspace.shipped')
      case 'completed': return t('workspace.completed')
      default: return t('common.unknown')
    }
  }

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'emergency': return t('orders.urgency.emergency')
      case 'urgent': return t('orders.urgency.urgent')
      case 'normal': return t('orders.urgency.normal')
      default: return t('orders.urgency.normal')
    }
  }

  const getStatusPercentage = (status) => {
    switch (status) {
      case 'draft': return '0%'
      case 'pending': return '10%'
      case 'processing': return '60%'
      case 'shipped': return '90%'
      case 'completed': return '100%'
      default: return '0%'
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const executeSearch = () => {
    console.log('执行搜索:', searchQuery)
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeSearch()
    }
  }

  useEffect(() => {
    const handler = (e) => {
      const { page, query } = e.detail || {}
      if (page === 'orders') {
        setSearchQuery(query || '')
      }
    }
    window.addEventListener('globalSearch', handler)
    return () => window.removeEventListener('globalSearch', handler)
  }, [])

  useEffect(() => {
    const closeHandler = () => {
      setShowChat(false)
      setShowDetail(false)
    }
    window.addEventListener('requestCloseDialogs', closeHandler)
    return () => window.removeEventListener('requestCloseDialogs', closeHandler)
  }, [])

  const handleChatOpen = (orderId) => {
    setSelectedOrderId(orderId)
    setShowChat(true)
  }

  const handleChatClose = () => {
    setShowChat(false)
    setSelectedOrderId('')
  }

  const handleDetailOpen = (order) => {
    setSelectedOrder(order)
    setShowDetail(true)
  }

  const handleDetailClose = () => {
    setShowDetail(false)
    setSelectedOrder(null)
  }

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') {
      if (searchQuery && !order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !order.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !order.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      return true
    }
    if (searchQuery && !order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !order.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !order.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return order.status === activeTab
  })

  const tabs = [
    { id: 'all', label: t('orders.all'), count: orders.length },
    { id: 'draft', label: t('workspace.toOrder'), count: orders.filter(o => o.status === 'draft').length },
    { id: 'pending', label: t('workspace.pending'), count: orders.filter(o => o.status === 'pending').length },
    { id: 'shipped', label: t('workspace.shipped'), count: orders.filter(o => o.status === 'shipped').length },
    { id: 'completed', label: t('workspace.completed'), count: orders.filter(o => o.status === 'completed').length }
  ]

  return (
    <div className="orders-page">
      {/* 顶部导航栏 */}
      <div className="orders-header">
        <div className="header-left">
          <div className="header-title">{t('orders.title')}</div>
        </div>
        <div className="header-right">
          <div className="search-container">
            <input 
              type="text" 
              placeholder={t('orders.searchPlaceholder')} 
              value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleSearchKeyPress}
            />
            {searchQuery && (
              <div className="search-clear" onClick={clearSearch}>×</div>
            )}
            <button className="search-btn" onClick={executeSearch}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('common.search')}
            </button>
          </div>
          <div className="doctor-avatar">
            <img src="/api/placeholder/32/32" alt="医生头像" />
          </div>
        </div>
      </div>

      <div className="orders-tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-label">{tab.label}</span>
            <span className="tab-count">{tab.count}</span>
          </div>
        ))}
      </div>

      <div className="orders-list">
        {filteredOrders.map((order, index) => (
          <div key={order.id} className="order-item" onClick={() => handleDetailOpen(order)}>
            <div className="order-header">
              <div className="order-id">{order.id}</div>
              <div className="order-status-tag" style={{ backgroundColor: getStatusColor(order.status) }}>
                {getStatusText(order.status)}
              </div>
            </div>
            
            <div className="order-main">
              <div className="order-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <div className="order-details">
                <div className="patient-info">
                  <span className="patient-name">{order.patientName}/{order.doctorName}（{order.clinic}）</span>
                </div>
                
                <div className="responsibility-unit">
                  {t('orders.deliveryTime')}：{order.expectedTime}（{order.factory}）
                </div>
                
                
              </div>
            </div>
            
            <div className="order-actions">
              
              <div className="action-buttons">
                {activeTab === 'draft' ? (
                  <>
                    <button className="btn-chat" onClick={(e) => { e.stopPropagation(); onGoPlaceOrder && onGoPlaceOrder('order') }}>{t('orders.placeOrder')}</button>
                    <button className="btn-confirm-receipt" onClick={(e) => { e.stopPropagation(); deleteOrder(order.id) }}>{t('common.delete')}</button>
                  </>
                ) : (
                  <>
                    <button className="btn-chat" onClick={(e) => { e.stopPropagation(); handleChatOpen(order.id) }}>{t('orders.chat')}</button>
                    <button className="btn-confirm-receipt" onClick={(e) => { e.stopPropagation(); handleDetailOpen(order) }}>{t('orders.viewDetail')}</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <div className="empty-text">{t('common.noData')}</div>
        </div>
      )}

      {showChat && (
        <OrderChat 
          orderId={selectedOrderId}
          onClose={handleChatClose}
        />
      )}

      {showDetail && (
        <OrderDetail 
          order={selectedOrder}
          onClose={handleDetailClose}
        />
      )}
    </div>
  )
}

export default Orders
