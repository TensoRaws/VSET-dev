import { ref, computed, watchEffect, readonly } from 'vue'

export type ColorMode = 'light' | 'dark' | 'auto'

/**
 * 检测系统颜色模式
 */
export function useColorMode() {
  const preferredDark = ref(false)
  const mode = ref<ColorMode>('auto')

  // 检测系统主题偏好
  const updatePreferredDark = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      preferredDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  // 监听系统主题变化
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    updatePreferredDark()
    
    // 添加监听器
    const handleChange = (e: MediaQueryListEvent) => {
      preferredDark.value = e.matches
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // 清理函数
    watchEffect((onInvalidate) => {
      onInvalidate(() => {
        mediaQuery.removeEventListener('change', handleChange)
      })
    })
  }

  // 计算当前是否为暗色模式
  const isDark = computed(() => {
    if (mode.value === 'dark') return true
    if (mode.value === 'light') return false
    return preferredDark.value // auto 模式下跟随系统
  })

  // 设置模式
  const setMode = (newMode: ColorMode) => {
    mode.value = newMode
  }

  return {
    mode: readonly(mode),
    preferredDark: readonly(preferredDark),
    isDark: readonly(isDark),
    setMode
  }
}

/**
 * 生成颜色变体
 */
export function generateColorVariants(baseColor: string) {
  // 这里可以实现颜色变体生成逻辑
  // 简单实现，返回基础颜色
  return {
    50: lighten(baseColor, 0.9),
    100: lighten(baseColor, 0.8),
    200: lighten(baseColor, 0.6),
    300: lighten(baseColor, 0.4),
    400: lighten(baseColor, 0.2),
    500: baseColor,
    600: darken(baseColor, 0.1),
    700: darken(baseColor, 0.2),
    800: darken(baseColor, 0.3),
    900: darken(baseColor, 0.4)
  }
}

/**
 * 颜色变亮
 */
function lighten(color: string, amount: number): string {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  const newR = Math.min(255, Math.round(r + (255 - r) * amount))
  const newG = Math.min(255, Math.round(g + (255 - g) * amount))
  const newB = Math.min(255, Math.round(b + (255 - b) * amount))
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}

/**
 * 颜色变暗
 */
function darken(color: string, amount: number): string {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  const newR = Math.max(0, Math.round(r * (1 - amount)))
  const newG = Math.max(0, Math.round(g * (1 - amount)))
  const newB = Math.max(0, Math.round(b * (1 - amount)))
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}