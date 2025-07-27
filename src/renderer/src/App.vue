<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider
} from 'naive-ui'
import {useThemeStore} from './store/ThemeStore'
import {useAppI18n} from './composables/useAppI18n'
import {useThemeClasses} from './composables/useThemeClasses'
import TitleBar from './components/TitleBar.vue'
import VideoPreview from './components/VideoPreview.vue'
import ProcessControl from './components/ProcessControl.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import LogPanel from './components/LogPanel.vue'
import SettingsModal from './components/SettingsModal.vue'

// 主题状态
const themeStore = useThemeStore()
const {themeClasses} = useThemeClasses()

// 国际化
const {naiveLocale, naiveDateLocale, t} = useAppI18n()

// 日志面板状态true
const logCollapsed = ref(true)

// 设置弹窗状态
const showSettingsModal = ref(false)

// 切换日志面板
const toggleLog = () => {
  logCollapsed.value = !logCollapsed.value
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
            <TitleBar @open-settings="showSettingsModal = true" />

            <!-- 主内容区域 -->
            <div class="flex flex-1 min-h-0 border-b" :class="[themeClasses.bgSecondary, themeClasses.border]">
              <!-- 左侧视频预览区域 -->
              <div :class="[
                'flex-1 flex flex-col',
                themeClasses.bgSecondary, themeClasses.border
              ]">
                <VideoPreview/>
                <ProcessControl/>
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
