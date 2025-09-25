import React from 'react';
import './OrderSuccess.css';

const OrderSuccess = ({ onClose, onViewOrder, onContinueOrder }) => {
  // 生成随机订单号
  const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    return timestamp.slice(-12); // 取最后12位
  };

  const orderNumber = generateOrderNumber();
  const trackingCode = "107756";
  
  // 获取当前日期和预计送达日期
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 5); // 5天后送达
  
  const formatDate = (date) => {
    return `${date.getMonth() + 1}月${String(date.getDate()).padStart(2, '0')}日`;
  };

  return (
    <div className="order-success-page">
      {/* 成功状态 */}
      <div className="success-header">
        <div className="success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="#2196F3"/>
            <path d="M14 24L20 30L34 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="success-title">下单成功</h1>
      </div>

      {/* 快递信息 */}
      <div className="delivery-info">
        <p className="delivery-instruction">
          请将以下 <span className="highlight">6位数寄件号</span> 写到发货包装上发出
        </p>
        
        <div className="tracking-number">
          {trackingCode.split('').map((digit, index) => (
            <div key={index} className="digit-box">
              {digit}
            </div>
          ))}
        </div>
        
        <div className="order-details">
          <p className="order-number">订单号：{orderNumber}</p>
          <p className="delivery-schedule">
            今天交送快递，预计 <span className="delivery-date">{formatDate(deliveryDate)}</span> 送达您手中
          </p>
        </div>
      </div>

      {/* 详细信息 */}
      <div className="detail-info">
        <div className="info-section">
          <h3 className="section-title">生产单位</h3>
          <p className="section-content">南宁市谱佳齿科技术中心</p>
        </div>
        
        <div className="info-section">
          <h3 className="section-title">模型请寄至</h3>
          <p className="section-content">
            广西壮族自治区南宁市良庆区利华路23号中新物流园三期唯壹智园10号楼一层谱佳齿科
          </p>
        </div>
        
        <div className="info-section">
          <h3 className="section-title">收件人</h3>
          <p className="section-content">李志华 13211350170</p>
        </div>
        
        {/* 下次速单 */}
        <div className="quick-order-section">
          <div className="quick-order-card">
            <div className="quick-order-content">
              <h3 className="quick-order-title">下次速单</h3>
              <button className="go-btn">GO</button>
            </div>
            <div className="qr-placeholder">
              <div className="qr-code"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="action-buttons">
        <button className="btn-secondary" onClick={onViewOrder}>
          查看订单
        </button>
        <button className="btn-primary" onClick={onContinueOrder}>
          继续下单
        </button>
      </div>
      
      <button className="back-home-btn" onClick={onClose}>
        返回首页
      </button>
    </div>
  );
};

export default OrderSuccess;