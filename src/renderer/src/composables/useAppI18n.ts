import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { zhCN, enUS, dateZhCN, dateEnUS } from 'naive-ui'
import type { Language } from '../utils/i18n'
import type { ComputedRef, WritableComputedRef } from 'vue'
import type { Composer } from 'vue-i18n'

export function useAppI18n(): {
  locale: WritableComputedRef<string>
  naiveLocale: ComputedRef<typeof zhCN | typeof enUS>
  naiveDateLocale: ComputedRef<typeof dateZhCN | typeof dateEnUS>
  t: Composer['t']
  setLanguage: (language: Language) => void
} {
  const { locale, t } = useI18n()
  
  // Naive UI 语言包
  const naiveLocale = computed(() => {
    return locale.value === 'zh' ? zhCN : enUS
  })
  
  const naiveDateLocale = computed(() => {
    return locale.value === 'zh' ? dateZhCN : dateEnUS
  })
  
  // 设置语言
  const setLanguage = (language: Language) => {
    locale.value = language
    localStorage.setItem('language', language)
  }
  
  return {
    locale,
    naiveLocale,
    naiveDateLocale,
    t,
    setLanguage
  }
}