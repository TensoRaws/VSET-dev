<script setup lang="ts">
import { ref } from 'vue'
import { 
  NConfigProvider, 
  NMessageProvider, 
  NDialogProvider, 
  NNotificationProvider,
  NModal,
  NCard,
  NButton,
  NSpace,
  NIcon,
  zhCN,
  dateZhCN
} from 'naive-ui'
import { SettingsOutline, SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import VideoPreview from './components/VideoPreview.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import LogPanel from './components/LogPanel.vue'
import { useThemeStore } from './store/ThemeStore'

const themeStore = useThemeStore()
const logCollapsed = ref(true)
const showThemeModal = ref(false)

const toggleLog = () => {
  logCollapsed.value = !logCollapsed.value
}

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

// 主题切换函数
const openThemeSettings = () => {
  showThemeModal.value = true
}

const setLightTheme = () => {
  themeStore.setLightTheme()
  showThemeModal.value = false
}

const setDarkTheme = () => {
  themeStore.setDarkTheme()
  showThemeModal.value = false
}
</script>

<template>
  <n-config-provider 
    :theme="themeStore.theme" 
    :locale="zhCN" 
    :date-locale="dateZhCN"
    :theme-overrides="{
      common: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }
    }"
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
              'flex justify-between items-center h-8 border-b select-none z-50',
              themeStore.isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            ]">
              <div class="flex-1 h-full flex items-center pl-3 drag-region">
                <div class="text-xs font-medium opacity-80">VSET 4.2.0</div>
              </div>
              
              <!-- 设置按钮 -->
              <div class="flex items-center h-full no-drag">
                <button 
                  @click="openThemeSettings"
                  :class="[
                    'w-8 h-full flex items-center justify-center transition-colors',
                    themeStore.isDark 
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  ]"
                  title="主题设置"
                >
                  <n-icon size="14">
                    <SettingsOutline />
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
                  title="最小化"
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
                  title="最大化"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="2" width="8" height="8" stroke="currentColor" stroke-width="1" fill="none"/>
                  </svg>
                </button>
                <button 
                  @click="closeWindow" 
                  class="w-12 h-full flex items-center justify-center transition-colors hover:bg-red-600 hover:text-white text-gray-300"
                  title="关闭"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- 主内容区域 -->
            <div class="flex flex-1 min-h-0">
              <!-- 左侧视频预览区域 -->
              <div :class="[
                'flex-1 flex flex-col border-r',
                themeStore.isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              ]">
                <VideoPreview />
              </div>
              
              <!-- 右侧设置面板 -->
              <div :class="[
                'w-96 flex flex-col border-l',
                themeStore.isDark ? 'bg-gray-850 border-gray-700' : 'bg-white border-gray-200'
              ]">
                <SettingsPanel />
              </div>
            </div>
            
            <!-- 底部日志区域 -->
            <div :class="[
              'border-t transition-all duration-300',
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
                <span class="text-xs font-medium">日志输出</span>
                <span class="text-xs opacity-60">{{ logCollapsed ? '展开' : '收起' }}</span>
              </div>
              <div v-show="!logCollapsed" class="h-[calc(100%-2.5rem)] overflow-hidden">
                <LogPanel />
              </div>
            </div>
          </div>

          <!-- 主题设置弹窗 -->
          <n-modal v-model:show="showThemeModal">
            <n-card
              style="width: 400px"
              title="主题设置"
              :bordered="false"
              size="huge"
              role="dialog"
              aria-modal="true"
            >
              <n-space vertical size="large">
                <div class="text-sm opacity-80 mb-4">选择您喜欢的主题模式</div>
                
                <n-space size="medium">
                  <n-button 
                    @click="setLightTheme"
                    :type="!themeStore.isDark ? 'primary' : 'default'"
                    size="large"
                    style="width: 120px; height: 60px"
                  >
                    <template #icon>
                      <n-icon size="20">
                        <SunnyOutline />
                      </n-icon>
                    </template>
                    <div class="flex flex-col items-center">
                      <div class="text-sm font-medium">亮色主题</div>
                    </div>
                  </n-button>
                  
                  <n-button 
                    @click="setDarkTheme"
                    :type="themeStore.isDark ? 'primary' : 'default'"
                    size="large"
                    style="width: 120px; height: 60px"
                  >
                    <template #icon>
                      <n-icon size="20">
                        <MoonOutline />
                      </n-icon>
                    </template>
                    <div class="flex flex-col items-center">
                      <div class="text-sm font-medium">暗色主题</div>
                    </div>
                  </n-button>
                </n-space>
              </n-space>
              
              <template #footer>
                <div class="flex justify-end">
                  <n-button @click="showThemeModal = false">关闭</n-button>
                </div>
              </template>
            </n-card>
          </n-modal>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>



<style>
@import "tailwindcss";

/* 全局样式 - 取消默认margin和padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

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
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

/* 亮色主题滚动条 */
::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.6);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.8);
}

::-webkit-scrollbar-thumb:active {
  background: rgba(75, 85, 99, 0.9);
}

/* 暗色主题滚动条 */
.dark ::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.6);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.8);
}

.dark ::-webkit-scrollbar-thumb:active {
  background: rgba(156, 163, 175, 0.9);
}

/* 滚动条角落 */
::-webkit-scrollbar-corner {
  background: transparent;
}

/* Firefox 滚动条样式 */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.6) transparent;
}

.dark * {
  scrollbar-color: rgba(75, 85, 99, 0.6) transparent;
}

/* 优化滚动条在不同容器中的表现 */
.n-scrollbar-rail {
  right: 2px !important;
}

.n-scrollbar-rail--vertical {
  width: 6px !important;
}

.n-scrollbar-rail--horizontal {
  height: 6px !important;
}
</style>
