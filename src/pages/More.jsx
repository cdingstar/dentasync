import React from 'react'
import './More.css'

function More() {
  const menuItems = [
    {
      id: 'profile',
      title: '个人资料',
      icon: '👤',
      description: '查看和编辑个人信息',
      action: () => alert('个人资料功能开发中...')
    },
    {
      id: 'settings',
      title: '系统设置',
      icon: '⚙️',
      description: '应用设置和偏好配置',
      action: () => alert('系统设置功能开发中...')
    },
    {
      id: 'notifications',
      title: '消息通知',
      icon: '🔔',
      description: '管理通知和提醒设置',
      action: () => alert('消息通知设置功能开发中...')
    },
    {
      id: 'help',
      title: '帮助中心',
      icon: '❓',
      description: '使用指南和常见问题',
      action: () => alert('帮助中心功能开发中...')
    },
    {
      id: 'feedback',
      title: '意见反馈',
      icon: '💬',
      description: '提交建议和问题反馈',
      action: () => alert('意见反馈功能开发中...')
    },
    {
      id: 'about',
      title: '关于我们',
      icon: 'ℹ️',
      description: '应用版本和公司信息',
      action: () => alert('DentaSync v1.0.0\n牙科医疗管理平台')
    }
  ]

  const quickActions = [
    {
      id: 'backup',
      title: '数据备份',
      icon: '💾',
      color: '#4caf50'
    },
    {
      id: 'export',
      title: '导出数据',
      icon: '📤',
      color: '#2196f3'
    },
    {
      id: 'sync',
      title: '同步数据',
      icon: '🔄',
      color: '#ff9800'
    },
    {
      id: 'clean',
      title: '清理缓存',
      icon: '🧹',
      color: '#9c27b0'
    }
  ]

  return (
    <div className="more-page">
      <div className="more-header">
        <div className="user-info">
          <div className="user-avatar">
            <div className="avatar-placeholder">👨‍⚕️</div>
          </div>
          <div className="user-details">
            <div className="user-name">Dr. 张医生</div>
            <div className="user-role">牙科医师</div>
            <div className="user-clinic">DentaSync</div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <div className="section-title">快捷操作</div>
        <div className="actions-grid">
          {quickActions.map(action => (
            <div 
              key={action.id} 
              className="action-item"
              onClick={() => alert(`${action.title}功能开发中...`)}
            >
              <div 
                className="action-icon"
                style={{ backgroundColor: action.color }}
              >
                {action.icon}
              </div>
              <div className="action-title">{action.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="menu-section">
        <div className="section-title">功能菜单</div>
        <div className="menu-list">
          {menuItems.map(item => (
            <div 
              key={item.id} 
              className="menu-item"
              onClick={item.action}
            >
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-content">
                <div className="menu-title">{item.title}</div>
                <div className="menu-description">{item.description}</div>
              </div>
              <div className="menu-arrow">›</div>
            </div>
          ))}
        </div>
      </div>

      <div className="app-info">
        <div className="app-version">
          <span>版本信息：DentaSync v1.0.0</span>
        </div>
        <div className="copyright">
          <span>© 2024 DentaSync. All rights reserved.</span>
        </div>
      </div>
    </div>
  )
}

export default More
