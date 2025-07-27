import { createI18n } from 'vue-i18n'
import zh from '../locales/zh.json'
import en from '../locales/en.json'

export type Language = 'zh' | 'en'

// 获取浏览器语言或本地存储的语言设置
const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem('language') as Language
  if (stored && ['zh', 'en'].includes(stored)) {
    return stored
  }
  
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) {
    return 'zh'
  }
  
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLanguage(),
  fallbackLocale: 'en',
  messages: {
    zh,
    en
  }
})

export default i18n