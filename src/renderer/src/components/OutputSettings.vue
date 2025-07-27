<script setup lang="ts">
import useOutputconfigStore from '@renderer/store/OutputStote'
import { useThemeClasses } from '@renderer/composables/useThemeClasses'
import { storeToRefs } from 'pinia'
import { computed, h } from 'vue'
import { NCard, NSelect, NRadioGroup, NRadio, NSlider, NInputNumber, NButton, NInput, NSpace, NFormItem } from 'naive-ui'
import { FolderOpenOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const OutputConfigStore = useOutputconfigStore()
const { themeClasses } = useThemeClasses()

const {
  bitValue,
  crfValue,
  encoderValue,
  qualityValue,
  videoContainer,
  AudioContainer,
  isUseCrf,
  isSaveAudio,
  encoder_options,
  CpuH265_options,
  CpuH264_options,
  CpuAv1_options,
  NvencH265_options,
  NvencH264_options,
  NvencAv1_options,
  VideoContainer_options,
  AudioContainer_options,
  outputfolder,
} = storeToRefs(OutputConfigStore)

const qualityPresets = computed(() => {
  switch (encoderValue.value) {
    case 'libx265':
      return CpuH265_options.value
    case 'libx264':
      return CpuH264_options.value
    case 'libaom-av1':
      return CpuAv1_options.value
    case 'hevc_nvenc':
      return NvencH265_options.value
    case 'h264_nvenc':
      return NvencH264_options.value
    case 'av1_nvenc':
      return NvencAv1_options.value
    default:
      return []
  }
})

function changeSelect(value: string) {
  qualityValue.value = 'slow'
  encoderValue.value = value
}

async function selectDirectory() {
  try {
    const selectedPath = await window.api.selectDirectory()
    if (selectedPath) {
      outputfolder.value = selectedPath
    }
  } catch (error) {
    console.error(t('output.selectDirectoryError'), error)
  }
}
</script>

<template>
  <div :class="themeClasses.bgPrimary">
    <NSpace vertical :size="16">
      <!-- 编码设置 -->
      <NCard 
        :title="t('output.encodingSettings')"
        size="small"
      >
        <NSpace vertical :size="16">
          <NFormItem :label="t('output.encoderFormat')" label-placement="left">
            <NSelect 
              v-model:value="encoderValue" 
              :options="encoder_options"
              class="min-w-48"
              @update:value="changeSelect"
            />
          </NFormItem>

          <NFormItem :label="t('output.qualityPreset')" label-placement="left">
            <NSelect 
              v-model:value="qualityValue" 
              :options="qualityPresets"
              class="min-w-48"
            />
          </NFormItem>

          <NFormItem :label="t('output.qualityControl')" label-placement="left">
            <NRadioGroup v-model:value="isUseCrf">
              <NSpace>
                <NRadio :value="false">{{ t('output.bitrate') }}</NRadio>
                <NRadio :value="true">CRF</NRadio>
              </NSpace>
            </NRadioGroup>
          </NFormItem>

          <NFormItem v-if="!isUseCrf" :label="t('output.bitrateM')" label-placement="left">
            <div class="flex items-center gap-3 min-w-52">
              <NSlider 
                v-model:value="bitValue" 
                :min="1" 
                :max="100"
                class="flex-1"
              />
              <NInputNumber 
                v-model:value="bitValue" 
                :min="1" 
                :max="100"
                class="w-20"
                size="small"
              />
            </div>
          </NFormItem>

          <NFormItem v-if="isUseCrf" label="CRF" label-placement="left">
            <div class="flex items-center gap-3 min-w-52">
              <NSlider 
                v-model:value="crfValue" 
                :min="1" 
                :max="50"
                class="flex-1"
              />
              <NInputNumber 
                v-model:value="crfValue" 
                :min="1" 
                :max="50"
                class="w-20"
                size="small"
              />
            </div>
          </NFormItem>

          <NFormItem :label="t('output.videoContainer')" label-placement="left">
            <NSelect 
              v-model:value="videoContainer" 
              :options="VideoContainer_options"
              class="min-w-48"
            />
          </NFormItem>
        </NSpace>
      </NCard>

      <!-- 音频设置 -->
      <NCard 
        :title="t('output.audioSettings')"
        size="small"
      >
        <NSpace vertical :size="16">
          <NFormItem :label="t('output.audioProcessing')" label-placement="left">
            <NRadioGroup v-model:value="isSaveAudio">
              <NSpace>
                <NRadio :value="true">{{ t('output.keep') }}</NRadio>
                <NRadio :value="false">{{ t('output.recompress') }}</NRadio>
              </NSpace>
            </NRadioGroup>
          </NFormItem>

          <NFormItem v-if="!isSaveAudio" :label="t('output.audioFormat')" label-placement="left">
            <NSelect 
              v-model:value="AudioContainer" 
              :options="AudioContainer_options"
              class="min-w-48"
            />
          </NFormItem>
        </NSpace>
      </NCard>

      <!-- 输出设置 -->
      <NCard 
        :title="t('output.outputSettings')"
        size="small"
      >
        <NFormItem :label="t('output.outputFolder')" label-placement="top">
          <div class="flex gap-2 w-full">
            <NInput 
              v-model:value="outputfolder" 
              :placeholder="t('output.setOutputFolder')"
              readonly
              class="flex-1"
            />
            <NButton 
              type="primary" 
              @click="selectDirectory"
              :render-icon="() => h(FolderOpenOutline)"
            >
              {{ t('output.select') }}
            </NButton>
          </div>
        </NFormItem>
      </NCard>
    </NSpace>
  </div>
</template>

<style scoped>
/* 使用 Tailwind CSS 和 Naive UI，无需自定义样式 */
</style>