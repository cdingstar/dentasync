import React, { useState } from 'react'
import './Orders.css'

function Orders() {
  const [activeTab, setActiveTab] = useState('all')
  
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
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
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

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true
    return order.status === activeTab
  })

  const tabs = [
    { id: 'all', label: '全部', count: orders.length },
    { id: 'pending', label: '待确认', count: orders.filter(o => o.status === 'pending').length },
    { id: 'processing', label: '制作中', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', label: '已发货', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'completed', label: '已完成', count: orders.filter(o => o.status === 'completed').length }
  ]

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>订单管理</h2>
        <div className="header-actions">
          <button className="refresh-btn">🔄</button>
          <button className="search-btn">🔍</button>
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
        {filteredOrders.map(order => (
          <div key={order.id} className="order-item">
            <div className="order-header">
              <div className="order-id">{order.id}</div>
              <div className="order-urgency" style={{ color: getUrgencyColor(order.urgency) }}>
                {getUrgencyText(order.urgency)}
              </div>
            </div>
            
            <div className="order-content">
              <div className="order-info">
                <div className="info-row">
                  <span className="label">患者：</span>
                  <span className="value">{order.patientName}</span>
                </div>
                <div className="info-row">
                  <span className="label">产品：</span>
                  <span className="value">{order.productType}</span>
                </div>
                <div className="info-row">
                  <span className="label">牙位：</span>
                  <span className="value">{order.toothPosition}</span>
                </div>
                <div className="info-row">
                  <span className="label">下单时间：</span>
                  <span className="value">{order.createTime}</span>
                </div>
                <div className="info-row">
                  <span className="label">预计完成：</span>
                  <span className="value">{order.expectedTime}</span>
                </div>
              </div>
              
              <div className="order-status">
                <div 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.statusText}
                </div>
              </div>
            </div>
            
            <div className="order-actions">
              <button className="btn-detail">查看详情</button>
              {order.status === 'pending' && (
                <button className="btn-confirm">确认订单</button>
              )}
              {order.status === 'processing' && (
                <button className="btn-track">跟踪进度</button>
              )}
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
    </div>
  )
}

export default Orders