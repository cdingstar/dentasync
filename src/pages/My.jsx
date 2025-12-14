import React, { useEffect, useState } from 'react'
import './My.css'
import { useLanguage } from '../context/LanguageContext'

function My({ onLogout }) {
  const { t, language, setLanguage } = useLanguage()
  const [showProfile, setShowProfile] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showLanguage, setShowLanguage] = useState(false)
  const [profile, setProfile] = useState({ name: 'Dr. 张医生', phone: '13800000000', email: 'asiantechdentallab@gmail.com' })
  const [pwd, setPwd] = useState({ old: '', next: '', confirm: '' })

  const saveProfile = () => { setShowProfile(false) }
  const savePassword = () => {
    if (!pwd.next || pwd.next !== pwd.confirm) return alert(t('my.passwordMismatch'))
    setShowChangePassword(false)
  }

  useEffect(() => {
    const handler = () => setShowAbout(true)
    window.addEventListener('openAboutFromHeader', handler)
    return () => window.removeEventListener('openAboutFromHeader', handler)
  }, [])

  // Safe access to __BUILD_DATE__
  // eslint-disable-next-line no-undef
  const buildDate = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : 'Dev'

  return (
    <div className="my-page">
      <div className="profile">
        <div className="avatar">DS</div>
        <div>
          <div className="name">{profile.name}</div>
          <div className="role">DentaSync V1.0({buildDate})</div>
        </div>
      </div>

      <div className="menu">
        <div className="menu-item" onClick={() => setShowProfile(true)}>
          <div className="menu-left">
            <div className="menu-icon">🖼️</div>
            <div>{t('my.profile')}</div>
          </div>
          <div>›</div>
        </div>
        
        <div className="menu-item" onClick={() => setShowChangePassword(true)}>
          <div className="menu-left">
            <div className="menu-icon">🔍</div>
            <div>{t('my.changePassword')}</div>
          </div>
          <div>›</div>
        </div>

        <div className="menu-item" onClick={() => setShowLanguage(true)}>
          <div className="menu-left">
            <div className="menu-icon">🌐</div>
            <div>{t('my.language')}</div>
          </div>
          <div className="menu-right" style={{display:'flex', alignItems:'center'}}>
             <span style={{marginRight: 8, color: '#999', fontSize: 14}}>
               {language === 'zh' ? t('my.chinese') : t('my.english')}
             </span>
             <div>›</div>
          </div>
        </div>

        <div className="menu-item" onClick={onLogout}>
          <div className="menu-left">
            <div className="menu-icon">↻</div>
            <div>{t('my.logout')}</div>
          </div>
          <div>›</div>
        </div>
      </div>

      {showProfile && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary" onClick={() => setShowProfile(false)}>{t('common.back')}</button>
            <div className="page-title">{t('my.profile')}</div>
            <button className="primary" onClick={saveProfile}>{t('common.confirm')}</button>
          </div>
          <div className="page-body">
            <Field label={t('my.name')} value={profile.name} onChange={(t) => setProfile({ ...profile, name: t })} />
            <Field label={t('my.phone')} value={profile.phone} onChange={(t) => setProfile({ ...profile, phone: t })} />
            <Field label={t('my.email')} value={profile.email} onChange={(t) => setProfile({ ...profile, email: t })} />
          </div>
        </div>
      )}

      {showChangePassword && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary" onClick={() => setShowChangePassword(false)}>{t('common.back')}</button>
            <div className="page-title">{t('my.changePassword')}</div>
            <button className="primary" onClick={savePassword}>{t('common.confirm')}</button>
          </div>
          <div className="page-body">
            <Field label={t('my.oldPassword')} value={pwd.old} onChange={(t) => setPwd({ ...pwd, old: t })} />
            <Field label={t('my.newPassword')} value={pwd.next} onChange={(t) => setPwd({ ...pwd, next: t })} />
            <Field label={t('my.confirmPassword')} value={pwd.confirm} onChange={(t) => setPwd({ ...pwd, confirm: t })} />
          </div>
        </div>
      )}

      {showLanguage && (
         <div className="page-overlay">
            <div className="page-header">
               <button className="primary" onClick={() => setShowLanguage(false)}>{t('common.back')}</button>
               <div className="page-title">{t('my.language')}</div>
               <div style={{width: 40}}></div>
            </div>
            <div className="page-body">
               <div className="menu-item" onClick={() => { setLanguage('zh'); setShowLanguage(false); }}>
                  <div>{t('my.chinese')}</div>
                  {language === 'zh' && <div style={{color:'#1677ff'}}>✓</div>}
               </div>
               <div className="menu-item" onClick={() => { setLanguage('en'); setShowLanguage(false); }}>
                  <div>{t('my.english')}</div>
                  {language === 'en' && <div style={{color:'#1677ff'}}>✓</div>}
               </div>
            </div>
         </div>
       )}

  {showAbout && (
    <div className="page-overlay">
          <div className="page-header">
            <div className="page-title">{t('my.about')}</div>
            <button className="primary" onClick={() => setShowAbout(false)}>{t('common.close')}</button>
          </div>
          <div className="page-body">
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
              <div style={{ width:64, height:64, borderRadius:12, background:'#1677ff', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700 }}>DS</div>
              <div style={{ fontSize:16, fontWeight:600 }}>DentaSync</div>
              <div style={{ fontSize:12, color:'#8c8c8c' }}>{t('my.version')} V1.0 (Build {buildDate})</div>
            </div>
            <div style={{ marginTop:12 }}>
              <div style={{ fontSize:14, fontWeight:600, marginBottom:8, color:'#333', borderBottom:'1px solid #f0f0f0', paddingBottom:8 }}>{t('my.companyInfo')}</div>
              <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>{t('my.companyName')}：</strong>PREMIER DENTAL SERVICE PTE. LTD.</div>
              <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>{t('my.operator')}：</strong>ASIANTECH PTE. LTD.</div>
            </div>
            <div style={{ marginTop:12 }}>
              <div style={{ fontSize:14, fontWeight:600, marginBottom:8, color:'#333', borderBottom:'1px solid #f0f0f0', paddingBottom:8 }}>{t('my.contact')}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ padding:12, border:'1px solid #f0f0f0', borderRadius:8 }}>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:6, color:'#1677ff' }}>{t('my.businessContact')}</div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>{t('my.contactPerson')}：</strong>Tom Huang</div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>{t('my.phone')}：</strong><a href="tel:+6598625613" style={{ color:'#1677ff' }}>+65 98625613</a></div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>{t('my.email')}：</strong><a href="mailto:asiantechdentallab@gmail.com" style={{ color:'#1677ff' }}>asiantechdentallab@gmail.com</a></div>
                </div>
                <div style={{ padding:12, border:'1px solid #f0f0f0', borderRadius:8 }}>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:6, color:'#1677ff' }}>{t('my.techSupport')}</div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}><strong>{t('my.email')}：</strong><a href="mailto:cdingstar@gmail.com" style={{ color:'#1677ff' }}>cdingstar@gmail.com</a></div>
                  <div style={{ fontSize:13, color:'#666', lineHeight:'1.8' }}>{t('my.feedback')}</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop:20, paddingTop:12, borderTop:'1px solid #f0f0f0', textAlign:'center', color:'#9aa0a6', fontSize:12, letterSpacing:0.4 }}>
              {t('my.copyright')}
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
