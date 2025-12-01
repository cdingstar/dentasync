import React, { useMemo, useState } from 'react'
import './OrderDetail.css'

function OrderDetail({ order, onClose }) {
  const [activeTab, setActiveTab] = useState('detail')

  const data = useMemo(() => ({
    orderNo: order?.id || 'ORD-2024-001',
    patientName: order?.patientName || 'lee siew ngoh',
    doctor: order?.doctorName || '黄向荣',
    createTime: order?.createTime || '2025-11-10 10:30:00',
    practiceUnit: order?.clinic || 'ASIANTECH PTE. LTD.',
    responsibleUnit: order?.factory || '南宁市后齐科技',
    deliveryTime: order?.expectedTime || '2025-11-12 12:30:00',
    progress: 65,
    status: order?.status || 'processing',
    orderType: '标准订单',
    orderCategory: order?.productType || '全瓷牙冠',
    clinic: order?.clinic || 'ASIANTECH PTE. LTD.',
    factory: order?.factory || '南宁市后齐科技',
    receiver: '朱华昌',
    address: '中国广东省深圳市宝安区福海街道展城社区',
    patientPhone: '13800138000',
    gender: '女',
    age: '45',
    productName: order?.productType || '全瓷牙冠',
    toothPosition: order?.toothPosition || '11, 12, 13',
    repairMethod: '新做',
    moldingMethod: '口扫',
    scanDevice: '先临',
    connectionMethod: '单冠',
    mainColor: 'A2',
    neckColor: 'A1',
    middleColor: 'A2',
    cuttingEdgeColor: 'A3',
    remarks: '请注意患者对颜色要求较高，需要特别注意颜色匹配',
    trialStatus: '试戴蜡型外形',
    designSchemes: ['前牙美学设计', '咬合重建'],
    attachments: [
      { name: '旧模', count: 2 },
      { name: '咬胶', count: 1 },
      { name: '定位柱', count: 3 }
    ],
    uploadedImages: [
      { name: '口内照片1.jpg', url: '/api/placeholder/200/200' },
      { name: '口内照片2.jpg', url: '/api/placeholder/200/200' },
      { name: 'X光片.jpg', url: '/api/placeholder/200/200' }
    ],
    uploadedFiles: [
      { name: '扫描文件.stl' },
      { name: '设计方案.pdf' },
      { name: '患者病历.doc' }
    ],
    threeDFile: 'https://example.com/3d-model.stl',
    progressNodes: [
      { id: 1, time: '2025-11-10 10:35:00', operator: '张三', action: '已接单', description: '订单已被接单，准备安排生产', images: [], files: [] },
      { id: 2, time: '2025-11-10 14:20:00', operator: '张三', action: '安排生产', description: '已安排给李四开始生产', images: [], files: [] },
      { id: 3, time: '2025-11-11 09:15:00', operator: '李四', action: '生产完成', description: '生产进度达到100%，完成生产', images: [], files: [] }
    ]
  }), [order])

  const statusTextMap = {
    pending: '待接单', accepted: '已接单', processing: '制作中', shipped: '已发货', received: '已收货', completed: '已完成'
  }

  return (
    <div className="order-detail-page">
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

      <div className="order-basic-info">
        <div className="kv-list">
          <div className="kv-row"><span className="kv-label">订单号:</span><span className="kv-value">{data.orderNo}</span></div>
          <div className="kv-row"><span className="kv-label">状态:</span><span className="kv-value">{statusTextMap[data.status] || '未知状态'}</span></div>
          <div className="kv-row"><span className="kv-label">患者:</span><span className="kv-value">{data.patientName}</span></div>
          <div className="kv-row"><span className="kv-label">医生:</span><span className="kv-value">{data.doctor}</span></div>
          <div className="kv-row"><span className="kv-label">执业单位:</span><span className="kv-value">{data.practiceUnit}</span></div>
          <div className="kv-row"><span className="kv-label">责任单位:</span><span className="kv-value">{data.responsibleUnit}</span></div>
          <div className="kv-row"><span className="kv-label">下单时间:</span><span className="kv-value">{data.createTime}</span></div>
          <div className="kv-row"><span className="kv-label">预计到货:</span><span className="kv-value">{data.deliveryTime}</span></div>
          <div className="kv-row"><span className="kv-label">生产进度:</span><span className="kv-value">{data.progress}%</span></div>
        </div>
      </div>

      <div className="detail-tabs">
        {['detail', 'progress'].map(tab => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'detail' ? '订单详情' : '订单状态'}
          </div>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'detail' && (
          <div className="tab-panel">
            <div className="section-title">收件信息</div>
            <div className="product-item" style={{ marginBottom: 12 }}>
              <div className="product-name">收件人：{data.receiver || '-'}</div>
              <div className="product-name">电话：{order?.receiverPhone || '-'}</div>
              <div className="product-name">收件地址：{data.address || '-'}</div>
            </div>

            <div className="section-title">患者信息</div>
            <div className="product-item" style={{ marginBottom: 12 }}>
              <div className="product-name">姓名：{data.patientName}</div>
              <div className="product-name">手机号：{data.patientPhone}</div>
              <div className="product-name">性别：{data.gender}</div>
              <div className="product-name">年龄：{data.age}</div>
            </div>

            <div className="section-title">产品信息</div>
            <div className="product-item" style={{ marginBottom: 12 }}>
              <div className="product-name">产品名称：{data.productName}</div>
              <div className="product-name">牙位：<span className="tooth-grid">{renderToothGrid(data.toothPosition || '')}</span></div>
              <div className="product-name">修复方式：{data.repairMethod}</div>
              <div className="product-name">取模方式：{data.moldingMethod}</div>
              <div className="product-name">扫描设备：{data.scanDevice}</div>
              <div className="product-name">连接方式：{data.connectionMethod}</div>
            </div>

            {(data.mainColor || data.neckColor || data.middleColor || data.cuttingEdgeColor || data.baseColor || data.toothBodyColor || data.customColor) && (
              <>
                <div className="section-title">颜色设定</div>
                <div className="product-item" style={{ marginBottom: 12 }}>
                  <div className="product-name">牙位：<span className="tooth-grid">{renderToothGrid(data.toothPosition || '')}</span></div>
                  <div className="product-name">主色：{data.mainColor || '-'}</div>
                  <div className="product-name">颈部颜色：{data.neckColor || '-'}</div>
                  <div className="product-name">中部颜色：{data.middleColor || '-'}</div>
                  <div className="product-name">切端颜色：{data.cuttingEdgeColor || '-'}</div>
                  <div className="product-name">基牙颜色：{data.baseColor || '-'}</div>
                  <div className="product-name">牙体颜色：{data.toothBodyColor || '-'}</div>
                  <div className="product-name">自定义色：{data.customColor || '-'}</div>
                </div>
              </>
            )}

            {data.remarks && (
              <>
                <div className="section-title">备注信息</div>
                <div className="product-item" style={{ marginBottom: 12 }}>
                  <div className="product-name">{data.remarks}</div>
                </div>
              </>
            )}

            <div className="section-title">其他设置</div>
            <div className="product-item" style={{ marginBottom: 12 }}>
              <div className="product-name">试戴情况：{data.trialStatus}</div>
            </div>

            {data.designSchemes && data.designSchemes.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div className="section-title">设计方案</div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {data.designSchemes.map((scheme, index) => (
                    <div key={index} style={{ border: '1px solid #d9d9d9', borderRadius: 8, padding: 8, minWidth: 100, textAlign: 'center', background: '#f8f9fa' }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>🦷</div>
                      <div style={{ fontSize: 12 }}>{scheme}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.attachments && data.attachments.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div className="section-title">附件</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {data.attachments.map((attachment, index) => (
                    <div key={index} style={{ background: '#4285f4', color: '#fff', borderRadius: 4, padding: '4px 8px', fontSize: 12 }}>{attachment.name} × {attachment.count}</div>
                  ))}
                </div>
              </div>
            )}

            {data.uploadedImages && data.uploadedImages.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div className="section-title">上传的图片</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {data.uploadedImages.map((img, index) => (
                    <div key={index} style={{ width: 100, height: 100, border: '1px solid #d9d9d9', borderRadius: 4, overflow: 'hidden' }}>
                      <img src={img.url || img} alt={img.name || `图片${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.uploadedFiles && data.uploadedFiles.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div className="section-title">上传的文件</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {data.uploadedFiles.map((file, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#f5f5f5', borderRadius: 8, border: '1px solid #e0e0e0' }}>
                      <span style={{ fontSize: 18, marginRight: 8 }}>📄</span>
                      <span style={{ flex: 1 }}>{file.name || file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(data.uploaded3DFiles && data.uploaded3DFiles.length > 0) || data.threeDFile ? (
              <div style={{ marginTop: 12 }}>
                <div className="section-title">3D文件</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {Array.isArray(data.uploaded3DFiles) && data.uploaded3DFiles.length > 0 ? (
                    data.uploaded3DFiles.map((file, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#f5f5f5', borderRadius: 8, border: '1px solid #e0e0e0' }}>
                        <span style={{ fontSize: 18, marginRight: 8 }}>📄</span>
                        <span style={{ flex: 1 }}>{file.name || file}</span>
                      </div>
                    ))
                  ) : (
                    data.threeDFile ? (
                      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', background: '#f5f5f5', borderRadius: 8, border: '1px solid #e0e0e0' }}>
                        <span style={{ fontSize: 18, marginRight: 8 }}>📄</span>
                        <a href={data.threeDFile} target="_blank" rel="noreferrer" style={{ flex: 1 }}>查看3D文件</a>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="tab-panel">
            <div className="section-title">订单状态记录</div>
            <div className="timeline-list">
              {data.progressNodes.map((node) => (
                <div key={node.id} className="timeline-node">
                  <div className="node-header">
                    <span className="node-action">{node.action}</span>
                    <span className="node-time">{node.time}</span>
                  </div>
                  <div className="node-description">{node.description}</div>
                  {node.operator && <div className="node-operator">操作人：{node.operator}</div>}
                  {node.images && node.images.length > 0 && (
                    <div className="node-images">
                      {node.images.map((img, idx) => (
                        <img key={idx} src={img.url || img} alt={img.name || `图片${idx + 1}`} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
                      ))}
                    </div>
                  )}
                  {node.files && node.files.length > 0 && (
                    <div className="node-files">
                      {node.files.map((file, idx) => (
                        <div key={idx} className="file-item-small">📄 {file.name || file}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetail

function renderToothGrid(toothStr){
  const arr = String(toothStr||'').split(',').filter(Boolean)
  const quadrants = { TL:[], TR:[], BL:[], BR:[] }
  arr.forEach(code=>{
    const q = code.trim()[0]
    const d = code.trim()[1]
    if(q==='2') quadrants.TL.push(d)
    else if(q==='1') quadrants.TR.push(d)
    else if(q==='3') quadrants.BL.push(d)
    else if(q==='4') quadrants.BR.push(d)
  })
  return (
    <>
      <div className="tooth-row">
        <div className="tooth-cell-display">{quadrants.TL.join(',')}</div>
        <div className="tooth-cell-display">{quadrants.TR.join(',')}</div>
      </div>
      <div className="tooth-row">
        <div className="tooth-cell-display">{quadrants.BL.join(',')}</div>
        <div className="tooth-cell-display">{quadrants.BR.join(',')}</div>
      </div>
    </>
  )
}
