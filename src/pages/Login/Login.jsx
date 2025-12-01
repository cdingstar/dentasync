import React, { useState } from 'react'
import './Login.css'

function Login({ onSubmit }) {
  const [username, setUsername] = useState('asiantechdentallab@gmail.com')
  const [password, setPassword] = useState('asiantech001')
  const [role, setRole] = useState('诊所-管理员')

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
          <p className="system-version">V1.0</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input className="input" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="input" placeholder="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="诊所-管理员">诊所-管理员</option>
            <option value="工厂-管理员">工厂-管理员</option>
            <option value="客服">客服</option>
            <option value="技师">技师</option>
          </select>
          <div className="login-actions">
            <button type="submit" className="login-button">登录</button>
          </div>
        </form>

        <div className="login-footer">Premium Dental Services Pte. Ltd.</div>
      </div>
    </div>
  )
}

export default Login

