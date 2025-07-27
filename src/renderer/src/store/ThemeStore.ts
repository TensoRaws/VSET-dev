import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { darkTheme, lightTheme } from 'naive-ui'
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'

// 主题模式类型
export type ThemeMode = 'light' | 'dark' | 'auto'

// 预设主题色
export const PRESET_COLORS = {
  blue: '#1890ff',
  purple: '#722ed1',
  cyan: '#13c2c2',
  green: '#52c41a',
  magenta: '#eb2f96',
  pink: '#f759ab',
  red: '#f5222d',
  orange: '#fa8c16',
  yellow: '#fadb14',
  volcano: '#fa541c',
  geekblue: '#2f54eb',
  lime: '#a0d911',
  gold: '#faad14'
} as const

export type PresetColorKey = keyof typeof PRESET_COLORS

// 主题配置接口
interface ThemeConfig {
  mode: ThemeMode
  primaryColor: string
}

export const useThemeStore = defineStore('theme', () => {
  // 响应式状态
  const themeMode = ref<ThemeMode>('auto')
  const primaryColor = ref<string>(PRESET_COLORS.blue)
  const systemPrefersDark = ref(false)

  // 检测系统主题偏好
  const updateSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  // 监听系统主题变化
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    updateSystemTheme()
    
    const handleChange = (e: MediaQueryListEvent) => {
      systemPrefersDark.value = e.matches
    }
    
    mediaQuery.addEventListener('change', handleChange)
  }

  // 计算当前是否为暗色主题
  const isDark = computed(() => {
    if (themeMode.value === 'auto') {
      return systemPrefersDark.value
    }
    return themeMode.value === 'dark'
  })

  // 计算当前主题
  const theme = computed<GlobalTheme | null>(() => {
    return isDark.value ? darkTheme : lightTheme
  })

  // 生成主题覆盖配置
  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    const baseOverrides: GlobalThemeOverrides = {
      common: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        primaryColor: primaryColor.value,
        primaryColorHover: adjustColor(primaryColor.value, 0.1),
        primaryColorPressed: adjustColor(primaryColor.value, -0.1),
        primaryColorSuppl: adjustColor(primaryColor.value, 0.05)
      }
    }

    return baseOverrides
  })

  // 计算属性
  const isAutoMode = computed(() => themeMode.value === 'auto')
  
  const currentThemeConfig = computed<ThemeConfig>(() => ({
    mode: themeMode.value,
    primaryColor: primaryColor.value
  }))

  // 颜色调整辅助函数
  function adjustColor(color: string, amount: number): string {
    const hex = color.replace('#', '')
    const num = parseInt(hex, 16)
    const r = Math.max(0, Math.min(255, (num >> 16) + Math.round(amount * 255)))
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + Math.round(amount * 255)))
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + Math.round(amount * 255)))
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  }

  // 主题切换方法
  const toggleTheme = () => {
    if (themeMode.value === 'auto') {
      setThemeMode('light')
    } else if (themeMode.value === 'light') {
      setThemeMode('dark')
    } else {
      setThemeMode('auto')
    }
  }

  const setDarkTheme = () => {
    setThemeMode('dark')
  }

  const setLightTheme = () => {
    setThemeMode('light')
  }

  const setAutoTheme = () => {
    setThemeMode('auto')
  }

  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
    
    // 更新 body 类名
    if (typeof document !== 'undefined') {
      const body = document.body
      body.classList.remove('light', 'dark')
      
      if (mode === 'auto') {
        body.classList.add(systemPrefersDark.value ? 'dark' : 'light')
      } else {
        body.classList.add(mode)
      }
    }
    
    // 保存到 localStorage
    localStorage.setItem('theme-mode', mode)
  }

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
    localStorage.setItem('theme-primary-color', color)
  }

  const resetToDefaults = () => {
    themeMode.value = 'auto'
    primaryColor.value = PRESET_COLORS.blue
    
    // 清除 localStorage
    localStorage.removeItem('theme-mode')
    localStorage.removeItem('theme-primary-color')
    
    // 重置 body 类名
    if (typeof document !== 'undefined') {
      const body = document.body
      body.classList.remove('light', 'dark')
      body.classList.add(systemPrefersDark.value ? 'dark' : 'light')
    }
  }

  // 初始化：从 localStorage 恢复设置
  const initializeTheme = () => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode
    const savedPrimaryColor = localStorage.getItem('theme-primary-color')

    if (savedMode && ['light', 'dark', 'auto'].includes(savedMode)) {
      themeMode.value = savedMode
    }

    if (savedPrimaryColor) {
      primaryColor.value = savedPrimaryColor
    }

    // 初始化 body 类名
    setThemeMode(themeMode.value)
  }

  // 监听主题模式变化，更新 body 类名
  watch([isDark, themeMode], () => {
    if (typeof document !== 'undefined') {
      const body = document.body
      body.classList.remove('light', 'dark')
      body.classList.add(isDark.value ? 'dark' : 'light')
    }
  }, { immediate: true })

  // 初始化主题
  if (typeof window !== 'undefined') {
    initializeTheme()
  }

  return {
    // 状态
    isDark,
    theme,
    themeOverrides,
    themeMode,
    primaryColor,
    
    // 方法
    toggleTheme,
    setDarkTheme,
    setLightTheme,
    setAutoTheme,
    setThemeMode,
    setPrimaryColor,
    resetToDefaults,
    
    // 计算属性
    isAutoMode,
    currentThemeConfig
  }
})