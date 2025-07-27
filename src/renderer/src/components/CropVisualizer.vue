<template>
  <div>
    <!-- 可视化裁切组件 -->
    <div class="flex items-center justify-center mb-6">
      <div class="relative w-80 h-52 flex items-center justify-center">
        <!-- 固定容器，防止位移 -->
        <div class="relative">
          <!-- 视频预览框 -->
          <div 
            class="relative border-2 border-dashed transition-all duration-300"
            :class="themeClasses.cropVisualizerBorder"
            style="width: 240px; height: 135px;"
          >
            <!-- 视频内容区域 -->
            <div 
              class="absolute flex items-center justify-center text-xs font-medium transition-all duration-300"
              :class="themeClasses.cropVisualizerContent"
              :style="{
                top: `${cropValues.top}px`,
                bottom: `${cropValues.bottom}px`,
                left: `${cropValues.left}px`,
                right: `${cropValues.right}px`
              }"
            >
              视频内容区域
            </div>
            
            <!-- 裁切区域指示 -->
            <!-- 顶部裁切 -->
            <div 
              v-if="cropValues.top > 0"
              class="absolute top-0 left-0 right-0 bg-red-500/20 border-t-2 border-red-500 flex items-center justify-center"
              :style="{ height: `${cropValues.top}px` }"
            >
              <span class="text-xs text-red-600 font-medium">{{ cropValues.top }}px</span>
            </div>
            
            <!-- 底部裁切 -->
            <div 
              v-if="cropValues.bottom > 0"
              class="absolute bottom-0 left-0 right-0 bg-red-500/20 border-b-2 border-red-500 flex items-center justify-center"
              :style="{ height: `${cropValues.bottom}px` }"
            >
              <span class="text-xs text-red-600 font-medium">{{ cropValues.bottom }}px</span>
            </div>
            
            <!-- 左侧裁切 -->
            <div 
              v-if="cropValues.left > 0"
              class="absolute top-0 bottom-0 left-0 bg-red-500/20 border-l-2 border-red-500"
              :style="{ width: `${cropValues.left}px` }"
            >
              <div class="absolute inset-0 flex items-center justify-center">
                <span 
                  class="text-xs text-red-600 font-medium whitespace-nowrap"
                  :class="cropValues.left < 30 ? 'transform rotate-90' : ''"
                  :style="cropValues.left < 30 ? 'writing-mode: vertical-rl; text-orientation: mixed;' : ''"
                >
                  {{ cropValues.left }}px
                </span>
              </div>
            </div>
            
            <!-- 右侧裁切 -->
            <div 
              v-if="cropValues.right > 0"
              class="absolute top-0 bottom-0 right-0 bg-red-500/20 border-r-2 border-red-500"
              :style="{ width: `${cropValues.right}px` }"
            >
              <div class="absolute inset-0 flex items-center justify-center">
                <span 
                  class="text-xs text-red-600 font-medium whitespace-nowrap"
                  :class="cropValues.right < 30 ? 'transform -rotate-90' : ''"
                  :style="cropValues.right < 30 ? 'writing-mode: vertical-rl; text-orientation: mixed;' : ''"
                >
                  {{ cropValues.right }}px
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 裁切参数控制 -->
    <NGrid cols="2" x-gap="16" y-gap="12">
      <NGridItem>
        <NFormItem :label="t('filter.top')">
          <NInputNumber 
            :value="cropValues.top"
            @update:value="updateCropValue('top', $event)"
            :min="limits.top.min" 
            :max="limits.top.max"
            class="w-full"
            placeholder="顶部裁剪"
          />
        </NFormItem>
      </NGridItem>
      <NGridItem>
        <NFormItem :label="t('filter.bottom')">
          <NInputNumber 
            :value="cropValues.bottom"
            @update:value="updateCropValue('bottom', $event)"
            :min="limits.bottom.min" 
            :max="limits.bottom.max"
            class="w-full"
            placeholder="底部裁剪"
          />
        </NFormItem>
      </NGridItem>
      <NGridItem>
        <NFormItem :label="t('filter.left')">
          <NInputNumber 
            :value="cropValues.left"
            @update:value="updateCropValue('left', $event)"
            :min="limits.left.min" 
            :max="limits.left.max"
            class="w-full"
            placeholder="左侧裁剪"
          />
        </NFormItem>
      </NGridItem>
      <NGridItem>
        <NFormItem :label="t('filter.right')">
          <NInputNumber 
            :value="cropValues.right"
            @update:value="updateCropValue('right', $event)"
            :min="limits.right.min" 
            :max="limits.right.max"
            class="w-full"
            placeholder="右侧裁剪"
          />
        </NFormItem>
      </NGridItem>
    </NGrid>
  </div>
</template>

<script setup lang="ts">
import { useThemeClasses } from '@renderer/composables/useThemeClasses'
import { useAppI18n } from '@renderer/composables/useAppI18n'
import {
  NGrid,
  NGridItem,
  NFormItem,
  NInputNumber
} from 'naive-ui'

// 组件属性定义
interface CropValues {
  top: number
  bottom: number
  left: number
  right: number
}

interface CropLimits {
  top: { min: number; max: number }
  bottom: { min: number; max: number }
  left: { min: number; max: number }
  right: { min: number; max: number }
}

// Props
const props = withDefaults(defineProps<{
  cropValues: CropValues
  limits?: CropLimits
}>(), {
  limits: () => ({
    top: { min: 0, max: 60 },
    bottom: { min: 0, max: 60 },
    left: { min: 0, max: 100 },
    right: { min: 0, max: 100 }
  })
})

// Emits
const emit = defineEmits<{
  'update:cropValues': [value: CropValues]
}>()

// 组合式函数
const { t } = useAppI18n()
const { themeClasses } = useThemeClasses()

// 方法
const updateCropValue = (key: keyof CropValues, value: number | null) => {
  if (value === null) return
  
  const newValues = { ...props.cropValues }
  newValues[key] = value
  emit('update:cropValues', newValues)
}
</script>

<style scoped>
/* 使用 Tailwind CSS 和 Naive UI，无需自定义样式 */
</style>