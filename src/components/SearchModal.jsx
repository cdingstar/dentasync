import React, { useEffect, useRef, useState } from 'react'
import './SearchModal.css'

function SearchModal({ visible, placeholder, tip, page, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (visible && inputRef.current) {
      setTimeout(() => {
        inputRef.current && inputRef.current.focus()
      }, 50)
    }
    if (!visible) {
      setQuery('')
    }
  }, [visible])

  const handleSubmit = () => {
    const q = query.trim()
    if (!q) return
    const event = new CustomEvent('globalSearch', { detail: { page, query: q } })
    window.dispatchEvent(event)
    onClose && onClose()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (!visible) return null

  return (
    <div className="search-modal-overlay">
      <div className="search-modal">
        <div className="search-modal-header">
          <div className="search-modal-title">搜索</div>
          <button className="search-modal-cancel" onClick={onClose}>取消</button>
        </div>
        <div className="search-modal-body">
          <div className="search-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {query && (
              <div className="search-clear" onClick={() => setQuery('')}>×</div>
            )}
            <button className="search-btn" onClick={handleSubmit}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              搜索
            </button>
          </div>
          {tip && <div className="search-tip">{tip}</div>}
        </div>
        <div className="search-modal-safe" />
      </div>
    </div>
  )
}

export default SearchModal

