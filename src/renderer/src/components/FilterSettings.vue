<script setup lang="ts">
import useFilterconfigStore from '@renderer/store/FilterStore'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { useAppI18n } from '@renderer/composables/useAppI18n'
import { storeToRefs } from 'pinia'
import {
  NTabs,
  NTabPane,
  NCard,
  NSwitch,
  NInputNumber,
  NGrid,
  NGridItem,
  NFormItem,
  NSpace
} from 'naive-ui'

const FilterConfigStore = useFilterconfigStore()
const themeStore = useThemeStore()
const { t } = useAppI18n()
const { isDark } = storeToRefs(themeStore)

const {
  UseResize_BeforeEnhance,
  UseResize_AfterEnhance,
  ResizeWidth_BeforeEnhance,
  ResizeHeight_BeforeEnhance,
  ResizeWidth_AfterEnhance,
  ResizeHeight_AfterEnhance,
  ReduceLeft_BeforeEnhance,
  ReduceRight_BeforeEnhance,
  ReduceOn_BeforeEnhance,
  ReduceDown_BeforeEnhance,
  ReduceLeft_AfterEnhance,
  ReduceRight_AfterEnhance,
  ReduceOn_AfterEnhance,
  ReduceDown_AfterEnhance,
} = storeToRefs(FilterConfigStore)
</script>

