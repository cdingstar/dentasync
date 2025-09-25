import React, { useState } from 'react'
import './OrderSelection.css'
import OrderForm from './OrderForm'

function OrderSelection({ onClose, productName }) {
  console.log('OrderSelection 组件已渲染，productName:', productName)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState('ASIIAN SMILE LTD')
  const [selectedDoctor, setSelectedDoctor] = useState('当前登录医生')
  const [selectedManufacturer, setSelectedManufacturer] = useState('')

  const companies = [
    'ASIIAN SMILE LTD',
    'DENTAL CARE CENTER',
    'SMILE CLINIC PTE LTD'
  ]

  const doctors = [
    '当前登录医生',
    '张医生',
    '李医生',
    '王医生'
  ]

  const manufacturers = [
    'ASIANTECH PTE. LTD.',
    '精工义齿制作中心',
    '优质牙科实验室'
  ]

  const handleVoiceOrder = () => {
    alert('语音下单功能')
  }

  const handleImmediateOrder = () => {
    setShowOrderForm(true)
  }

  const closeOrderForm = () => {
    setShowOrderForm(false)
  }

  // 如果显示订单表单，则只显示订单表单
  if (showOrderForm) {
    return <OrderForm onClose={closeOrderForm} />
  }

  return (
    <div className="order-selection-page">
      {/* 顶部导航栏 */}
      <div className="order-selection-header">
        <div className="header-left">
          <div className="back-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="header-title">订单基本信息</div>
        </div>
      </div>

      {/* 页面内容 */}
      <div className="order-selection-content">
          <div className="selection-section">
            <h3>执业企业单位</h3>
            <select 
              value={selectedCompany} 
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="selection-dropdown"
            >
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          <div className="selection-section">
            <h3>选择医生</h3>
            <select 
              value={selectedDoctor} 
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="selection-dropdown"
            >
              {doctors.map(doctor => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>

          <div className="selection-section">
            <h3>生产单位</h3>
            <select 
              value={selectedManufacturer} 
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="selection-dropdown"
            >
              <option value="">请选择生产单位</option>
              {manufacturers.map(manufacturer => (
                <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
              ))}
            </select>
          </div>
      </div>

      {/* 底部按钮 */}
      <div className="order-selection-footer">
          <button className="voice-order-btn" onClick={handleVoiceOrder}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 1C8.34315 1 7 2.34315 7 4V10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10V4C13 2.34315 11.6569 1 10 1Z" stroke="white" strokeWidth="2"/>
              <path d="M16 8V10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10V8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M10 16V19M10 19H7M10 19H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            语音下单
          </button>
          <button className="immediate-order-btn" onClick={handleImmediateOrder}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 7L9 13L17 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            立即下单
          </button>
      </div>
    </div>
  )
}

export default OrderSelection