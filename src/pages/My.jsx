import React, { useEffect, useState } from 'react'
import './My.css'

function My({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [profile, setProfile] = useState({ name: 'Dr. 张医生', phone: '13800000000', email: 'asiantechdentallab@gmail.com' })
  const [pwd, setPwd] = useState({ old: '', next: '', confirm: '' })

  const saveProfile = () => { setShowProfile(false) }
  const savePassword = () => {
    if (!pwd.next || pwd.next !== pwd.confirm) return alert('两次输入的密码不一致')
    setShowChangePassword(false)
  }

  useEffect(() => {
    const handler = () => setShowAbout(true)
    window.addEventListener('openAboutFromHeader', handler)
    return () => window.removeEventListener('openAboutFromHeader', handler)
  }, [])

  return (
    <div className="my-page">
      <div className="profile">
        <div className="avatar">DS</div>
        <div>
          <div className="name">{profile.name}</div>
          <div className="role">DentaSync V1.0</div>
        </div>
      </div>

      <div className="menu">
        <div className="menu-item" onClick={() => setShowProfile(true)}>
          <div className="menu-left">
            <div className="menu-icon">🖼️</div>
            <div>个人信息</div>
          </div>
          <div>›</div>
        </div>
        
        <div className="menu-item" onClick={() => setShowChangePassword(true)}>
          <div className="menu-left">
            <div className="menu-icon">🔍</div>
            <div>修改密码</div>
          </div>
          <div>›</div>
        </div>
        <div className="menu-item" onClick={onLogout}>
          <div className="menu-left">
            <div className="menu-icon">↻</div>
            <div>退出登录</div>
          </div>
          <div>›</div>
        </div>
      </div>

      {showProfile && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary" onClick={() => setShowProfile(false)}>返回</button>
            <div className="page-title">个人信息</div>
            <button className="primary" onClick={saveProfile}>确定</button>
          </div>
          <div className="page-body">
            <Field label="姓名" value={profile.name} onChange={(t) => setProfile({ ...profile, name: t })} />
            <Field label="手机" value={profile.phone} onChange={(t) => setProfile({ ...profile, phone: t })} />
            <Field label="邮箱" value={profile.email} onChange={(t) => setProfile({ ...profile, email: t })} />
          </div>
        </div>
      )}

      {showChangePassword && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary" onClick={() => setShowChangePassword(false)}>返回</button>
            <div className="page-title">修改密码</div>
            <button className="primary" onClick={savePassword}>确定</button>
          </div>
          <div className="page-body">
            <Field label="旧密码" value={pwd.old} onChange={(t) => setPwd({ ...pwd, old: t })} />
            <Field label="新密码" value={pwd.next} onChange={(t) => setPwd({ ...pwd, next: t })} />
            <Field label="确认新密码" value={pwd.confirm} onChange={(t) => setPwd({ ...pwd, confirm: t })} />
          </div>
        </div>
      )}

      

  {showAbout && (
    <div className="page-overlay">
          <div className="page-header">
            <div className="page-title">关于我们</div>
            <button className="primary" onClick={() => setShowAbout(false)}>关闭</button>
          </div>
          <div className="page-body">
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
              <div style={{ width:64, height:64, borderRadius:12, background:'#1677ff', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700 }}>DS</div>
              <div style={{ fontSize:16, fontWeight:600 }}>DentaSync</div>
              <div style={{ fontSize:12, color:'#8c8c8c' }}>版本 V1.0 (Build 1.0.1121)</div>
            </div>
            <div style={{ marginTop:12 }}>
              <div style={{ fontSize:14, fontWeight:600, marginBottom:8, color:'#333', borderBottom:'1px solid #f0f0f0', paddingBottom:8 }}>公司信息</div>
              <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>公司名称：</strong>PREMIER DENTAL SERVICE PTE. LTD.</div>
              <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>运营单位：</strong>ASIANTECH PTE. LTD.</div>
            </div>
            <div style={{ marginTop:12 }}>
              <div style={{ fontSize:14, fontWeight:600, marginBottom:8, color:'#333', borderBottom:'1px solid #f0f0f0', paddingBottom:8 }}>联系我们</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ padding:12, border:'1px solid #f0f0f0', borderRadius:8 }}>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:6, color:'#1677ff' }}>业务联系</div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>联系人：</strong>Tom Huang</div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>电话：</strong><a href="tel:+6598625613" style={{ color:'#1677ff' }}>+65 98625613</a></div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>邮箱：</strong><a href="mailto:asiantechdentallab@gmail.com" style={{ color:'#1677ff' }}>asiantechdentallab@gmail.com</a></div>
                </div>
                <div style={{ padding:12, border:'1px solid #f0f0f0', borderRadius:8 }}>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:6, color:'#1677ff' }}>产品技术反馈</div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>邮箱：</strong><a href="mailto:cdingstar@gmail.com" style={{ color:'#1677ff' }}>cdingstar@gmail.com</a></div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}>欢迎反馈产品问题或改进建议</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop:20, paddingTop:12, borderTop:'1px solid #f0f0f0', textAlign:'center', color:'#9aa0a6', fontSize:12, letterSpacing:0.4 }}>
              © 2025 PREMIER DENTAL SERVICE PTE. LTD. · ALL RIGHTS RESERVED
            </div>
          </div>
      </div>
    )}
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <div className="field">
      <div className="field-label">{label}</div>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} />
    </div>
  )
}

export default My
