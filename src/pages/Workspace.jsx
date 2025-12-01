import React, { useMemo, useState } from 'react'
import './Workspace.css'

function Workspace({ onOpenProducts, onNavigateToOrders, onNavigateToAddress, onNavigateToPatient, onNavigateToMessages }) {
  const [showOrderSelection, setShowOrderSelection] = useState(false)

  const ordersSample = useMemo(() => ([
    { status: 'processing' },
    { status: 'shipped' },
    { status: 'completed' },
    { status: 'pending' },
    { status: 'draft' },
    { status: 'completed' }
  ]), [])

  const completedCount = useMemo(() => ordersSample.filter(o => o.status === 'completed').length, [ordersSample])
  const uncompletedCount = useMemo(() => ordersSample.filter(o => o.status !== 'completed').length, [ordersSample])

  const handleNavigateToFunction = (functionType) => {
    console.log('点击了功能按钮:', functionType)
    
    const messages = {
      shipped: '已发货功能开发中...',
      settings: '设置功能开发中...',
      mytasks: '我的信息功能开发中...',
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
      <div className="order-stats">
        <div className="stat-card" onClick={() => onNavigateToOrders && onNavigateToOrders('completed')}>
          <div className="stat-label">已完成订单</div>
          <div className="stat-value">
            <span className="stat-icon">🛒</span>
            <span className="stat-number">{completedCount}</span>
          </div>
        </div>
        <div className="stat-card" onClick={() => onNavigateToOrders && onNavigateToOrders('pending')}>
          <div className="stat-label">待处理订单</div>
          <div className="stat-value">
            <span className="stat-icon">✅</span>
            <span className="stat-number">{uncompletedCount}</span>
          </div>
        </div>
      </div>

      {/* 功能网格 */}
      <div className="function-grid">
        <div className="function-item" onClick={() => onNavigateToOrders && onNavigateToOrders('shipped')}>
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
        
        <div className="function-item" onClick={onNavigateToAddress}>
          <div className="function-icon settings-icon">📮</div>
          <span className="function-label">地址管理</span>
        </div>
        
        <div className="function-item" onClick={onNavigateToMessages}>
          <div className="function-icon mytasks-icon">📋</div>
          <span className="function-label">我的消息</span>
        </div>
        
        <div className="function-item" onClick={onNavigateToPatient}>
          <div className="function-icon account-icon">🧑‍⚕️</div>
          <span className="function-label">患者档案</span>
        </div>
      </div>

      {/* 订单选择页面（已废弃，使用 QuickOrder 单页流程） */}
    </div>
  )
}

export default Workspace
