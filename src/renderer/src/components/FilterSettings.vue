<script setup lang="ts">
import useFilterconfigStore from '@renderer/store/FilterStore'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { useThemeClasses } from '@renderer/composables/useThemeClasses'
import { useAppI18n } from '@renderer/composables/useAppI18n'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import CropVisualizer from './CropVisualizer.vue'
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
const { themeClasses } = useThemeClasses()

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

// 预处理裁切数据
const beforeEnhanceCropValues = computed({
  get: () => ({
    top: ReduceOn_BeforeEnhance.value,
    bottom: ReduceDown_BeforeEnhance.value,
    left: ReduceLeft_BeforeEnhance.value,
    right: ReduceRight_BeforeEnhance.value
  }),
  set: (values) => {
    ReduceOn_BeforeEnhance.value = values.top
    ReduceDown_BeforeEnhance.value = values.bottom
    ReduceLeft_BeforeEnhance.value = values.left
    ReduceRight_BeforeEnhance.value = values.right
  }
})

// 后处理裁切数据
const afterEnhanceCropValues = computed({
  get: () => ({
    top: ReduceOn_AfterEnhance.value,
    bottom: ReduceDown_AfterEnhance.value,
    left: ReduceLeft_AfterEnhance.value,
    right: ReduceRight_AfterEnhance.value
  }),
  set: (values) => {
    ReduceOn_AfterEnhance.value = values.top
    ReduceDown_AfterEnhance.value = values.bottom
    ReduceLeft_AfterEnhance.value = values.left
    ReduceRight_AfterEnhance.value = values.right
  }
})
</script>

<template>
  <div :class="themeClasses.bgPrimary">
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
              <div v-if="UseResize_BeforeEnhance">
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
            <CropVisualizer 
              v-model:crop-values="beforeEnhanceCropValues"
              :limits="{
                top: { min: 0, max: 60 },
                bottom: { min: 0, max: 60 },
                left: { min: 0, max: 100 },
                right: { min: 0, max: 100 }
              }"
            />
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
              <div v-if="UseResize_AfterEnhance">
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
            <CropVisualizer 
              v-model:crop-values="afterEnhanceCropValues"
              :limits="{
                top: { min: 0, max: 60 },
                bottom: { min: 0, max: 60 },
                left: { min: 0, max: 100 },
                right: { min: 0, max: 100 }
              }"
            />
          </NCard>
        </div>
      </NTabPane>
    </NTabs>
  </div>
</template>

<style scoped>
/* 使用 Tailwind CSS 和 Naive UI，无需自定义样式 */
</style>