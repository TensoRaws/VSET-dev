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


    </n-space>
  </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeClasses } from '@renderer/composables/useThemeClasses'
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
}
</script>