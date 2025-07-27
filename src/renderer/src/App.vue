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
import {useThemeClasses} from './composables/useThemeClasses'
import VideoPreview from './components/VideoPreview.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import LogPanel from './components/LogPanel.vue'
import SettingsModal from './components/SettingsModal.vue'

// 主题状态
const themeStore = useThemeStore()
const {themeClasses} = useThemeClasses()

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
  window.api?.minimizeWindow()
}

const maximizeWindow = () => {
  window.api?.maximizeWindow()
}

const closeWindow = () => {
  window.api?.closeWindow()
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
            themeClasses.bgPrimary, themeClasses.textPrimary
          ]">
            <!-- 自定义标题栏 -->
            <div :class="[
              'flex justify-between items-center h-8 border-b select-none z-50 pl-3',
              themeClasses.bgPrimary, themeClasses.border
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

            <!-- 主内容区域 -->
            <div class="flex flex-1 min-h-0 border-b" :class="[themeClasses.bgSecondary, themeClasses.border]">
              <!-- 左侧视频预览区域 -->
              <div :class="[
                'flex-1 flex flex-col',
                themeClasses.bgSecondary, themeClasses.border
              ]">
                <VideoPreview/>
              </div>

              <!-- 右侧设置面板 -->
              <div :class="[
                'w-104 flex flex-col border-l',
                themeClasses.sidebarBg
              ]">
                <SettingsPanel/>
              </div>
            </div>

            <!-- 底部日志区域 -->
            <div :class="[
              'transition-all duration-300 box-border relative',
              themeClasses.bgPrimary, themeClasses.border,
              logCollapsed ? 'h-10' : 'h-72'
            ]">
              <div
                  @click="toggleLog"
                  :class="[
                  'h-10 flex items-center justify-between px-4 cursor-pointer select-none transition-colors',
                  themeClasses.hoverBgSecondary
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
          <SettingsModal v-model:show="showSettingsModal"/>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>


<style>
@import './main.css';
</style>