<template>
  <div :class="[isDark ? 'bg-gray-900' : 'bg-white']">
    <NTabs type="segment" animated>
      <NTabPane name="preprocessing" :tab="t('filter.preprocessing')">
        <div class="space-y-4">
          <!-- 预处理配置 -->
          <NCard :title="t('filter.preprocessing')" size="small">
            <NSpace vertical size="large">
              <!-- 视频缩放 -->
              <NFormItem :label="t('filter.videoResize')">
                <NSwitch v-model:value="UseResize_BeforeEnhance"/>
              </NFormItem>

              <!-- 视频缩放设置 -->
              <div v-if="UseResize_BeforeEnhance" class="ml-6">
                <NGrid cols="2" x-gap="16" y-gap="12">
                  <NGridItem>
                    <NFormItem :label="t('filter.width')">
                      <NInputNumber 
                        v-model:value="ResizeWidth_BeforeEnhance" 
                        :min="1" 
                        :max="7680"
                        class="w-full"
                        placeholder="输入宽度"
                      />
                    </NFormItem>
                  </NGridItem>
                  <NGridItem>
                    <NFormItem :label="t('filter.height')">
                      <NInputNumber 
                        v-model:value="ResizeHeight_BeforeEnhance" 
                        :min="1" 
                        :max="4320"
                        class="w-full"
                        placeholder="输入高度"
                      />
                    </NFormItem>
                  </NGridItem>
                </NGrid>
              </div>
            </NSpace>
          </NCard>

          <!-- 预处理黑边处理 -->
          <NCard :title="t('filter.blackBorderProcessing') + ' - ' + t('filter.preprocessing')" size="small">
            <NSpace vertical size="large">
              <!-- 可视化裁切组件 -->
              <div class="flex items-center justify-center mb-6">
                <div class="relative w-80 h-52 flex items-center justify-center">
                  <!-- 固定容器，防止位移 -->
                  <div class="relative">
                    <!-- 视频预览框 -->
                    <div 
                      class="relative border-2 border-dashed transition-all duration-300"
                      :class="isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-100'"
                      style="width: 240px; height: 135px;"
                    >
                      <!-- 视频内容区域 -->
                      <div 
                        class="absolute flex items-center justify-center text-xs font-medium transition-all duration-300"
                        :class="isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-600'"
                        :style="{
                          top: `${ReduceOn_BeforeEnhance}px`,
                          bottom: `${ReduceDown_BeforeEnhance}px`,
                          left: `${ReduceLeft_BeforeEnhance}px`,
                          right: `${ReduceRight_BeforeEnhance}px`
                        }"
                      >
                        视频内容区域
                      </div>
                      
                      <!-- 裁切区域指示 -->
                      <!-- 顶部裁切 -->
                      <div 
                        v-if="ReduceOn_BeforeEnhance > 0"
                        class="absolute top-0 left-0 right-0 bg-red-500/20 border-t-2 border-red-500 flex items-center justify-center"
                        :style="{ height: `${ReduceOn_BeforeEnhance}px` }"
                      >
                        <span class="text-xs text-red-600 font-medium">{{ ReduceOn_BeforeEnhance }}px</span>
                      </div>
                      
                      <!-- 底部裁切 -->
                      <div 
                        v-if="ReduceDown_BeforeEnhance > 0"
                        class="absolute bottom-0 left-0 right-0 bg-red-500/20 border-b-2 border-red-500 flex items-center justify-center"
                        :style="{ height: `${ReduceDown_BeforeEnhance}px` }"
                      >
                        <span class="text-xs text-red-600 font-medium">{{ ReduceDown_BeforeEnhance }}px</span>
                      </div>
                      
                      <!-- 左侧裁切 -->
                      <div 
                        v-if="ReduceLeft_BeforeEnhance > 0"
                        class="absolute top-0 bottom-0 left-0 bg-red-500/20 border-l-2 border-red-500"
                        :style="{ width: `${ReduceLeft_BeforeEnhance}px` }"
                      >
                        <div class="absolute inset-0 flex items-center justify-center">
                          <span 
                            class="text-xs text-red-600 font-medium whitespace-nowrap"
                            :class="ReduceLeft_BeforeEnhance < 30 ? 'transform rotate-90' : ''"
                            :style="ReduceLeft_BeforeEnhance < 30 ? ' text-orientation: mixed;' : ''"
                          >
                            {{ ReduceLeft_BeforeEnhance }}px
                          </span>
                        </div>
                      </div>
                      
                      <!-- 右侧裁切 -->
                      <div 
                        v-if="ReduceRight_BeforeEnhance > 0"
                        class="absolute top-0 bottom-0 right-0 bg-red-500/20 border-r-2 border-red-500"
                        :style="{ width: `${ReduceRight_BeforeEnhance}px` }"
                      >
                        <div class="absolute inset-0 flex items-center justify-center">
                          <span 
                            class="text-xs text-red-600 font-medium whitespace-nowrap"
                            :class="ReduceRight_BeforeEnhance < 30 ? 'transform rotate-90' : ''"
                            :style="ReduceRight_BeforeEnhance < 30 ? ' text-orientation: mixed;' : ''"
                          >
                            {{ ReduceRight_BeforeEnhance }}px
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
                      v-model:value="ReduceOn_BeforeEnhance" 
                      :min="0" 
                      :max="60"
                      class="w-full"
                      placeholder="顶部裁剪"
                    />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem :label="t('filter.bottom')">
                    <NInputNumber 
                      v-model:value="ReduceDown_BeforeEnhance" 
                      :min="0" 
                      :max="60"
                      class="w-full"
                      placeholder="底部裁剪"
                    />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem :label="t('filter.left')">
                    <NInputNumber 
                      v-model:value="ReduceLeft_BeforeEnhance" 
                      :min="0" 
                      :max="100"
                      class="w-full"
                      placeholder="左侧裁剪"
                    />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem :label="t('filter.right')">
                    <NInputNumber 
                      v-model:value="ReduceRight_BeforeEnhance" 
                      :min="0" 
                      :max="100"
                      class="w-full"
                      placeholder="右侧裁剪"
                    />
                  </NFormItem>
                </NGridItem>
              </NGrid>
            </NSpace>
          </NCard>
        </div>
      </NTabPane>

      <NTabPane name="postprocessing" :tab="t('filter.postprocessing')">
        <div class="space-y-4">
          <!-- 后处理配置 -->
          <NCard :title="t('filter.postprocessing')" size="small">
            <NSpace vertical size="large">
              <!-- 视频缩放 -->
              <NFormItem :label="t('filter.videoResize')">
                <NSwitch v-model:value="UseResize_AfterEnhance"/>
              </NFormItem>

              <!-- 视频缩放设置 -->
              <div v-if="UseResize_AfterEnhance" class="ml-6">
                <NGrid cols="2" x-gap="16" y-gap="12">
                  <NGridItem>
                    <NFormItem :label="t('filter.width')">
                      <NInputNumber 
                        v-model:value="ResizeWidth_AfterEnhance" 
                        :min="1" 
                        :max="7680"
                        class="w-full"
                        placeholder="输入宽度"
                      />
                    </NFormItem>
                  </NGridItem>
                  <NGridItem>
                    <NFormItem :label="t('filter.height')">
                      <NInputNumber 
                        v-model:value="ResizeHeight_AfterEnhance" 
                        :min="1" 
                        :max="4320"
                        class="w-full"
                        placeholder="输入高度"
                      />
                    </NFormItem>
                  </NGridItem>
                </NGrid>
              </div>
            </NSpace>
          </NCard>

          <!-- 后处理黑边处理 -->
          <NCard :title="t('filter.blackBorderProcessing') + ' - ' + t('filter.postprocessing')" size="small">
            <NSpace vertical size="large">
              <!-- 可视化裁切组件 -->
              <div class="flex items-center justify-center mb-6">
                <div class="relative w-80 h-52 flex items-center justify-center">
                  <!-- 固定容器，防止位移 -->
                  <div class="relative">
                    <!-- 视频预览框 -->
                    <div 
                      class="relative border-2 border-dashed transition-all duration-300"
                      :class="isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-100'"
                      style="width: 240px; height: 135px;"
                    >
                      <!-- 视频内容区域 -->
                      <div 
                        class="absolute flex items-center justify-center text-xs font-medium transition-all duration-300"
                        :class="isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-50 text-blue-600'"
                        :style="{
                          top: `${ReduceOn_AfterEnhance}px`,
                          bottom: `${ReduceDown_AfterEnhance}px`,
                          left: `${ReduceLeft_AfterEnhance}px`,
                          right: `${ReduceRight_AfterEnhance}px`
                        }"
                      >
                        视频内容区域
                      </div>
                      
                      <!-- 裁切区域指示 -->
                      <!-- 顶部裁切 -->
                      <div 
                        v-if="ReduceOn_AfterEnhance > 0"
                        class="absolute top-0 left-0 right-0 bg-red-500/20 border-t-2 border-red-500 flex items-center justify-center"
                        :style="{ height: `${ReduceOn_AfterEnhance}px` }"
                      >
                        <span class="text-xs text-red-600 font-medium">{{ ReduceOn_AfterEnhance }}px</span>
                      </div>
                      
                      <!-- 底部裁切 -->
                      <div 
                        v-if="ReduceDown_AfterEnhance > 0"
                        class="absolute bottom-0 left-0 right-0 bg-red-500/20 border-b-2 border-red-500 flex items-center justify-center"
                        :style="{ height: `${ReduceDown_AfterEnhance}px` }"
                      >
                        <span class="text-xs text-red-600 font-medium">{{ ReduceDown_AfterEnhance }}px</span>
                      </div>
                      
                      <!-- 左侧裁切 -->
                      <div 
                        v-if="ReduceLeft_AfterEnhance > 0"
                        class="absolute top-0 bottom-0 left-0 bg-red-500/20 border-l-2 border-red-500"
                        :style="{ width: `${ReduceLeft_AfterEnhance}px` }"
                      >
                        <div class="absolute inset-0 flex items-center justify-center">
                          <span 
                            class="text-xs text-red-600 font-medium whitespace-nowrap"
                            :class="ReduceLeft_AfterEnhance < 30 ? 'transform rotate-90' : ''"
                            :style="ReduceLeft_AfterEnhance < 30 ? 'writing-mode: vertical-rl; text-orientation: mixed;' : ''"
                          >
                            {{ ReduceLeft_AfterEnhance }}px
                          </span>
                        </div>
                      </div>
                      
                      <!-- 右侧裁切 -->
                      <div 
                        v-if="ReduceRight_AfterEnhance > 0"
                        class="absolute top-0 bottom-0 right-0 bg-red-500/20 border-r-2 border-red-500"
                        :style="{ width: `${ReduceRight_AfterEnhance}px` }"
                      >
                        <div class="absolute inset-0 flex items-center justify-center">
                          <span 
                            class="text-xs text-red-600 font-medium whitespace-nowrap"
                            :class="ReduceRight_AfterEnhance < 30 ? 'transform -rotate-90' : ''"
                            :style="ReduceRight_AfterEnhance < 30 ? 'writing-mode: vertical-rl; text-orientation: mixed;' : ''"
                          >
                            {{ ReduceRight_AfterEnhance }}px
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
                      v-model:value="ReduceOn_AfterEnhance" 
                      :min="0" 
                      :max="60"
                      class="w-full"
                      placeholder="顶部裁剪"
                    />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem :label="t('filter.bottom')">
                    <NInputNumber 
                      v-model:value="ReduceDown_AfterEnhance" 
                      :min="0" 
                      :max="60"
                      class="w-full"
                      placeholder="底部裁剪"
                    />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem :label="t('filter.left')">
                    <NInputNumber 
                      v-model:value="ReduceLeft_AfterEnhance" 
                      :min="0" 
                      :max="100"
                      class="w-full"
                      placeholder="左侧裁剪"
                    />
                  </NFormItem>
                </NGridItem>
                <NGridItem>
                  <NFormItem :label="t('filter.right')">
                    <NInputNumber 
                      v-model:value="ReduceRight_AfterEnhance" 
                      :min="0" 
                      :max="100"
                      class="w-full"
                      placeholder="右侧裁剪"
                    />
                  </NFormItem>
                </NGridItem>
              </NGrid>
            </NSpace>
          </NCard>
        </div>
      </NTabPane>
    </NTabs>
  </div>
</template>

<style scoped>
/* 使用 Tailwind CSS 和 Naive UI，无需自定义样式 */
</style>