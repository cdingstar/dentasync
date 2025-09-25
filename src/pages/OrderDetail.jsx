import React, { useState } from 'react'
import './OrderDetail.css'

function OrderDetail({ order, onClose }) {
  const [activeTab, setActiveTab] = useState('入货')

  const tabs = ['入货', '图片采集', '货件交接', '设计', '其他']

  const getStatusText = (status) => {
    switch (status) {
      case 'draft': return '待下单'
      case 'pending': return '待确认'
      case 'processing': return '制作中'
      case 'shipped': return '已发货'
      case 'completed': return '已完成'
      default: return '未知状态'
    }
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

  return (
    <div className="order-detail-page">
      {/* 顶部导航栏 */}
      <div className="detail-header">
        <div className="header-left">
          <div className="back-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="header-title">订单详情</div>
        </div>
        <div className="header-right">
          <div className="notification-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 6.5C15 5.11929 13.8807 4 12.5 4C11.1193 4 10 5.11929 10 6.5C10 7.88071 11.1193 9 12.5 9C13.8807 9 15 7.88071 15 6.5Z" stroke="#666" strokeWidth="1.5"/>
              <path d="M12.5 2V4M12.5 9V11M17.5 6.5H15.5M9.5 6.5H7.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="menu-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="14" height="2" fill="#666"/>
              <rect x="3" y="7" width="14" height="2" fill="#666"/>
              <rect x="3" y="11" width="14" height="2" fill="#666"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 订单基本信息 */}
      <div className="order-basic-info">
        <div className="order-number-section">
          <div className="order-label">订单号</div>
          <div className="order-status-row">
            <div className="order-number">{order?.id || '102509254443O2'}</div>
            <div className="status-badge" style={{ backgroundColor: getStatusColor(order?.status) }}>
              <div className="status-icon">👤</div>
              <div className="status-text">客作码 109928</div>
            </div>
          </div>
        </div>

        <div className="patient-section">
          <div className="patient-info">
            <span className="patient-label">患者信息</span>
            <span className="patient-name">Rakhi Ms/20250925-1420-20</span>
            <span className="patient-tag">未知</span>
          </div>
          <div className="doctor-info">
            <span className="doctor-label">医生:</span>
            <span className="doctor-name">黄向荣</span>
          </div>
        </div>

        <div className="company-section">
          <div className="company-row">
            <span className="company-label">执业单位:</span>
            <span className="company-name">ASIANTECH PTE. LTD.</span>
          </div>
          <div className="responsibility-row">
            <span className="responsibility-label">责任单位:</span>
            <span className="responsibility-name">南宁市靖佳齿科技术中心</span>
          </div>
        </div>

        <div className="time-section">
          <div className="order-time">
            <span className="time-label">下单时间:</span>
            <span className="time-value">2025-09-25 18:17:50</span>
          </div>
          <div className="delivery-time">
            预计到货: 2025-10-01
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">生产进度</span>
            <span className="progress-percentage">0%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '0%' }}></div>
          </div>
          <div className="progress-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="detail-tabs">
        {tabs.map(tab => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* 标签页内容 */}
      <div className="tab-content">
        {activeTab === '入货' && (
          <div className="tab-panel">
            <div className="product-section">
              <div className="section-title">产品信息</div>
              <div className="product-item">
                <div className="product-name">D1氧化锆全瓷牙</div>
                <div className="product-image">
                  <div className="tooth-diagram">
                    <div className="tooth-number">7</div>
                  </div>
                </div>
                <div className="product-tag">新做 x1</div>
              </div>
            </div>

            <div className="connection-section">
              <div className="section-title">连接方式: 全部单独</div>
            </div>

            <div className="color-section">
              <div className="section-title">颜色</div>
              <div className="color-item">
                <div className="color-sample">
                  <div className="color-number">7</div>
                </div>
                <div className="color-name">主色 A2</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '图片采集' && (
          <div className="tab-panel">
            <div className="empty-content">
              <div className="empty-text">暂无图片采集信息</div>
            </div>
          </div>
        )}

        {activeTab === '货件交接' && (
          <div className="tab-panel">
            <div className="empty-content">
              <div className="empty-text">暂无货件交接信息</div>
            </div>
          </div>
        )}

        {activeTab === '设计' && (
          <div className="tab-panel">
            <div className="empty-content">
              <div className="empty-text">暂无设计信息</div>
            </div>
          </div>
        )}

        {activeTab === '其他' && (
          <div className="tab-panel">
            <div className="empty-content">
              <div className="empty-text">暂无其他信息</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetail