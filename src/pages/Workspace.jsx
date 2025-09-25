import React, { useState } from 'react'
import './Workspace.css'
import OrderSelection from './OrderSelection'

function Workspace({ onOpenProducts, onNavigateToOrders }) {
  const [showOrderSelection, setShowOrderSelection] = useState(false)

  const handleNavigateToFunction = (functionType) => {
    console.log('点击了功能按钮:', functionType)
    
    const messages = {
      shipped: '已发货功能开发中...',
      settings: '设置功能开发中...',
      mytasks: '我的任务功能开发中...',
      account: '账号管理功能开发中...'
    }
    
    alert(messages[functionType] || '功能开发中...')
  }

  const handlePendingOrders = () => {
    // 点击"待下单"进入Orders页面并默认显示"待下单"标签
    if (onNavigateToOrders) {
      onNavigateToOrders('draft')
    }
  }

  const closeOrderSelection = () => {
    setShowOrderSelection(false)
  }

  return (
    <div className="page-content">
      {/* 功能网格 */}
      <div className="function-grid">
        <div className="function-item" onClick={() => handleNavigateToFunction('shipped')}>
          <div className="function-icon shipped-icon">📦</div>
          <span className="function-label">已发货</span>
        </div>
        
        <div className="function-item" onClick={onOpenProducts}>
          <div className="function-icon products-icon">📋</div>
          <span className="function-label">产品库</span>
        </div>
        
        <div className="function-item" onClick={handlePendingOrders}>
          <div className="function-icon order-icon">📝</div>
          <span className="function-label">待下单</span>
        </div>
        
        <div className="function-item" onClick={() => handleNavigateToFunction('settings')}>
          <div className="function-icon settings-icon">⚙️</div>
          <span className="function-label">设置</span>
        </div>
        
        <div className="function-item" onClick={() => handleNavigateToFunction('mytasks')}>
          <div className="function-icon mytasks-icon">📋</div>
          <span className="function-label">我的任务</span>
        </div>
        
        <div className="function-item" onClick={() => handleNavigateToFunction('account')}>
          <div className="function-icon account-icon">👤</div>
          <span className="function-label">账号管理</span>
        </div>
      </div>

      {/* 订单选择页面 */}
      {showOrderSelection && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100000,
          background: 'rgba(0,0,0,0.8)'
        }}>
          <OrderSelection 
            onClose={closeOrderSelection}
            productName="订单选择"
          />
        </div>
      )}
    </div>
  )
}

export default Workspace