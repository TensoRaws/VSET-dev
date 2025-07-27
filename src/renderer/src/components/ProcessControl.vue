<template>
  <div :class="[
    'flex items-center gap-3 p-4 border-t',
    themeClasses.bgSecondary, themeClasses.border
  ]">
    <!-- 开始/终止按钮 -->
    <button
      @click="toggleProcess"
      :class="[
        'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 font-medium text-white shadow-md relative overflow-hidden',
        isProcessing 
          ? 'bg-red-500 hover:bg-red-600 active:bg-red-700' 
          : `hover:shadow-lg active:scale-95`,
        !isProcessing && `shadow-lg`
      ]"
      :style="!isProcessing ? {
        backgroundColor: themeStore.primaryColor,
        boxShadow: `0 4px 12px ${themeStore.primaryColor}30`
      } : {}"
      :title="isProcessing ? t('process.stop') : t('process.start')"
    >
      <!-- 按钮背景动画 -->
      <div 
        v-if="!isProcessing"
        class="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-200"
        :style="{ backgroundColor: 'white' }"
      />
      
      <!-- 开始图标 -->
      <svg v-if="!isProcessing" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="relative z-10">
        <path d="M8 5v14l11-7z"/>
      </svg>
      
      <!-- 停止图标 -->
      <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="relative z-10">
        <rect x="6" y="6" width="12" height="12"/>
      </svg>
    </button>

    <!-- 进度条容器 -->
    <div class="flex-1 relative">
      <!-- 进度条背景 -->
      <div :class="[
        'h-12 rounded-lg border overflow-hidden',
        themeClasses.bgTertiary, themeClasses.border
      ]">
        <!-- 进度条填充 -->
        <div 
          :class="[
            'h-full transition-all duration-300 ease-out relative overflow-hidden'
          ]"
          :style="{
            width: `${progress}%`,
            backgroundColor: isProcessing ? themeStore.primaryColor : 'transparent'
          }"
        >
          <!-- 进度条动画效果 -->
          <div 
            v-if="isProcessing"
            class="absolute inset-0 opacity-20"
            :style="{
              background: `linear-gradient(90deg, transparent, ${themeStore.primaryColor}, transparent)`,
              animation: 'shimmer 2s infinite'
            }"
          />
        </div>
        
        <!-- 进度文本 -->
        <div :class="[
          'absolute inset-0 flex items-center justify-center text-sm font-medium',
          themeClasses.textPrimary
        ]">
          <span v-if="!isProcessing && progress === 0">
            {{ t('process.ready') }}
          </span>
          <span v-else-if="isProcessing">
            {{ t('process.processing') }} {{ Math.round(progress) }}%
          </span>
          <span v-else-if="progress === 100">
            {{ t('process.completed') }}
          </span>
          <span v-else>
            {{ t('process.paused') }} {{ Math.round(progress) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { useThemeClasses } from '@renderer/composables/useThemeClasses'
import { useI18n } from 'vue-i18n'

// 主题和国际化
const themeStore = useThemeStore()
const { themeClasses } = useThemeClasses()
const { t } = useI18n()

// 处理状态
const isProcessing = ref(false)
const progress = ref(0)

// 模拟进度更新
let progressInterval: NodeJS.Timeout | null = null

const toggleProcess = () => {
  if (isProcessing.value) {
    // 停止处理
    stopProcess()
  } else {
    // 开始处理
    startProcess()
  }
}

const startProcess = () => {
  isProcessing.value = true
  
  // 模拟进度更新
  progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.random() * 3 + 0.5 // 随机增长速度
    } else {
      stopProcess()
    }
  }, 100)
}

const stopProcess = () => {
  isProcessing.value = false
  
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

// 重置进度
const resetProgress = () => {
  progress.value = 0
}

// 暴露方法给父组件
defineExpose({
  startProcess,
  stopProcess,
  resetProgress,
  isProcessing: computed(() => isProcessing.value),
  progress: computed(() => progress.value)
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 按钮悬停效果 */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>