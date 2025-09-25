import React, { useState } from 'react'
import './OrderForm.css'

function OrderForm({ onClose }) {
  const [formData, setFormData] = useState({
    executiveUnit: 'ASIANTECH PTE. LTD.',
    doctorName: 'Dr Amanda Tiong',
    productionUnit: '南宁市谱佳齿科技术中心',
    patientName: 'cding',
    patientGender: '男',
    patientAge: '展开',
    productName: 'D1氧化锆全瓷牙',
    productCount: '3',
    toothPosition: '88,8',
    connectionMethod: '全部单独',
    connectionType: '全部连体',
    connectionLevel: '分段',
    extractionMethod: '常规取模',
    extractionType: '工厂灌硅胶',
    extractionScan: '口内扫描',
    attachmentUpload: false,
    deliveryMethod: '自有品牌',
    deliveryType: '',
    color: '8,8',
    mainColor: '请选择主色'
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitOrder = () => {
    alert('订单提交成功！')
    onClose()
  }

  return (
    <div className="order-form-page">
      {/* 顶部导航栏 */}
      <div className="order-form-header">
        <div className="header-left">
          <div className="back-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="header-title">下单</div>
        </div>
      </div>

      {/* 表单内容 */}
      <div className="order-form-content">
        {/* 基本信息区域 */}
        <div className="form-section">
          <div className="form-row">
            <span className="form-label">执行单位</span>
            <div className="form-value-with-arrow">
              <span>{formData.executiveUnit}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="form-row">
            <span className="form-label">医生姓名</span>
            <div className="form-value-with-arrow">
              <span>{formData.doctorName}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="form-row">
            <span className="form-label">生产单位</span>
            <div className="form-value-with-arrow">
              <span>{formData.productionUnit}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="form-row patient-row">
            <span className="form-label">患者姓名</span>
            <input 
              type="text" 
              value={formData.patientName}
              onChange={(e) => handleInputChange('patientName', e.target.value)}
              className="patient-input"
            />
            <div className="gender-buttons">
              <button 
                className={`gender-btn ${formData.patientGender === '男' ? 'active' : ''}`}
                onClick={() => handleInputChange('patientGender', '男')}
              >
                ♂ 男
              </button>
              <button 
                className={`gender-btn ${formData.patientGender === '女' ? 'active' : ''}`}
                onClick={() => handleInputChange('patientGender', '女')}
              >
                ♀ 女
              </button>
            </div>
            <div className="age-dropdown">
              <span>{formData.patientAge}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 产品信息区域 */}
        <div className="product-section">
          <div className="product-header">
            <span className="product-title">产品信息</span>
            <button className="add-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#007AFF" strokeWidth="2"/>
                <path d="M10 6v8M6 10h8" stroke="#007AFF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          
          <div className="product-item">
            <div className="product-name">{formData.productName}</div>
            <div className="product-count">新做*{formData.productCount}</div>
            <div className="tooth-position-container">
              <input 
                type="text" 
                value={formData.toothPosition}
                onChange={(e) => handleInputChange('toothPosition', e.target.value)}
                className="tooth-position-input"
              />
              <button className="delete-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" fill="#FF3B30"/>
                  <path d="M6 6L10 10M10 6L6 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 连接方式 */}
        <div className="option-section">
          <div className="option-label">*连接方式</div>
          <div className="option-buttons">
            <button className={`option-btn ${formData.connectionMethod === '全部单独' ? 'active' : ''}`}>
              全部单独
            </button>
            <button className={`option-btn ${formData.connectionType === '全部连体' ? 'active' : ''}`}>
              全部连体
            </button>
            <button className={`option-btn ${formData.connectionLevel === '分段' ? 'active' : ''}`}>
              分段
            </button>
          </div>
        </div>

        {/* 取模方式 */}
        <div className="option-section">
          <div className="option-label">*取模方式</div>
          <div className="option-buttons">
            <button className={`option-btn ${formData.extractionMethod === '常规取模' ? 'active' : ''}`}>
              常规取模
            </button>
            <button className={`option-btn ${formData.extractionType === '工厂灌硅胶' ? 'active' : ''}`}>
              工厂灌硅胶
            </button>
            <button className={`option-btn ${formData.extractionScan === '口内扫描' ? 'active' : ''}`}>
              口内扫描
            </button>
          </div>
          
          <div className="attachment-option">
            <input 
              type="checkbox" 
              id="attachment"
              checked={formData.attachmentUpload}
              onChange={(e) => handleInputChange('attachmentUpload', e.target.checked)}
            />
            <label htmlFor="attachment">请接送人员上门取附件</label>
          </div>
        </div>

        {/* 发送方式 */}
        <div className="delivery-section">
          <div className="delivery-row">
            <span className="delivery-label">发送方式</span>
            <div className="delivery-value">
              <span>{formData.deliveryMethod}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="delivery-label">发送方式</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* 颜色选择 */}
        <div className="color-section">
          <div className="color-header">
            <div className="color-icon">🎨</div>
            <span className="color-title">颜色</span>
          </div>
          
          <div className="color-input-container">
            <input 
              type="text" 
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="color-input"
            />
            <button className="color-delete-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" fill="#FF3B30"/>
                <path d="M6 6L10 10M10 6L6 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          
          <div className="main-color-section">
            <span className="main-color-label">请选择主色</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="color-brand">
              <span>玻璃球/中/1/1/</span>
              <span className="brand-text">自定义颜色</span>
              <button className="brand-add-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#007AFF" strokeWidth="1.5"/>
                  <path d="M8 5v6M5 8h6" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部提交按钮 */}
      <div className="order-form-footer">
        <button className="submit-btn" onClick={handleSubmitOrder}>
          提交订单
        </button>
      </div>
    </div>
  )
}

export default OrderForm