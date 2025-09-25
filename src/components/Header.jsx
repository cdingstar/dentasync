import React, { useState } from 'react'
import './Header.css'

function Header({ currentPage }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState({
    id: 1,
    name: 'ASIANTECH PTE. LTD.',
    icon: '🏢'
  })

  // 根据当前页面决定显示内容
  const getHeaderContent = () => {
    if (currentPage === 'orders') {
      return {
        name: '订单管理',
        icon: '📋',
        showDropdown: false
      }
    }
    return {
      name: selectedOrg.name,
      icon: selectedOrg.icon,
      showDropdown: true
    }
  }

  const headerContent = getHeaderContent()

  const organizations = [
    { id: 1, name: 'ASIANTECH PTE. LTD.', icon: '🏢' },
    { id: 2, name: 'DentaCare Medical Center', icon: '🏥' },
    { id: 3, name: 'SmileTech Dental Clinic', icon: '😊' }
  ]

  const toggleDropdown = () => {
    if (headerContent.showDropdown) {
      setShowDropdown(!showDropdown)
    }
  }

  const selectOrganization = (org) => {
    setSelectedOrg(org)
    setShowDropdown(false)
  }

  return (
    <div className="home-header">
      <div className="header-content">
        <div className="header-left">
          <div className="org-selector" onClick={toggleDropdown}>
            <div className="org-icon">{headerContent.icon}</div>
            <div className="org-info">
              <div className="org-name">{headerContent.name}</div>
            </div>
            {headerContent.showDropdown && (
              <div className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          
          {showDropdown && headerContent.showDropdown && (
            <div className="org-dropdown">
              {organizations.map(org => (
                <div 
                  key={org.id} 
                  className={`org-option ${selectedOrg.id === org.id ? 'selected' : ''}`}
                  onClick={() => selectOrganization(org)}
                >
                  <div className="org-option-icon">{org.icon}</div>
                  <div className="org-option-name">{org.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="header-right">
          <div className="search-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header