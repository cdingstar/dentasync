import React, { useState } from 'react'
import './AddressManagement.css'

function AddressManagement() {
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
    if (!form.receiver || !form.phone || !form.region || !form.detail) return alert('请完整填写表单')
    if (editing) setAddresses(addresses.map(a => a.id === editing.id ? { ...a, ...form } : a))
    else setAddresses([...addresses, { id: String(Date.now()), ...form, isDefault: addresses.length === 0 }])
    setShowEditor(false)
  }

  return (
    <div className="address-page">
      <div className="header">
        <div className="title">地址管理</div>
        <button className="primary" onClick={openAdd}>新增地址</button>
      </div>

      <div className="list">
        {addresses.map(a => (
          <div key={a.id} className="item">
            <div className="row">
              <div className="label">收货人</div>
              <div className="value">{a.receiver}</div>
            </div>
            <div className="row">
              <div className="label">联系电话</div>
              <div className="value">{a.phone}</div>
            </div>
            <div className="row">
              <div className="label">所在地区</div>
              <div className="value">{a.region}</div>
            </div>
            <div className="row">
              <div className="label">详细地址</div>
              <div className="value">{a.detail}</div>
            </div>
            <div className="actions">
              {!a.isDefault ? (
                <button className="link" onClick={() => setDefault(a.id)}>设为默认</button>
              ) : (
                <span className="default">默认地址</span>
              )}
              <button className="link" onClick={() => openEdit(a)}>编辑</button>
              <button className="danger" onClick={() => remove(a.id)}>删除</button>
            </div>
          </div>
        ))}
      </div>

      {showEditor && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary" onClick={() => setShowEditor(false)}>返回</button>
            <div className="page-title">{editing ? '编辑地址' : '新增地址'}</div>
            <button className="primary" onClick={save}>确定</button>
          </div>
          <div className="page-body">
            <Field label="收货人" value={form.receiver} onChange={(t) => setForm({ ...form, receiver: t })} />
            <Field label="联系电话" value={form.phone} onChange={(t) => setForm({ ...form, phone: t })} />
            <Field label="所在地区" value={form.region} onChange={(t) => setForm({ ...form, region: t })} />
            <Field label="详细地址" value={form.detail} onChange={(t) => setForm({ ...form, detail: t })} multiline />
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
