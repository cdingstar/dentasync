import React, { createContext, useContext, useState } from 'react'
import { zh } from '../locales/zh'
import { en } from '../locales/en'

const LanguageContext = createContext()

const translations = { zh, en }

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('zh')

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        return key // Return key if not found
      }
    }
    return value
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
