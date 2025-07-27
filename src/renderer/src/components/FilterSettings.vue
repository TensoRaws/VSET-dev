<script setup lang="ts">
import useFilterconfigStore from '@renderer/store/FilterStore'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { NCard, NSwitch, NInputNumber, NGrid, NGridItem, NFormItem, NSpace } from 'naive-ui'

const FilterConfigStore = useFilterconfigStore()
const themeStore = useThemeStore()
const { t } = useI18n()
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
  <div class="h-full overflow-y-auto" :class="isDark ? 'bg-gray-900' : 'bg-gray-50'">
    <NSpace vertical :size="16" class="p-4">
      <!-- 预处理设置 -->
      <NCard 
        :title="t('filter.preprocessing')" 
        :bordered="false"
        class="shadow-sm"
        :class="isDark ? 'bg-gray-800' : 'bg-white'"
      >
        <NSpace vertical :size="20">
          <!-- 视频缩放 -->
          <div>
            <NFormItem :label="t('filter.videoResize')" label-placement="left" class="mb-3">
              <NSwitch v-model:value="UseResize_BeforeEnhance" />
            </NFormItem>
            
            <NGrid :cols="2" :x-gap="16" v-if="UseResize_BeforeEnhance">
              <NGridItem>
                <NFormItem :label="t('filter.width')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ResizeWidth_BeforeEnhance" 
                    :min="1" 
                    :max="7680"
                    class="w-full"
                    :disabled="!UseResize_BeforeEnhance"
                  />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem :label="t('filter.height')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ResizeHeight_BeforeEnhance" 
                    :min="1" 
                    :max="4320"
                    class="w-full"
                    :disabled="!UseResize_BeforeEnhance"
                  />
                </NFormItem>
              </NGridItem>
            </NGrid>
          </div>

          <!-- 黑边处理 -->
          <div>
            <h5 class="text-sm font-medium mb-3" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              {{ t('filter.blackBorderProcessing') }}
            </h5>
            
            <NGrid :cols="2" :x-gap="16" :y-gap="12">
              <NGridItem>
                <NFormItem :label="t('filter.left')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ReduceLeft_BeforeEnhance" 
                    :min="-1000" 
                    :max="1000"
                    class="w-full"
                  />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem :label="t('filter.right')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ReduceRight_BeforeEnhance" 
                    :min="-1000" 
                    :max="1000"
                    class="w-full"
                  />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem :label="t('filter.top')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ReduceOn_BeforeEnhance" 
                    :min="-1000" 
                    :max="1000"
                    class="w-full"
                  />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem :label="t('filter.bottom')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ReduceDown_BeforeEnhance" 
                    :min="-1000" 
                    :max="1000"
                    class="w-full"
                  />
                </NFormItem>
              </NGridItem>
            </NGrid>
          </div>
        </NSpace>
      </NCard>

      <!-- 后处理设置 -->
      <NCard 
        :title="t('filter.postprocessing')" 
        :bordered="false"
        class="shadow-sm"
        :class="isDark ? 'bg-gray-800' : 'bg-white'"
      >
        <NSpace vertical :size="20">
          <!-- 视频缩放 -->
          <div>
            <NFormItem :label="t('filter.videoResize')" label-placement="left" class="mb-3">
              <NSwitch v-model:value="UseResize_AfterEnhance" />
            </NFormItem>
            
            <NGrid :cols="2" :x-gap="16" v-if="UseResize_AfterEnhance">
              <NGridItem>
                <NFormItem :label="t('filter.width')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ResizeWidth_AfterEnhance" 
                    :min="1" 
                    :max="7680"
                    class="w-full"
                    :disabled="!UseResize_AfterEnhance"
                  />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem :label="t('filter.height')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ResizeHeight_AfterEnhance" 
                    :min="1" 
                    :max="4320"
                    class="w-full"
                    :disabled="!UseResize_AfterEnhance"
                  />
                </NFormItem>
              </NGridItem>
            </NGrid>
          </div>

          <!-- 黑边处理 -->
          <div>
            <h5 class="text-sm font-medium mb-3" :class="isDark ? 'text-gray-300' : 'text-gray-700'">
              {{ t('filter.blackBorderProcessing') }}
            </h5>
            
            <NGrid :cols="2" :x-gap="16" :y-gap="12">
              <NGridItem>
                <NFormItem :label="t('filter.left')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ReduceLeft_AfterEnhance" 
                    :min="-1000" 
                    :max="1000"
                    class="w-full"
                  />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem :label="t('filter.right')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ReduceRight_AfterEnhance" 
                    :min="-1000" 
                    :max="1000"
                    class="w-full"
                  />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem :label="t('filter.top')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ReduceOn_AfterEnhance" 
                    :min="-1000" 
                    :max="1000"
                    class="w-full"
                  />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem :label="t('filter.bottom')" label-placement="top">
                  <NInputNumber 
                    v-model:value="ReduceDown_AfterEnhance" 
                    :min="-1000" 
                    :max="1000"
                    class="w-full"
                  />
                </NFormItem>
              </NGridItem>
            </NGrid>
          </div>
        </NSpace>
      </NCard>
    </NSpace>
  </div>
</template>

<style scoped>
/* 使用 Tailwind CSS 和 Naive UI，无需自定义样式 */
</style>