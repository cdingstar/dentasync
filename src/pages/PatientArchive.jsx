import React, { useEffect, useMemo, useState } from 'react'
import './PatientArchive.css'
import { useLanguage } from '../context/LanguageContext'

function PatientArchive() {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ patientName: '', phone: '', gender: '', birthday: '', addPerson: '黄向荣', notes: '' })
  const [data, setData] = useState([
    { id: '1', patientName: 'lee siew ngoh', patientId: '22603908', phone: '+65 1234 5678', gender: '女', birthday: '1985-06-15', addPerson: '黄向荣', clinic: 'ASIANTECH PTE. LTD.', notes: '', createTime: '2025-11-08 11:04:14' },
    { id: '2', patientName: 'Roslan Bin Mohd Sayir', patientId: 'PA0296', phone: '+65 9876 5432', gender: '男', birthday: '1978-03-22', addPerson: '黄向荣', clinic: 'ASIANTECH PTE. LTD.', notes: '', createTime: '2025-11-06 09:44:37' }
  ])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return data
    return data.filter(x => x.patientName.toLowerCase().includes(s) || x.patientId.toLowerCase().includes(s) || x.phone.toLowerCase().includes(s))
  }, [search, data])

  useEffect(() => {
    const handler = (e) => {
      const { page, query } = e.detail || {}
      if (page === 'patient') {
        setSearch(query || '')
      }
    }
    window.addEventListener('globalSearch', handler)
    return () => window.removeEventListener('globalSearch', handler)
  }, [])

  const openAdd = () => { setEditing(null); setForm({ patientName: '', phone: '', gender: '', birthday: '', addPerson: '黄向荣', notes: '' }); setShowEditor(true) }
  const openEdit = (item) => { setEditing(item); setForm({ patientName: item.patientName, phone: item.phone, gender: item.gender, birthday: item.birthday, addPerson: item.addPerson, notes: item.notes }); setShowEditor(true) }
  const remove = (id) => setData(data.filter(x => x.id !== id))
  const save = () => {
    if (!form.patientName || !form.phone) return alert(t('patient.pleaseEnterNameAndPhone'))
    if (editing) setData(data.map(x => x.id === editing.id ? { ...editing, ...form } : x))
    else setData([{ id: String(Date.now()), patientId: `PA${Date.now().toString().slice(-6)}`, clinic: 'ASIANTECH PTE. LTD.', createTime: new Date().toISOString().replace('T',' ').slice(0,19), ...form }, ...data])
    setShowEditor(false)
  }

  return (
    <div className="patient-page">
      <div className="header">
        <div className="title">{t('patient.title')}</div>
        <div className="tools">
          <button className="primary" onClick={openAdd}>{t('patient.add')}</button>
        </div>
      </div>

      <div className="list">
        {filtered.map((x, idx) => (
          <div key={x.id} className="card">
            <div className="row top">
              <div className="index">{String(idx + 1).padStart(2,'0')}</div>
              <div className="pid">{x.patientId}</div>
              <div className="time">{x.createTime}</div>
            </div>
            <div className="row">
              <div className="label">{t('patient.name')}</div>
              <div className="value name">{x.patientName}</div>
            </div>
            <div className="row">
              <div className="label">{t('patient.phone')}</div>
              <div className="value">{x.phone}</div>
            </div>
            <div className="row">
              <div className="label">{t('patient.gender')}</div>
              <div className="value">{x.gender || t('patient.unknown')}</div>
            </div>
            <div className="row">
              <div className="label">{t('patient.birthday')}</div>
              <div className="value">{x.birthday || '-'}</div>
            </div>
            <div className="row">
              <div className="label">{t('patient.creator')}</div>
              <div className="value">{x.addPerson}</div>
            </div>
            <div className="row">
              <div className="label">{t('patient.notes')}</div>
              <div className="value">{x.notes || '-'}</div>
            </div>
            <div className="actions">
              <button className="link" onClick={() => openEdit(x)}>{t('common.edit')}</button>
              <button className="danger" onClick={() => remove(x.id)}>{t('common.delete')}</button>
            </div>
          </div>
        ))}
      </div>

      {showEditor && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary" onClick={() => setShowEditor(false)}>{t('common.back')}</button>
            <div className="page-title">{editing ? t('patient.edit') : t('patient.add')}</div>
            <button className="primary" onClick={save}>{t('common.confirm')}</button>
          </div>
          <div className="page-body">
            <Field label={t('patient.name')} value={form.patientName} onChange={(t) => setForm({ ...form, patientName: t })} />
            <Field label={t('patient.phone')} value={form.phone} onChange={(t) => setForm({ ...form, phone: t })} />
            <Field label={t('patient.gender')} value={form.gender} onChange={(t) => setForm({ ...form, gender: t })} />
            <Field label={t('patient.birthday')} value={form.birthday} onChange={(t) => setForm({ ...form, birthday: t })} />
            <Field label={t('patient.creator')} value={form.addPerson} onChange={(t) => setForm({ ...form, addPerson: t })} />
            <Field label={t('patient.notes')} value={form.notes} onChange={(t) => setForm({ ...form, notes: t })} multiline />
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange, multiline }) {
  return (
    <div className="field">
      <div className="field-label">{label}</div>
      {multiline ? (
        <textarea className="field-input textarea" value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} />
      ) : (
        <input className="field-input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} />
      )}
    </div>
  )
}

export default PatientArchive
