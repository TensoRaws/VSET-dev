import { computed } from 'vue'
import { useThemeStore } from '@renderer/store/ThemeStore'

export function useThemeClasses() {
  const themeStore = useThemeStore()
  
  const themeClasses = computed(() => ({
    // 背景色
    bgPrimary: themeStore.isDark ? 'bg-gray-900' : 'bg-white',
    bgSecondary: themeStore.isDark ? 'bg-gray-800' : 'bg-gray-50',
    bgTertiary: themeStore.isDark ? 'bg-gray-700' : 'bg-gray-100',
    bgQuaternary: themeStore.isDark ? 'bg-gray-850' : 'bg-white',
    
    // 文字颜色
    textPrimary: themeStore.isDark ? 'text-white' : 'text-gray-900',
    textSecondary: themeStore.isDark ? 'text-gray-200' : 'text-gray-800',
    textTertiary: themeStore.isDark ? 'text-gray-300' : 'text-gray-600',
    textMuted: themeStore.isDark ? 'text-gray-400' : 'text-gray-500',
    textDisabled: themeStore.isDark ? 'text-gray-500' : 'text-gray-400',
    
    // 边框
    border: themeStore.isDark ? 'border-gray-700' : 'border-gray-200',
    borderLight: themeStore.isDark ? 'border-gray-600' : 'border-gray-300',
    
    // 悬停状态
    hoverBg: themeStore.isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    hoverBgSecondary: themeStore.isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100',
    
    // 组合样式
    cardBg: themeStore.isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    panelBg: themeStore.isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200',
    modalBg: themeStore.isDark ? 'bg-gray-850 border-gray-700' : 'bg-white border-gray-200',
    sidebarBg: themeStore.isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
    
    // 特殊状态
    cropBorder: themeStore.isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-100',
    cropLabel: themeStore.isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-600',
    cropVisualizerBorder: themeStore.isDark ? 'border-gray-600' : 'border-gray-300',
    cropVisualizerContent: themeStore.isDark ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100/50 text-gray-600',
    
    // 视频预览相关
    videoPreviewBg: themeStore.isDark ? 'bg-gray-800' : 'bg-gray-50',
    videoCardBg: themeStore.isDark ? 'bg-gray-700' : 'bg-white',
    videoCardSelected: themeStore.isDark ? 'border-blue-400 bg-blue-900/20' : 'border-blue-400 bg-blue-50',
    videoCardDefault: themeStore.isDark ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50',
    videoCardHover: themeStore.isDark ? 'hover:border-blue-400 hover:bg-blue-900/10' : 'hover:border-blue-400 hover:bg-blue-50',
  }))
  
  // 动态颜色函数
  const getIconColor = () => themeStore.isDark ? '#60a5fa' : '#3b82f6'
  const getIconColorMuted = () => themeStore.isDark ? '#6b7280' : '#9ca3af'
  
  return {
    themeClasses,
    getIconColor,
    getIconColorMuted
  }
}