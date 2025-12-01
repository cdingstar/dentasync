import React from 'react'
import Select from '../../../components/Select'

function BaseInfoSection({ form, updateForm }) {
  return (
    <div className="qo-section">
      <div className="qo-section-title">基础信息</div>
      <div className="qo-section-content">
        <div className="qo-row"><div className="qo-label">诊所</div><input className="qo-input" value={form.clinic} onChange={(e)=>updateForm('clinic', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">医生</div><input className="qo-input" value={form.doctor} onChange={(e)=>updateForm('doctor', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">生产单位</div><Select className="qo-select" value={form.factory} onChange={(v)=>updateForm('factory', v)} options={["南宁市谱佳齿科技术中心","优质牙科实验室","精工义齿制作中心"]} /></div>
        <div className="qo-row"><div className="qo-label">收件人</div><input className="qo-input" value={form.receiver} onChange={(e)=>updateForm('receiver', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">收件地址</div><input className="qo-input" value={form.address} onChange={(e)=>updateForm('address', e.target.value)} /></div>
      </div>
    </div>
  )
}

export default BaseInfoSection

