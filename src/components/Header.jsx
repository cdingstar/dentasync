import React, { useMemo, useState } from 'react'
import './Header.css'
import SearchModal from './SearchModal'

function Header({ currentPage }) {
  const [selectedOrg, setSelectedOrg] = useState({
    id: 1,
    name: 'ASIANTECH PTE. LTD.',
    icon: '🏢'
  })
  const [showSearch, setShowSearch] = useState(false)

  // 根据当前页面决定显示内容
  const getHeaderContent = () => {
    if (currentPage === 'orders') {
      return {
        name: '订单管理',
        icon: '📋',
        showDropdown: false
      }
    }
    if (currentPage === 'messages') {
      return {
        name: '消息中心',
        icon: '💬',
        showDropdown: false
      }
    }
    if (currentPage === 'workspace') {
      return {
        name: selectedOrg.name,
        icon: selectedOrg.icon,
        showDropdown: false
      }
    }
    return {
      name: selectedOrg.name,
      icon: selectedOrg.icon,
      showDropdown: false
    }
  }

  const headerContent = getHeaderContent()

  const organizations = []

  const searchConfig = useMemo(() => {
    if (currentPage === 'messages') {
      return {
        placeholder: '订单ID、联系人或消息内容',
        tip: '支持按订单ID、联系人或消息内容搜索',
        page: 'messages'
      }
    }
    if (currentPage === 'orders') {
      return {
        placeholder: '患者、医生或订单号',
        tip: '支持按患者、医生或订单号搜索',
        page: 'orders'
      }
    }
    if (currentPage === 'patient') {
      return {
        placeholder: '患者姓名/ID/电话',
        tip: '输入患者姓名、ID或电话进行搜索',
        page: 'patient'
      }
    }
    if (currentPage === 'products') {
      return {
        placeholder: '产品名称',
        tip: '输入产品名称进行搜索',
        page: 'products'
      }
    }
    return {
      placeholder: '关键字',
      tip: '输入关键字进行搜索',
      page: currentPage
    }
  }, [currentPage])

  return (
    <div className="home-header">
      <div className="header-content">
        <div className="header-left">
          <div className="org-selector">
            <div className="org-icon">{headerContent.icon}</div>
            <div className="org-info">
              <div className="org-name">{headerContent.name}</div>
            </div>
          </div>
        </div>
        <div className="header-right">
          {currentPage === 'my' && (
            <button
              className="header-action-btn"
              onClick={() => {
                const ev = new CustomEvent('openAboutFromHeader')
                window.dispatchEvent(ev)
              }}
            >
              联系我们
            </button>
          )}
          {currentPage !== 'workspace' && currentPage !== 'my' && (
            <div
              className="search-icon"
              onClick={() => {
                const ev = new CustomEvent('requestCloseDialogs')
                window.dispatchEvent(ev)
                setShowSearch(true)
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </div>
      <SearchModal
        visible={showSearch}
        placeholder={searchConfig.placeholder}
        tip={searchConfig.tip}
        page={searchConfig.page}
        onClose={() => setShowSearch(false)}
      />
    </div>
  )
}

export default Header
