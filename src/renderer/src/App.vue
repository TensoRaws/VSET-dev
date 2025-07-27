<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider
} from 'naive-ui'
import {SettingsOutline} from '@vicons/ionicons5'
import {useThemeStore} from './store/ThemeStore'
import {useAppI18n} from './composables/useAppI18n'
import VideoPreview from './components/VideoPreview.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import LogPanel from './components/LogPanel.vue'
import SettingsModal from './components/SettingsModal.vue'

// 主题状态
const themeStore = useThemeStore()

// 国际化
const {naiveLocale, naiveDateLocale, t} = useAppI18n()

// 日志面板状态
const logCollapsed = ref(false)

// 设置弹窗状态
const showSettingsModal = ref(false)

// 切换日志面板
const toggleLog = () => {
  logCollapsed.value = !logCollapsed.value
}

// 窗口控制函数
const minimizeWindow = () => {
  window.electronAPI?.minimizeWindow()
}

const maximizeWindow = () => {
  window.electronAPI?.maximizeWindow()
}

const closeWindow = () => {
  window.electronAPI?.closeWindow()
}
</script>

<template>
  <n-config-provider
      :theme="themeStore.theme"
      :locale="naiveLocale"
      :date-locale="naiveDateLocale"
      :theme-overrides="themeStore.themeOverrides"
  >
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <div :class="[
            'flex flex-col h-screen w-screen',
            themeStore.isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          ]">
            <!-- 自定义标题栏 -->
            <div :class="[
              'flex justify-between items-center h-8 border-b select-none z-50 pl-3',
              themeStore.isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            ]">
              <div class="flex-1 h-full flex items-center pl-3 drag-region">
                <div class="text-xs font-medium opacity-80">{{ t('app.title') }}</div>
              </div>

              <!-- 设置按钮 -->
              <div class="flex items-center h-full no-drag">
                <button
                    @click="showSettingsModal = true"
                    :class="[
                    'w-8 h-full flex items-center justify-center transition-colors',
                    themeStore.isDark 
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
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
                <button
                    @click="minimizeWindow"
                    :class="[
                    'w-12 h-full flex items-center justify-center transition-colors',
                    themeStore.isDark 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-600'
                  ]"
                    :title="t('window.minimize')"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="5" width="8" height="2" fill="currentColor"/>
                  </svg>
                </button>
                <button
                    @click="maximizeWindow"
                    :class="[
                    'w-12 h-full flex items-center justify-center transition-colors',
                    themeStore.isDark 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-600'
                  ]"
                    :title="t('window.maximize')"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="2" width="8" height="8" stroke="currentColor" stroke-width="1" fill="none"/>
                  </svg>
                </button>
                <button
                    @click="closeWindow"
                    :class="[
                    'w-12 h-full flex items-center justify-center transition-colors hover:bg-red-600 hover:text-white',
                    themeStore.isDark ? 'text-gray-300' : 'text-gray-600'
                  ]"
                    :title="t('window.closeWindow')"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- 主内容区域 -->
            <div class="flex flex-1 min-h-0 border-b" :class="[themeStore.isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200']">
              <!-- 左侧视频预览区域 -->
              <div :class="[
                'flex-1 flex flex-col',
                themeStore.isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              ]">
                <VideoPreview/>
              </div>

              <!-- 右侧设置面板 -->
              <div :class="[
                'w-104 flex flex-col border-l',
                themeStore.isDark ? 'bg-gray-850 border-gray-700' : 'bg-white border-gray-200'
              ]">
                <SettingsPanel/>
              </div>
            </div>

            <!-- 底部日志区域 -->
            <div :class="[
              'transition-all duration-300 box-border ',
              themeStore.isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
              logCollapsed ? 'h-10' : 'h-72'
            ]">
              <div
                  @click="toggleLog"
                  :class="[
                  'h-10 flex items-center justify-between px-4 cursor-pointer select-none transition-colors',
                  themeStore.isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                ]"
              >
                <span class="text-xs font-medium">{{ t('log.output') }}</span>
                <span class="text-xs opacity-60">{{ logCollapsed ? t('log.expand') : t('log.collapse') }}</span>
              </div>
              <div v-show="!logCollapsed" class="h-[calc(100%-2.5rem)] overflow-hidden">
                <LogPanel/>
              </div>
            </div>
          </div>
          
          <!-- 设置弹窗组件 -->
          <SettingsModal v-model:show="showSettingsModal" />
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>


<style>
@import "tailwindcss";

/* 全局样式 - 取消默认margin和padding */

#app {
  height: 100vh;
  width: 100vw;
}

/* 窗口拖拽区域 */
.drag-region {
  -webkit-app-region: drag;
}

.no-drag {
  -webkit-app-region: no-drag;
}

/* 全局滚动条样式优化 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 5px;
}

/* 亮色主题滚动条 */
::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.6);
  border-radius: 5px;
  transition: background-color 0.2s ease;
  border: 2px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(107, 114, 128, 0.8);
}

::-webkit-scrollbar-thumb:active {
  background-color: rgba(75, 85, 99, 0.9);
}

/* 暗色主题滚动条 */
.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.6);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(107, 114, 128, 0.8);
}

.dark ::-webkit-scrollbar-thumb:active {
  background-color: rgba(156, 163, 175, 0.9);
}

/* 滚动条角落 */
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
