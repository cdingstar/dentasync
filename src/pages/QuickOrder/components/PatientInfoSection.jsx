import React from 'react'
import Select from '../../../components/Select'
import { useLanguage } from '../../../context/LanguageContext'

function PatientInfoSection({ form, updateForm }) {
  const { t } = useLanguage()

  const genderOptions = [
    { label: t('common.gender.male'), value: 'male' },
    { label: t('common.gender.female'), value: 'female' }
  ]

  return (
    <div className="qo-section">
      <div className="qo-section-title">{t('quickOrder.patientInfo')}</div>
      <div className="qo-section-content">
        <div className="qo-row"><div className="qo-label">{t('patient.labelPatient')}</div><input className="qo-input" value={form.patientName} onChange={(e)=>updateForm('patientName', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">{t('patient.labelPhone')}</div><input className="qo-input" value={form.patientPhone} onChange={(e)=>updateForm('patientPhone', e.target.value)} /></div>
        <div className="qo-row"><div className="qo-label">{t('patient.labelGender')}</div><Select className="qo-select" value={form.gender} onChange={(v)=>updateForm('gender', v)} options={genderOptions} /></div>
        <div className="qo-row"><div className="qo-label">{t('orderDetail.patientInfo.age')}</div><input className="qo-input" value={form.age} onChange={(e)=>updateForm('age', e.target.value)} /></div>
      </div>
    </div>
  )
}

export default PatientInfoSection

