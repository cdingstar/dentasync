import React from 'react'
import Select from '../../../components/Select'

function PatientInfoSection({ form, updateForm }) {
  return (
    <div className="qo-section">
      <div className="qo-section-title">患者信息</div>
      <div className="qo-section-content">
        <div className="qo-row"><div className="qo-label">患者</div><input className="qo-input" value={form.patientName} onChange={(e)=>updateForm('patientName', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">患者手机号</div><input className="qo-input" value={form.patientPhone} onChange={(e)=>updateForm('patientPhone', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">性别</div><Select className="qo-select" value={form.gender} onChange={(v)=>updateForm('gender', v)} options={["男","女"]} /></div>
        <div className="qo-row"><div className="qo-label">年龄</div><input className="qo-input" value={form.age} onChange={(e)=>updateForm('age', e.target.value)} /></div>
      </div>
    </div>
  )
}

export default PatientInfoSection

