<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { useLogStore } from '@renderer/store/LogStore'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { storeToRefs } from 'pinia'
import { NButton, NSpace, NEmpty, useMessage } from 'naive-ui'
import { 
  ArrowDownOutline, 
  CopyOutline, 
  TrashOutline 
} from '@vicons/ionicons5'
import { useAppI18n } from '@renderer/composables/useAppI18n'

const { t } = useAppI18n()

const logStore = useLogStore()
const themeStore = useThemeStore()
const { logs } = storeToRefs(logStore)
const { isDark } = storeToRefs(themeStore)
const message = useMessage()

const logContainer = ref<HTMLElement>()
const autoScroll = ref(true)

// 格式化日志内容
const formattedLogs = computed(() => {
  if (!logs.value) return []
  
  return logs.value.split('\n').filter(line => line.trim()).map((line, index) => {
    let type = 'info'
    let content = line
    
    // 根据内容判断日志类型
    if (line.includes('[ERROR]') || line.includes('Error') || line.includes('error')) {
      type = 'error'
    } else if (line.includes('[WARN]') || line.includes('Warning') || line.includes('warning')) {
      type = 'warning'
    } else if (line.includes('[Progress_vspipe_ffmpeg]')) {
      type = 'progress'
    } else if (line.includes('[INFO]') || line.includes('Info')) {
      type = 'info'
    }
    
    return {
      id: index,
      type,
      content,
      timestamp: new Date().toLocaleTimeString()
    }
  })
})

// 自动滚动到底部
const scrollToBottom = () => {
  if (autoScroll.value && logContainer.value) {
    nextTick(() => {
      logContainer.value!.scrollTop = logContainer.value!.scrollHeight
    })
  }
}

// 监听日志变化
watch(logs, () => {
  scrollToBottom()
}, { flush: 'post' })

// 清空日志
const clearLogs = () => {
  logStore.clearLog()
}

// 切换自动滚动
const toggleAutoScroll = () => {
  autoScroll.value = !autoScroll.value
  if (autoScroll.value) {
    scrollToBottom()
  }
}

// 复制日志
const copyLogs = async () => {
  try {
    await navigator.clipboard.writeText(logs.value)
    message.success(t('log.copySuccess'))
  } catch (error) {
    console.error('Copy failed:', error)
    message.error(t('log.copyFailed'))
  }
}
</script>

<template>
  <div :class="[
    'h-full flex flex-col',
    isDark ? 'bg-gray-900' : 'bg-gray-50'
  ]">
    <!-- 日志工具栏 -->
    <div :class="[
      'flex items-center justify-between px-3 py-2 border-b min-h-[36px]',
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    ]">
      <div class="flex items-center">
        <span :class="[
          'text-xs',
          isDark ? 'text-gray-400' : 'text-gray-600'
        ]">
          {{ t('log.logCount', { count: formattedLogs.length }) }}
        </span>
      </div>
      <NSpace size="small">
        <NButton
          size="small"
          :type="autoScroll ? 'primary' : 'default'"
          @click="toggleAutoScroll"
          :title="t('log.autoScroll')"
        >
          <template #icon>
            <ArrowDownOutline />
          </template>
        </NButton>
        <NButton
          size="small"
          @click="copyLogs"
          :title="t('log.copyLogs')"
        >
          <template #icon>
            <CopyOutline />
          </template>
        </NButton>
        <NButton
          size="small"
          @click="clearLogs"
          :title="t('log.clearLogs')"
        >
          <template #icon>
            <TrashOutline />
          </template>
        </NButton>
      </NSpace>
    </div>
    
    <!-- 日志内容 -->
    <div 
      ref="logContainer"
      :class="[
        'flex-1 overflow-y-auto p-2 font-mono text-sm leading-relaxed',
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      ]"
    >
      <NEmpty 
        v-if="formattedLogs.length === 0" 
        :description="t('log.noLogs')"
        class="h-full flex items-center justify-center"
      >
        <template #icon>
          <div class="text-4xl">📝</div>
        </template>
      </NEmpty>
      <div 
        v-for="log in formattedLogs" 
        :key="log.id"
        :class="[
          'flex mb-1 px-1 py-0.5 rounded-sm break-all',
          {
            'text-white': log.type === 'info' && isDark,
            'text-gray-900': log.type === 'info' && !isDark,
            'text-orange-400 bg-orange-500/10': log.type === 'warning',
            'text-red-400 bg-red-500/10': log.type === 'error',
            'text-teal-400 bg-teal-500/10': log.type === 'progress'
          }
        ]"
      >
        <span :class="[
          'mr-2 flex-shrink-0 text-xs',
          isDark ? 'text-gray-500' : 'text-gray-400'
        ]">
          {{ log.timestamp }}
        </span>
        <span class="flex-1">{{ log.content }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 使用全局滚动条样式，无需额外定义 */
</style>