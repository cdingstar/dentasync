import React, { useState } from 'react'
import Select from '../components/Select'
import OrderSuccess from './OrderSuccess'
import './OrderForm.css'

function OrderForm({ onClose }) {
  const [showSuccess, setShowSuccess] = useState(false);
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
    deliveryBrand: '自有品牌',
    deliveryMethod: '客服微信',
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
    setShowSuccess(true);
  }

  const handleViewOrder = () => {
    // 查看订单逻辑
    console.log('查看订单');
  }

  const handleContinueOrder = () => {
    // 继续下单逻辑
    setShowSuccess(false);
  }

  const handleBackHome = () => {
    setShowSuccess(false);
    onClose();
  }

  // 如果显示成功页面，则渲染成功组件
  if (showSuccess) {
    return (
      <OrderSuccess 
        onClose={handleBackHome}
        onViewOrder={handleViewOrder}
        onContinueOrder={handleContinueOrder}
      />
    );
  }

  return (
    <div className="order-form-page">
      {/* 顶部导航栏 */}
      <div className="order-form-header">
        <div className="header-left">
          <div className="back-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="header-title">创建订单</div>
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
          <div className="option-row">
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
        </div>

        {/* 取模方式 */}
        <div className="option-section">
          <div className="option-row">
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
          <Select
            label="自有品牌"
            value={formData.deliveryBrand}
            onChange={(value) => handleInputChange('deliveryBrand', value)}
            options={['自有品牌', '八颗牙', '3shape', '先临']}
          />
          <Select
            label="发送方式"
            value={formData.deliveryMethod}
            onChange={(value) => handleInputChange('deliveryMethod', value)}
            options={['客服微信', '客服邮箱', '厂商云平台', '订单内发送']}
          />
        </div>

        {/* 颜色区域 */}
        <div className="color-section">
          <div className="color-header">
            <div className="color-icon">🎨</div>
            <span className="color-title">颜色</span>
          </div>
          
          <div className="color-items">
            <div className="color-item">
              <div className="color-card">
                <div className="color-grid">
                  <div className="color-cell">87</div>
                  <div className="color-cell">578</div>
                  <div className="color-cell">8742</div>
                  <div className="color-cell">1345678</div>
                </div>
                <button className="color-delete-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" fill="#FF3B30"/>
                    <path d="M6 6L10 10M10 6L6 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="color-info">
                <Select
                  value={formData.colorA2 || 'A2'}
                  onChange={(value) => handleInputChange('colorA2', value)}
                  options={['A2', 'A1', 'A3', 'B1']}
                  className="compact"
                />
                <div className="color-brand">
                  <span className="brand-label">设置级/中/1/1/</span>
                  <span className="brand-text">自定义颜色</span>
                  <button className="brand-edit-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="color-item">
              <div className="color-card">
                <div className="color-grid empty">
                  <div className="color-cell"></div>
                  <div className="color-cell"></div>
                  <div className="color-cell"></div>
                  <div className="color-cell"></div>
                </div>
                <button className="color-delete-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" fill="#FF3B30"/>
                    <path d="M6 6L10 10M10 6L6 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="color-info">
                <Select
                  value={formData.colorD2 || 'D2'}
                  onChange={(value) => handleInputChange('colorD2', value)}
                  options={['D2', 'D1', 'D3', 'C1']}
                  className="compact"
                />
                <div className="color-brand">
                  <span className="brand-text">中 C2</span>
                  <button className="brand-edit-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="add-detail-link">
            <span className="add-icon">+</span>
            <span className="add-text">添加详细</span>
          </div>
        </div>

        {/* 详细内容 */}
        <div className="detail-content-section">
          <div className="section-header">
            <div className="section-icon">📋</div>
            <span className="section-title">详细内容</span>
            <div className="collapse-hint">点击可收起</div>
          </div>
          
          <div className="detail-form">
            <div className="form-group">
              <Select
                label="试戴类型"
                value={formData.trialType || ''}
                onChange={(value) => handleInputChange('trialType', value)}
                options={['试戴内冠', '试戴颜色', '试戴车瓷外形', '试戴蜡型外形']}
                placeholder="请选择试戴类型"
                className="vertical"
              />
              <button className="add-detail-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="#007AFF" strokeWidth="2"/>
                  <path d="M10 6v8M6 10h8" stroke="#007AFF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            <div className="form-group">
              <label className="form-label">设计方案</label>
              <div className="design-add-area">
                <div className="add-design-placeholder">
                  <span className="add-icon">+</span>
                  <span className="add-text">设计方案</span>
                </div>
              </div>
              <button className="add-design-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="#007AFF" strokeWidth="2"/>
                  <path d="M10 6v8M6 10h8" stroke="#007AFF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 附件内容 */}
        <div className="attachment-content-section">
          <div className="section-header">
            <div className="section-icon">📎</div>
            <span className="section-title">附件内容</span>
            <div className="collapse-hint">可收起</div>
          </div>
          
          <div className="attachment-form">
            <div className="form-group">
              <label className="form-label">附件</label>
              <button className="add-attachment-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="#007AFF" strokeWidth="2"/>
                  <path d="M10 6v8M6 10h8" stroke="#007AFF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            {/* 质保卡选项 */}
            <div className="warranty-options">
              <button className="warranty-btn">质保卡</button>
              <button className="warranty-btn active">
                电子质保卡
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="warranty-btn">打印实体卡</button>
            </div>
            
            {/* 功能按钮区域 */}
            <div className="attachment-actions">
              <div className="action-item">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#2196F3" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="#2196F3" strokeWidth="2"/>
                    <path d="M21 15L16 10L5 21" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="action-text">照片上传</span>
              </div>
              
              <div className="action-item">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 1C18.075 1 23 5.925 23 12S18.075 23 12 23 1 18.075 1 12 5.925 1 12 1Z" stroke="#2196F3" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" fill="#2196F3"/>
                  </svg>
                </div>
                <span className="action-text">录音备注</span>
              </div>
              
              <div className="action-item">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="action-text">文字备注</span>
              </div>
            </div>
            
            {/* 地址信息 */}
            <div className="address-info">
              <div className="location-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 6.5C14 11 8 15 8 15S2 11 2 6.5C2 3.46 4.46 1 7.5 1S13 3.46 14 6.5Z" stroke="#666" strokeWidth="1.5"/>
                  <circle cx="8" cy="6.5" r="1.5" stroke="#666" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="address-text">福永镇福海街道永和路68号恒基国际b栋招...</span>
              <div className="address-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 3L7.5 6L4.5 9" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部提交按钮 */}
      <div className="order-form-footer">
        <button className="submit-btn" onClick={handleSubmitOrder}>
          提交
        </button>
      </div>
    </div>
  )
}

export default OrderForm