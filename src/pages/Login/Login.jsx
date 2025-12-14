import React, { useState } from 'react'
import './Login.css'
import { useLanguage } from '../../context/LanguageContext'

function Login({ onSubmit }) {
  const { t } = useLanguage()
  const [username, setUsername] = useState('asiantechdentallab@gmail.com')
  const [password, setPassword] = useState('asiantech001')
  const [role, setRole] = useState('诊所-管理员')

  // Safe access to __BUILD_DATE__
  // eslint-disable-next-line no-undef
  const buildDate = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : 'Dev'

  const handleSubmit = (e) => {
    e && e.preventDefault()
    onSubmit && onSubmit({ username, password, tempRole: role })
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo"><div className="logo-icon">DS</div></div>
          <h1 className="system-title">DentaSync</h1>
          <p className="system-version">V1.0 ({buildDate})</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input className="input" placeholder={t('auth.usernamePlaceholder')} value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="input" placeholder={t('auth.passwordPlaceholder')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="诊所-管理员">{t('roles.clinicAdmin')}</option>
            <option value="工厂-管理员">{t('roles.factoryAdmin')}</option>
            <option value="客服">{t('roles.cs')}</option>
            <option value="技师">{t('roles.technician')}</option>
          </select>
          <div className="login-actions">
            <button type="submit" className="login-button">{t('auth.loginButton')}</button>
          </div>
        </form>

        <div className="login-footer">Premium Dental Services Pte. Ltd.</div>
      </div>
    </div>
  )
}

export default Login

