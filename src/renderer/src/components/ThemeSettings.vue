<template>
  <div class="theme-settings">
    <NSpace vertical size="large">
      <!-- 主题模式设置 -->
      <div>
        <h4 :class="themeStore.isDark ? 'text-gray-200' : 'text-gray-800'" 
            style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">
          {{ t('settings.themeMode') }}
        </h4>
        <NRadioGroup 
          :value="themeStore.themeMode" 
          @update:value="themeStore.setThemeMode"
          size="medium"
        >
          <NSpace>
            <NRadio value="light">
              <div class="flex items-center space-x-2">
                <NIcon size="16">
                  <SunnyOutline />
                </NIcon>
                <span>{{ t('settings.lightMode') }}</span>
              </div>
            </NRadio>
            <NRadio value="dark">
              <div class="flex items-center space-x-2">
                <NIcon size="16">
                  <MoonOutline />
                </NIcon>
                <span>{{ t('settings.darkMode') }}</span>
              </div>
            </NRadio>
            <NRadio value="auto">
              <div class="flex items-center space-x-2">
                <NIcon size="16">
                  <DesktopOutline />
                </NIcon>
                <span>{{ t('settings.autoMode') }}</span>
              </div>
            </NRadio>
          </NSpace>
        </NRadioGroup>
        
        <!-- 自动模式说明 -->
        <div v-if="themeStore.isAutoMode" 
             :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-500'"
             style="margin-top: 8px; font-size: 12px;">
          {{ t('settings.autoModeDesc') }}
        </div>
      </div>

      <NDivider style="margin: 16px 0" />

      <!-- 主题色设置 -->
      <div>
        <h4 :class="themeStore.isDark ? 'text-gray-200' : 'text-gray-800'" 
            style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">
          {{ t('settings.primaryColor') }}
        </h4>
        
        <!-- 预设颜色 -->
        <div style="margin-bottom: 16px;">
          <div style="margin-bottom: 8px; font-size: 13px;" 
               :class="themeStore.isDark ? 'text-gray-300' : 'text-gray-600'">
            {{ t('settings.presetColors') }}
          </div>
          <div class="color-palette">
            <div 
              v-for="(color, key) in PRESET_COLORS" 
              :key="key"
              class="color-item"
              :class="{ 'active': themeStore.primaryColor === color }"
              :style="{ backgroundColor: color }"
              @click="themeStore.setPrimaryColor(color)"
              :title="t(`settings.colors.${key}`)"
            >
              <NIcon v-if="themeStore.primaryColor === color" size="12" color="white">
                <CheckmarkOutline />
              </NIcon>
            </div>
          </div>
        </div>

        <!-- 自定义颜色 -->
        <div>
          <div style="margin-bottom: 8px; font-size: 13px;" 
               :class="themeStore.isDark ? 'text-gray-300' : 'text-gray-600'">
            {{ t('settings.customColor') }}
          </div>
          <NSpace>
            <NColorPicker 
              :value="themeStore.primaryColor"
              @update:value="themeStore.setPrimaryColor"
              :modes="['hex']"
              size="medium"
              style="width: 120px;"
            />
            <NInput 
              :value="themeStore.primaryColor"
              @update:value="handleColorInput"
              placeholder="#1890ff"
              style="width: 120px;"
              size="medium"
            />
          </NSpace>
        </div>
      </div>


    </NSpace>
  </div>
</template>

<script setup lang="ts">
import { 
  NSpace, 
  NRadioGroup, 
  NRadio, 
  NIcon, 
  NColorPicker, 
  NInput
} from 'naive-ui'
import { 
  SunnyOutline, 
  MoonOutline, 
  DesktopOutline, 
  CheckmarkOutline
} from '@vicons/ionicons5'
import { useThemeStore, PRESET_COLORS } from '@renderer/store/ThemeStore'
import { useAppI18n } from '@renderer/composables/useAppI18n'

// 组合式函数
const themeStore = useThemeStore()
const { t } = useAppI18n()

// 方法
const handleColorInput = (value: string) => {
  // 验证颜色格式
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    themeStore.setPrimaryColor(value)
  }
}
</script>

<style scoped>
.color-palette {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
  gap: 8px;
  max-width: 400px;
}

.color-item {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  position: relative;
}

.color-item:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-item.active {
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.3);
}

.theme-settings {
  padding: 4px;
}
</style>