import React, { useState } from 'react'
import './Orders.css'
import OrderChat from './OrderChat'
import OrderDetail from './OrderDetail'

function Orders({ defaultTab = 'all' }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [searchQuery, setSearchQuery] = useState('')
  const [showChat, setShowChat] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  
  const orders = [
    {
      id: 'ORD-2024-001',
      patientName: '张三',
      productType: '氧化锆牙冠',
      toothPosition: '11, 12',
      status: 'processing',
      statusText: '制作中',
      createTime: '2024-01-15 10:30',
      expectedTime: '2024-01-22',
      urgency: 'normal'
    },
    {
      id: 'ORD-2024-002',
      patientName: '李四',
      productType: '全瓷贴面',
      toothPosition: '21-24',
      status: 'shipped',
      statusText: '已发货',
      createTime: '2024-01-14 14:20',
      expectedTime: '2024-01-20',
      urgency: 'urgent'
    },
    {
      id: 'ORD-2024-003',
      patientName: '王五',
      productType: '金属烤瓷桥',
      toothPosition: '14-16',
      status: 'completed',
      statusText: '已完成',
      createTime: '2024-01-10 09:15',
      expectedTime: '2024-01-18',
      urgency: 'normal'
    },
    {
      id: 'ORD-2024-004',
      patientName: '赵六',
      productType: '氧化锆嵌体',
      toothPosition: '36',
      status: 'pending',
      statusText: '待确认',
      createTime: '2024-01-16 16:45',
      expectedTime: '2024-01-25',
      urgency: 'emergency'
    },
    {
      id: 'ORD-2024-005',
      patientName: '陈七',
      productType: 'D1氧化锆全瓷牙',
      toothPosition: '21, 22',
      status: 'draft',
      statusText: '待下单',
      createTime: '2024-01-17 11:20',
      expectedTime: '2024-01-26',
      urgency: 'normal'
    },
    {
      id: 'ORD-2024-006',
      patientName: '刘八',
      productType: '全瓷冠',
      toothPosition: '16',
      status: 'draft',
      statusText: '待下单',
      createTime: '2024-01-17 15:30',
      expectedTime: '2024-01-27',
      urgency: 'urgent'
    }
  ]

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

  const getUrgencyText = (urgency) => {
    switch (urgency) {
      case 'emergency': return '特急'
      case 'urgent': return '加急'
      case 'normal': return '普通'
      default: return '普通'
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
          !order.productType.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !order.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      return true
    }
    if (searchQuery && !order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !order.productType.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !order.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return order.status === activeTab
  })

  const tabs = [
    { id: 'all', label: '全部', count: orders.length },
    { id: 'draft', label: '待下单', count: orders.filter(o => o.status === 'draft').length },
    { id: 'pending', label: '待确认', count: orders.filter(o => o.status === 'pending').length },
    { id: 'processing', label: '制作中', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', label: '已发货', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'completed', label: '已完成', count: orders.filter(o => o.status === 'completed').length }
  ]

  return (
    <div className="orders-page">
      {/* 顶部导航栏 */}
      <div className="orders-header">
        <div className="header-left">
          <div className="header-title">订单管理</div>
        </div>
        <div className="header-right">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="患者姓名/产品名称/订单号" 
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
              搜索
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
          <div key={order.id} className="order-item">
            <div className="order-header">
              <div className="order-id">{order.id}</div>
              <div className="order-status-tag" style={{ backgroundColor: getStatusColor(order.status) }}>
                {order.statusText} {getStatusPercentage(order.status)}
              </div>
            </div>
            
            <div className="order-main">
              <div className="order-number">
                {String(index + 1).padStart(2, '0')}
              </div>
              
              <div className="order-details">
                <div className="patient-info">
                  <span className="patient-label">患者:</span>
                  <span className="patient-name">{order.patientName}</span>
                  <span className="urgency-tag" style={{ color: getUrgencyColor(order.urgency) }}>
                    {getUrgencyText(order.urgency)}
                  </span>
                </div>
                
                <div className="responsibility-unit">
                  责任单位: 南宁市靖佳齿科技术中心
                </div>
                
                <div className="delivery-date">
                  预计到货: {order.expectedTime}
                </div>
              </div>
            </div>
            
            <div className="order-actions">
              <div className="action-left">
                <div className="institution-name">ASIANTECH PTE. LTD. - 黄向荣</div>
              </div>
              <div className="action-buttons">
                <button className="btn-chat" onClick={() => handleChatOpen(order.id)}>在线交流</button>
                <button className="btn-logistics">查看物流</button>
                <button className="btn-confirm-receipt" onClick={() => handleDetailOpen(order)}>查看详情</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <div className="empty-text">暂无订单</div>
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