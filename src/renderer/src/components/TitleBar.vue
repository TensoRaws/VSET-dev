<template>
  <div :class="[
    'flex justify-between items-center h-8 border-b select-none z-50 pl-3',
    themeClasses.bgPrimary, themeClasses.border
  ]">
    <!-- 应用标题区域 -->
    <div class="flex-1 h-full flex items-center pl-3 drag-region">
      <div class="text-xs font-medium opacity-80">{{ t('app.title') }}</div>
    </div>

    <!-- 设置按钮 -->
    <div class="flex items-center h-full no-drag">
      <button
        @click="$emit('openSettings')"
        :class="[
          'w-8 h-full flex items-center justify-center transition-colors',
          themeClasses.hoverBg, themeClasses.textSecondary
        ]"
        :title="t('app.settings')"
      >
        <n-icon size="14">
          <SettingsOutline/>
        </n-icon>
      </button>
    </div>

    <!-- 窗口控制按钮 -->
    <div class="flex h-full no-drag">
      <!-- 最小化按钮 -->
      <button
        @click="minimizeWindow"
        :class="[
          'w-12 h-full flex items-center justify-center transition-colors',
          themeClasses.hoverBg, themeClasses.textSecondary
        ]"
        :title="t('window.minimize')"
      >
        <svg width="12" height="12" viewBox="0 0 12 12">
          <rect x="2" y="5" width="8" height="2" fill="currentColor"/>
        </svg>
      </button>
      
      <!-- 最大化/还原按钮 -->
      <button
        @click="maximizeWindow"
        :class="[
          'w-12 h-full flex items-center justify-center transition-colors',
          themeClasses.hoverBg, themeClasses.textSecondary
        ]"
        :title="t('window.maximize')"
      >
        <svg width="12" height="12" viewBox="0 0 12 12">
          <rect x="2" y="2" width="8" height="8" stroke="currentColor" stroke-width="1" fill="none"/>
        </svg>
      </button>
      
      <!-- 关闭按钮 -->
      <button
        @click="closeWindow"
        :class="[
          'w-12 h-full flex items-center justify-center transition-colors hover:bg-red-600 hover:text-white',
          themeClasses.textSecondary
        ]"
        :title="t('window.closeWindow')"
      >
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { SettingsOutline } from '@vicons/ionicons5'
import { useThemeClasses } from '@renderer/composables/useThemeClasses'
import { useI18n } from 'vue-i18n'

// Emits
interface Emits {
  (e: 'openSettings'): void
}

defineEmits<Emits>()

// Composables
const { themeClasses } = useThemeClasses()
const { t } = useI18n()

// 窗口控制函数
const minimizeWindow = () => {
  window.api?.minimizeWindow()
}

const maximizeWindow = () => {
  window.api?.maximizeWindow()
}

const closeWindow = () => {
  window.api?.closeWindow()
}
</script>