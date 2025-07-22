<script setup lang="ts">
import useSrsettingconfigStore from '@renderer/store/SrSettingsStore'
import useVfisettingconfigStore from '@renderer/store/VfiSettingsStore'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { 
  NTabs, 
  NTabPane, 
  NCard, 
  NSwitch, 
  NSelect, 
  NSlider, 
  NInputNumber, 
  NRadioGroup, 
  NRadio, 
  NSpace,
  NGrid,
  NGridItem,
  NFormItem
} from 'naive-ui'

import {
  Inference_options,
  RealcuganModel_options,
  RealesrganModel_options,
  RealesrganScale_options,
  SRMethod_options,
  SwinIRModel_options,
  VsmlrtTile_options,
  Waifu2xModel_options,
} from '../store/SRMethod'

import {
  Inference_Vfi_options,
  RifeModel_options,
  Scale_Vfi_options,
  VfiMethod_options,
} from '../store/VfiMethod'

const SrSettingStore = useSrsettingconfigStore()
const VfiSettingStore = useVfisettingconfigStore()
const themeStore = useThemeStore()

const { isDark } = storeToRefs(themeStore)

const {
  useSR,
  SRMethodValue,
  RealcuganTileValue,
  RealcuganInferenceValue,
  RealcuganModelValue,
  RealcuganAlphaValue,
  RealesrganInferenceValue,
  RealesrganModelValue,
  RealesrganTileValue,
  RealesrganScaleValue,
  Waifu2xInferenceValue,
  Waifu2xModelValue,
  Waifu2xTileValue,
  SwinIRInferenceValue,
  SwinIRModelValue,
  SwinIRTileValue,
} = storeToRefs(SrSettingStore)

const {
  useVfi,
  VfiMethodValue,
  RifeInferenceValue,
  RifeModelValue,
  RifeScaleValue,
  RifeMultiValue,
  RifeEnsembleValue,
  RifeDetectionValue,
} = storeToRefs(VfiSettingStore)

function changeSelect(value: string) {
  RealcuganInferenceValue.value = 'Cuda'
  RealesrganInferenceValue.value = 'Cuda'
  SwinIRInferenceValue.value = 'Cuda'
  SRMethodValue.value = value
}
</script>

