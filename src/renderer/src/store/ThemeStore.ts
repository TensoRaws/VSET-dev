import { darkTheme, lightTheme, type GlobalTheme } from 'naive-ui'
import { useColorMode, useCycleList, type BasicColorSchema } from '@vueuse/core'

export const useThemeStore = defineStore('theme', (): {
  isDark: Ref<boolean>
  theme: Ref<GlobalTheme | null>
  toggleTheme: () => void
  setDarkTheme: () => void
  setLightTheme: () => void
} => {
  const isDark = ref(true) // 默认暗色主题
  const theme = ref<GlobalTheme | null>(darkTheme)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    theme.value = isDark.value ? darkTheme : lightTheme
  }

  const setDarkTheme = () => {
    isDark.value = true
    theme.value = darkTheme
  }

  const setLightTheme = () => {
    isDark.value = false
    theme.value = lightTheme
  }

  return {
    isDark,
    theme,
    toggleTheme,
    setDarkTheme,
    setLightTheme
  }
})