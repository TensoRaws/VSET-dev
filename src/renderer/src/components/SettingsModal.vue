<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    :title="t('app.settings')"
    style="width: 700px"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <n-space vertical size="large">
      <!-- 语言设置 -->
      <div>
        <h4 
          :class="themeClasses.textSecondary" 
          style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;"
        >
          {{ t('settings.language') }}
        </h4>
        <n-select
          :value="locale"
          :options="languageOptions"
          @update:value="handleLanguageChange"
          style="width: 100%"
        />
      </div>

      <n-divider style="margin: 16px 0"/>

      <!-- 主题设置 -->
      <ThemeSettings />

      <n-divider style="margin: 16px 0"/>

      <!-- 持久化测试区域 -->
      <div>
        <h4 
          :class="themeClasses.textSecondary" 
          style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;"
        >
          持久化存储测试
        </h4>
        <n-space vertical size="small">
          <n-button @click="testPersistence" type="primary" size="small">
            测试配置保存
          </n-button>
          <n-button @click="clearStorage" type="warning" size="small">
            清除所有存储
          </n-button>
          <n-button @click="refreshStorageInfo" type="info" size="small">
            刷新存储信息
          </n-button>
        </n-space>
        
        <div style="margin-top: 12px;">
          <n-text depth="3" style="font-size: 12px;">当前 localStorage 中的 VSET 配置：</n-text>
          <n-code 
            :code="storageInfo" 
            language="json" 
            style="margin-top: 8px; max-height: 200px; overflow-y: auto;"
          />
        </div>
      </div>
    </n-space>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeClasses } from '@renderer/composables/useThemeClasses'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { useMessage } from 'naive-ui'
import ThemeSettings from './ThemeSettings.vue'

// Props
interface Props {
  show: boolean
}

const props = defineProps<Props>()

// Emits
interface Emits {
  (e: 'update:show', value: boolean): void
}

const emit = defineEmits<Emits>()

// Composables
const { t, locale } = useI18n()
const { themeClasses } = useThemeClasses()
const themeStore = useThemeStore()
const message = useMessage()

// 响应式数据
const storageInfo = ref('')

// 计算属性
const visible = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
})

// 语言选项
const languageOptions = [
  {
    label: '简体中文',
    value: 'zh'
  },
  {
    label: 'English',
    value: 'en'
  }
]

// 处理语言切换
const handleLanguageChange = (value: string) => {
  locale.value = value
  localStorage.setItem('locale', value)
  refreshStorageInfo()
}

// 获取存储信息
const refreshStorageInfo = () => {
  const vsetKeys = Object.keys(localStorage).filter(key => key.startsWith('vset-'))
  const storageData: Record<string, any> = {}
  
  vsetKeys.forEach(key => {
    try {
      storageData[key] = JSON.parse(localStorage.getItem(key) || '{}')
    } catch (e) {
      storageData[key] = localStorage.getItem(key)
    }
  })
  
  // 添加语言设置
  const locale = localStorage.getItem('locale')
  if (locale) {
    storageData['locale'] = locale
  }
  
  storageInfo.value = JSON.stringify(storageData, null, 2)
}

// 测试持久化功能
const testPersistence = () => {
  // 修改一些设置来测试持久化
  themeStore.setPrimaryColor('#ff6b6b')
  themeStore.setThemeMode('dark')
  
  message.success('已修改主题设置，刷新页面后应该保持这些设置')
  
  setTimeout(() => {
    refreshStorageInfo()
  }, 100)
}

// 清除存储
const clearStorage = () => {
  const vsetKeys = Object.keys(localStorage).filter(key => key.startsWith('vset-'))
  vsetKeys.forEach(key => {
    localStorage.removeItem(key)
  })
  
  message.warning('已清除所有 VSET 配置，刷新页面后将恢复默认设置')
  refreshStorageInfo()
}

// 组件挂载时获取存储信息
onMounted(() => {
  refreshStorageInfo()
})
</script>