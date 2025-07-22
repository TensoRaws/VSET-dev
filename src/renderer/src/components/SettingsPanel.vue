<script setup lang="ts">
import { ref } from 'vue'
import { NTabs, NTabPane, NIcon } from 'naive-ui'
import { RocketOutline, ColorPaletteOutline, CloudUploadOutline } from '@vicons/ionicons5'
import EnhanceSettings from './EnhanceSettings.vue'
import FilterSettings from './FilterSettings.vue'
import OutputSettings from './OutputSettings.vue'
import { useThemeStore } from '@renderer/store/ThemeStore'

const themeStore = useThemeStore()
const activeTab = ref('enhance')
</script>

<template>
  <div :class="[
    'h-full flex flex-col',
    themeStore.isDark ? 'bg-gray-850' : 'bg-white'
  ]">
    <n-tabs 
      v-model:value="activeTab" 
      type="line" 
      animated
      :tab-style="{ padding: '12px 16px' }"
      class="h-full flex flex-col"
    >
      <n-tab-pane name="enhance" class="h-full">
        <template #tab>
          <div class="flex items-center space-x-2">
            <n-icon size="16">
              <RocketOutline />
            </n-icon>
            <span class="text-sm font-medium">增强设置</span>
          </div>
        </template>
        <div class="h-full overflow-y-auto p-4">
          <EnhanceSettings />
        </div>
      </n-tab-pane>
      
      <n-tab-pane name="filter" class="h-full">
        <template #tab>
          <div class="flex items-center space-x-2">
            <n-icon size="16">
              <ColorPaletteOutline />
            </n-icon>
            <span class="text-sm font-medium">滤镜设置</span>
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
            <span class="text-sm font-medium">输出设置</span>
          </div>
        </template>
        <div class="h-full overflow-y-auto p-4">
          <OutputSettings />
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>