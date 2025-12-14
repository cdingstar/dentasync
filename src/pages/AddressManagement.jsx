import React, { useState } from 'react'
import './AddressManagement.css'
import { useLanguage } from '../context/LanguageContext'

function AddressManagement() {
  const { t } = useLanguage()
  const [addresses, setAddresses] = useState([
    { id: '1', receiver: '朱华昌', phone: '13410490092', region: '中国 / 广东省 / 深圳市 / 宝安区', detail: '福海街道荔园路56号恺辉茂工业园A411(请转:黄总)', isDefault: true },
    { id: '2', receiver: '黄向荣', phone: '006598625613', region: 'Singapore', detail: '994 Bendemeer Road, #02-04 B-Central', isDefault: false }
  ])
  const [showEditor, setShowEditor] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ receiver: '', phone: '', region: '', detail: '' })

  const openAdd = () => { setEditing(null); setForm({ receiver: '', phone: '', region: '', detail: '' }); setShowEditor(true) }
  const openEdit = (item) => { setEditing(item); setForm({ receiver: item.receiver, phone: item.phone, region: item.region, detail: item.detail }); setShowEditor(true) }
  const remove = (id) => setAddresses(addresses.filter(a => a.id !== id))
  const setDefault = (id) => setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })))
  const save = () => {
    if (!form.receiver || !form.phone || !form.region || !form.detail) return alert(t('address.fillForm'))
    if (editing) setAddresses(addresses.map(a => a.id === editing.id ? { ...a, ...form } : a))
    else setAddresses([...addresses, { id: String(Date.now()), ...form, isDefault: addresses.length === 0 }])
    setShowEditor(false)
  }

  return (
    <div className="address-page">
      <div className="header">
        <div className="title">{t('address.title')}</div>
        <button className="primary" onClick={openAdd}>{t('address.add')}</button>
      </div>

      <div className="list">
        {addresses.map(a => (
          <div key={a.id} className="item">
            <div className="row">
              <div className="label">{t('address.receiver')}</div>
              <div className="value">{a.receiver}</div>
            </div>
            <div className="row">
              <div className="label">{t('address.phone')}</div>
              <div className="value">{a.phone}</div>
            </div>
            <div className="row">
              <div className="label">{t('address.region')}</div>
              <div className="value">{a.region}</div>
            </div>
            <div className="row">
              <div className="label">{t('address.detail')}</div>
              <div className="value">{a.detail}</div>
            </div>
            <div className="actions">
              {!a.isDefault ? (
                <button className="link" onClick={() => setDefault(a.id)}>{t('address.setDefault')}</button>
              ) : (
                <span className="default">{t('address.default')}</span>
              )}
              <button className="link" onClick={() => openEdit(a)}>{t('address.edit')}</button>
              <button className="danger" onClick={() => remove(a.id)}>{t('address.delete')}</button>
            </div>
          </div>
        ))}
      </div>

      {showEditor && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary" onClick={() => setShowEditor(false)}>{t('address.back')}</button>
            <div className="page-title">{editing ? t('address.edit') : t('address.add')}</div>
            <button className="primary" onClick={save}>{t('address.confirm')}</button>
          </div>
          <div className="page-body">
            <Field label={t('address.receiver')} value={form.receiver} onChange={(t) => setForm({ ...form, receiver: t })} />
            <Field label={t('address.phone')} value={form.phone} onChange={(t) => setForm({ ...form, phone: t })} />
            <Field label={t('address.region')} value={form.region} onChange={(t) => setForm({ ...form, region: t })} />
            <Field label={t('address.detail')} value={form.detail} onChange={(t) => setForm({ ...form, detail: t })} multiline />
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

export default AddressManagement
