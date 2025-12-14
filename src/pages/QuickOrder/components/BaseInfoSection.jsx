import React from 'react'
import Select from '../../../components/Select'
import { useLanguage } from '../../../context/LanguageContext'

function BaseInfoSection({ form, updateForm }) {
  const { t } = useLanguage()
  
  const factoryOptions = [
    { label: t('common.factories.f1'), value: 'f1' },
    { label: t('common.factories.f2'), value: 'f2' },
    { label: t('common.factories.f3'), value: 'f3' }
  ]

  return (
    <div className="qo-section">
      <div className="qo-section-title">{t('quickOrder.baseInfo')}</div>
      <div className="qo-section-content">
        <div className="qo-row"><div className="qo-label">{t('orders.clinic')}</div><input className="qo-input" value={form.clinic} onChange={(e)=>updateForm('clinic', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">{t('orders.doctor')}</div><input className="qo-input" value={form.doctor} onChange={(e)=>updateForm('doctor', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">{t('orders.factory')}</div><Select className="qo-select" value={form.factory} onChange={(v)=>updateForm('factory', v)} options={factoryOptions} /></div>
        <div className="qo-row"><div className="qo-label">{t('orderDetail.receiverInfo.receiver')}</div><input className="qo-input" value={form.receiver} onChange={(e)=>updateForm('receiver', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">{t('orderDetail.receiverInfo.address')}</div><input className="qo-input" value={form.address} onChange={(e)=>updateForm('address', e.target.value)} /></div>
      </div>
    </div>
  )
}

export default BaseInfoSection

