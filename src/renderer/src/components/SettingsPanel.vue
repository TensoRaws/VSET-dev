<script setup lang="ts">
import { ref, watch } from 'vue'
import { NTabs, NTabPane, NIcon } from 'naive-ui'
import { RocketOutline, ColorPaletteOutline, CloudUploadOutline } from '@vicons/ionicons5'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { useI18n } from 'vue-i18n'
import EnhanceSettings from './EnhanceSettings.vue'
import FilterSettings from './FilterSettings.vue'
import OutputSettings from './OutputSettings.vue'

interface Props {
  activeTab?: string
}

const props = withDefaults(defineProps<Props>(), {
  activeTab: 'enhance'
})

const emit = defineEmits<{
  'update:activeTab': [value: string]
}>()

const themeStore = useThemeStore()
const { t } = useI18n()
const currentTab = ref(props.activeTab)

// 监听外部传入的activeTab变化
watch(() => props.activeTab, (newTab) => {
  currentTab.value = newTab
})

// 监听内部tab变化并向外发送
watch(currentTab, (newTab) => {
  emit('update:activeTab', newTab)
})
</script>

<template>
  <div :class="[
    'h-full flex flex-col',
    themeStore.isDark ? 'bg-gray-850' : 'bg-white'
  ]">
    <n-tabs 
      v-model:value="currentTab" 
      type="line" 
      animated
      :tab-style="{ padding: '12px 6px' }"
      :tabs-padding="30"
      class="h-full flex flex-col"
    >
      <n-tab-pane name="enhance" class="h-full">
        <template #tab>
          <div class="flex items-center space-x-2">
            <n-icon size="16">
              <RocketOutline />
            </n-icon>
            <span class="text-sm font-medium">{{ t('settings.enhance') }}</span>
          </div>
        </template>
        <div class="h-full overflow-y-auto p-4" >
          <EnhanceSettings />
        </div>
      </n-tab-pane>
      
      <n-tab-pane name="filter" class="h-full">
        <template #tab>
          <div class="flex items-center space-x-2">
            <n-icon size="16">
              <ColorPaletteOutline />
            </n-icon>
            <span class="text-sm font-medium">{{ t('settings.filter') }}</span>
          </div>
        </template>
        <div class="h-full overflow-y-auto p-4">
          <FilterSettings />
        </div>
      </n-tab-pane>
      
      <n-tab-pane name="output" class="h-full">
        <template #tab>
          <div class="flex items-center space-x-2">
            <n-icon size="16">
              <CloudUploadOutline />
            </n-icon>
            <span class="text-sm font-medium">{{ t('settings.output') }}</span>
          </div>
        </template>
        <div class="h-full overflow-y-auto p-4">
          <OutputSettings />
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>