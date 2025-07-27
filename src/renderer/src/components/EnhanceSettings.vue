<script setup lang="ts">
import useSrSettingConfigStore from '@renderer/store/SrSettingsStore'
import useVfiSettingConfigStore from '@renderer/store/VfiSettingsStore'
import {useThemeClasses} from '@renderer/composables/useThemeClasses'
import {useI18n} from 'vue-i18n'
import {storeToRefs} from 'pinia'
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

const SrSettingStore = useSrSettingConfigStore()
const VfiSettingStore = useVfiSettingConfigStore()
const {themeClasses} = useThemeClasses()
const {t} = useI18n()

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
  <div :class="themeClasses.bgPrimary">
    <NTabs type="segment" animated>
      <NTabPane name="sr" :tab="t('enhance.srSettings')">
        <div class="space-y-4">
          <!-- 超分配置 -->
          <NCard :title="t('enhance.srConfig')" size="small">
            <NFormItem :label="t('enhance.enableSR')" label-placement="left">
              <NSwitch v-model:value="useSR"/>
            </NFormItem>
            <NFormItem :label="t('enhance.halfPrecision')" label-placement="left">
              <NSwitch :value="true" disabled/>
            </NFormItem>
          </NCard>
          <template v-if="useSR">
            <!-- 算法选择 -->
            <NCard :title="t('enhance.algorithmSelection')" size="small">
              <NFormItem :label="t('enhance.srAlgorithm')">
                <NSelect
                    v-model:value="SRMethodValue"
                    :options="SRMethod_options"
                    @update:value="changeSelect"
                    class="w-full"
                />
              </NFormItem>
            </NCard>

            <!-- Real_cugan 设置 -->
            <NCard v-if="SRMethodValue === 'Real_cugan'" :title="t('enhance.realcuganParams')" size="small">
              <NSpace vertical size="large">
                <NFormItem :label="t('enhance.inferenceMethod')">
                  <NSelect
                      v-model:value="RealcuganInferenceValue"
                      :options="Inference_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.srModel')">
                  <NSelect
                      v-model:value="RealcuganModelValue"
                      :options="RealcuganModel_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.tileCount')">
                  <NSelect
                      v-model:value="RealcuganTileValue"
                      :options="VsmlrtTile_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.intensityParam')">
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
            <NCard v-if="SRMethodValue === 'Real_esrgan'" :title="t('enhance.realesrganParams')" size="small">
              <NSpace vertical size="large">
                <NFormItem :label="t('enhance.inferenceMethod')">
                  <NSelect
                      v-model:value="RealesrganInferenceValue"
                      :options="Inference_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.srModel')">
                  <NSelect
                      v-model:value="RealesrganModelValue"
                      :options="RealesrganModel_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.scaleMultiplier')">
                  <NSelect
                      v-model:value="RealesrganScaleValue"
                      :options="RealesrganScale_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.tileCount')">
                  <NSelect
                      v-model:value="RealesrganTileValue"
                      :options="VsmlrtTile_options"
                      class="w-full"
                  />
                </NFormItem>
              </NSpace>
            </NCard>

            <!-- Waifu2x 设置 -->
            <NCard v-if="SRMethodValue === 'Waifu2x'" :title="t('enhance.waifu2xParams')" size="small">
              <NSpace vertical size="large">
                <NFormItem :label="t('enhance.inferenceMethod')">
                  <NSelect
                      v-model:value="Waifu2xInferenceValue"
                      :options="Inference_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.srModel')">
                  <NSelect
                      v-model:value="Waifu2xModelValue"
                      :options="Waifu2xModel_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.tileCount')">
                  <NSelect
                      v-model:value="Waifu2xTileValue"
                      :options="VsmlrtTile_options"
                      class="w-full"
                  />
                </NFormItem>
              </NSpace>
            </NCard>

            <!-- SwinIR 设置 -->
            <NCard v-if="SRMethodValue === 'SwinIR'" :title="t('enhance.swinirParams')" size="small">
              <NSpace vertical size="large">
                <NFormItem :label="t('enhance.inferenceMethod')">
                  <NSelect
                      v-model:value="SwinIRInferenceValue"
                      :options="Inference_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.srModel')">
                  <NSelect
                      v-model:value="SwinIRModelValue"
                      :options="SwinIRModel_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.tileCount')">
                  <NSelect
                      v-model:value="SwinIRTileValue"
                      :options="VsmlrtTile_options"
                      class="w-full"
                  />
                </NFormItem>
              </NSpace>
            </NCard>
          </template>
        </div>
      </NTabPane>

      <NTabPane name="vfi" :tab="t('enhance.vfiSettings')">
        <div class="space-y-4">
          <!-- 补帧配置 -->
          <NCard :title="t('enhance.vfiConfig')" size="small">
            <NFormItem :label="t('enhance.enableVfi')" label-placement="left">
              <NSwitch v-model:value="useVfi"/>
            </NFormItem>
            <NFormItem :label="t('enhance.halfPrecision')" label-placement="left">
              <NSwitch :value="true" disabled/>
            </NFormItem>
          </NCard>
          <template v-if="useVfi">
            <!-- 算法选择 -->
            <NCard :title="t('enhance.algorithmSelection')" size="small">
              <NFormItem :label="t('enhance.vfiAlgorithm')">
                <NSelect
                    v-model:value="VfiMethodValue"
                    :options="VfiMethod_options"
                    class="w-full"
                />
              </NFormItem>
            </NCard>

            <!-- Rife 设置 -->
            <NCard v-if="VfiMethodValue === 'Rife'" :title="t('enhance.rifeParams')" size="small">
              <NSpace vertical size="large">
                <NFormItem :label="t('enhance.inferenceMethod')">
                  <NSelect
                      v-model:value="RifeInferenceValue"
                      :options="Inference_Vfi_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.vfiModel')">
                  <NSelect
                      v-model:value="RifeModelValue"
                      :options="RifeModel_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.opticalFlowScale')">
                  <NSelect
                      v-model:value="RifeScaleValue"
                      :options="Scale_Vfi_options"
                      class="w-full"
                  />
                </NFormItem>

                <NFormItem :label="t('enhance.targetFramerate')">
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

                <NFormItem :label="t('enhance.sceneChangeThreshold')">
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
                      <NRadio :value="true">{{ t('enhance.enable') }}</NRadio>
                      <NRadio :value="false">{{ t('enhance.disable') }}</NRadio>
                    </NSpace>
                  </NRadioGroup>
                </NFormItem>
              </NSpace>
            </NCard>
          </template>
        </div>
      </NTabPane>
    </NTabs>
  </div>
</template>

<style scoped>
/* 使用 Tailwind CSS 和 Naive UI，无需自定义样式 */
</style>