<template>
  <div :class="[
    'h-full',
    isDark ? 'bg-gray-900' : 'bg-gray-50'
  ]">
    <NTabs type="segment" animated>
      <NTabPane name="sr" tab="超分设置">
        <div class="space-y-4">
          <!-- 超分配置 -->
          <NCard title="超分配置" size="small">
            <NGrid cols="2" x-gap="16" y-gap="12">
              <NGridItem>
                <NFormItem label="启用超分">
                  <NSwitch v-model:value="useSR" />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem label="半精度">
                  <NSwitch :value="true" disabled />
                </NFormItem>
              </NGridItem>
            </NGrid>
          </NCard>

          <!-- 算法选择 -->
          <NCard title="算法选择" size="small">
            <NFormItem label="超分算法">
              <NSelect 
                v-model:value="SRMethodValue" 
                :options="SRMethod_options"
                @update:value="changeSelect"
                class="w-full"
              />
            </NFormItem>
          </NCard>

          <!-- Real_cugan 设置 -->
          <NCard v-if="SRMethodValue === 'Real_cugan'" title="Real_cugan 参数" size="small">
            <NSpace vertical size="large">
              <NFormItem label="推理方式">
                <NSelect 
                  v-model:value="RealcuganInferenceValue" 
                  :options="Inference_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="超分模型">
                <NSelect 
                  v-model:value="RealcuganModelValue" 
                  :options="RealcuganModel_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="切割块数量">
                <NSelect 
                  v-model:value="RealcuganTileValue" 
                  :options="VsmlrtTile_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="强度参数">
                <NSpace align="center" class="w-full">
                  <NSlider 
                    v-model:value="RealcuganAlphaValue" 
                    :min="0" 
                    :max="2" 
                    :step="0.1"
                    class="flex-1"
                  />
                  <NInputNumber 
                    v-model:value="RealcuganAlphaValue" 
                    :min="0" 
                    :max="2" 
                    :step="0.1"
                    size="small"
                    class="w-20"
                  />
                </NSpace>
              </NFormItem>
            </NSpace>
          </NCard>

          <!-- Real_esrgan 设置 -->
          <NCard v-if="SRMethodValue === 'Real_esrgan'" title="Real_esrgan 参数" size="small">
            <NSpace vertical size="large">
              <NFormItem label="推理方式">
                <NSelect 
                  v-model:value="RealesrganInferenceValue" 
                  :options="Inference_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="超分模型">
                <NSelect 
                  v-model:value="RealesrganModelValue" 
                  :options="RealesrganModel_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="放大倍数">
                <NSelect 
                  v-model:value="RealesrganScaleValue" 
                  :options="RealesrganScale_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="切割块数量">
                <NSelect 
                  v-model:value="RealesrganTileValue" 
                  :options="VsmlrtTile_options"
                  class="w-full"
                />
              </NFormItem>
            </NSpace>
          </NCard>

          <!-- Waifu2x 设置 -->
          <NCard v-if="SRMethodValue === 'Waifu2x'" title="Waifu2x 参数" size="small">
            <NSpace vertical size="large">
              <NFormItem label="推理方式">
                <NSelect 
                  v-model:value="Waifu2xInferenceValue" 
                  :options="Inference_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="超分模型">
                <NSelect 
                  v-model:value="Waifu2xModelValue" 
                  :options="Waifu2xModel_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="切割块数量">
                <NSelect 
                  v-model:value="Waifu2xTileValue" 
                  :options="VsmlrtTile_options"
                  class="w-full"
                />
              </NFormItem>
            </NSpace>
          </NCard>

          <!-- SwinIR 设置 -->
          <NCard v-if="SRMethodValue === 'SwinIR'" title="SwinIR 参数" size="small">
            <NSpace vertical size="large">
              <NFormItem label="推理方式">
                <NSelect 
                  v-model:value="SwinIRInferenceValue" 
                  :options="Inference_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="超分模型">
                <NSelect 
                  v-model:value="SwinIRModelValue" 
                  :options="SwinIRModel_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="切割块数量">
                <NSelect 
                  v-model:value="SwinIRTileValue" 
                  :options="VsmlrtTile_options"
                  class="w-full"
                />
              </NFormItem>
            </NSpace>
          </NCard>
        </div>
      </NTabPane>

      <NTabPane name="vfi" tab="补帧设置">
        <div class="space-y-4">
          <!-- 补帧配置 -->
          <NCard title="补帧配置" size="small">
            <NGrid cols="2" x-gap="16" y-gap="12">
              <NGridItem>
                <NFormItem label="启用补帧">
                  <NSwitch v-model:value="useVfi" />
                </NFormItem>
              </NGridItem>
              <NGridItem>
                <NFormItem label="半精度">
                  <NSwitch :value="true" disabled />
                </NFormItem>
              </NGridItem>
            </NGrid>
          </NCard>

          <!-- 算法选择 -->
          <NCard title="算法选择" size="small">
            <NFormItem label="补帧算法">
              <NSelect 
                v-model:value="VfiMethodValue" 
                :options="VfiMethod_options"
                class="w-full"
              />
            </NFormItem>
          </NCard>

          <!-- Rife 设置 -->
          <NCard v-if="VfiMethodValue === 'Rife'" title="Rife 参数" size="small">
            <NSpace vertical size="large">
              <NFormItem label="推理方式">
                <NSelect 
                  v-model:value="RifeInferenceValue" 
                  :options="Inference_Vfi_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="补帧模型">
                <NSelect 
                  v-model:value="RifeModelValue" 
                  :options="RifeModel_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="光流尺度">
                <NSelect 
                  v-model:value="RifeScaleValue" 
                  :options="Scale_Vfi_options"
                  class="w-full"
                />
              </NFormItem>

              <NFormItem label="目标帧率">
                <NSpace align="center" class="w-full">
                  <NSlider 
                    v-model:value="RifeMultiValue" 
                    :min="60" 
                    :max="480"
                    class="flex-1"
                  />
                  <NInputNumber 
                    v-model:value="RifeMultiValue" 
                    :min="60" 
                    :max="480"
                    size="small"
                    class="w-20"
                  />
                </NSpace>
              </NFormItem>

              <NFormItem label="转场阈值">
                <NSpace align="center" class="w-full">
                  <NSlider 
                    v-model:value="RifeDetectionValue" 
                    :min="0" 
                    :max="1" 
                    :step="0.1"
                    class="flex-1"
                  />
                  <NInputNumber 
                    v-model:value="RifeDetectionValue" 
                    :min="0" 
                    :max="1" 
                    :step="0.1"
                    size="small"
                    class="w-20"
                  />
                </NSpace>
              </NFormItem>

              <NFormItem label="Ensemble">
                <NRadioGroup v-model:value="RifeEnsembleValue">
                  <NSpace>
                    <NRadio :value="true">使用</NRadio>
                    <NRadio :value="false">关闭</NRadio>
                  </NSpace>
                </NRadioGroup>
              </NFormItem>
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