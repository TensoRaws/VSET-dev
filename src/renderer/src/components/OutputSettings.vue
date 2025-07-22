<script setup lang="ts">
import useOutputconfigStore from '@renderer/store/OutputStote'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { storeToRefs } from 'pinia'
import { computed, h } from 'vue'
import { NCard, NSelect, NRadioGroup, NRadio, NSlider, NInputNumber, NButton, NInput, NSpace, NFormItem, NGrid, NGridItem } from 'naive-ui'
import { FolderOpenOutline } from '@vicons/ionicons5'

const OutputConfigStore = useOutputconfigStore()
const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

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
    console.error('选择目录失败:', error)
  }
}
</script>

<template>
  <div class="h-full overflow-y-auto" :class="isDark ? 'bg-gray-900' : 'bg-gray-50'">
    <NSpace vertical :size="16" class="p-4">
      <!-- 编码设置 -->
      <NCard 
        title="编码设置" 
        :bordered="false"
        class="shadow-sm"
        :class="isDark ? 'bg-gray-800' : 'bg-white'"
      >
        <NSpace vertical :size="16">
          <NFormItem label="编码器/格式" label-placement="left">
            <NSelect 
              v-model:value="encoderValue" 
              :options="encoder_options"
              class="min-w-48"
              @update:value="changeSelect"
            />
          </NFormItem>

          <NFormItem label="质量预设" label-placement="left">
            <NSelect 
              v-model:value="qualityValue" 
              :options="qualityPresets"
              class="min-w-48"
            />
          </NFormItem>

          <NFormItem label="质量控制" label-placement="left">
            <NRadioGroup v-model:value="isUseCrf">
              <NSpace>
                <NRadio :value="false">码率</NRadio>
                <NRadio :value="true">CRF</NRadio>
              </NSpace>
            </NRadioGroup>
          </NFormItem>

          <NFormItem v-if="!isUseCrf" label="码率 (M)" label-placement="left">
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

          <NFormItem label="视频容器" label-placement="left">
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
        title="音频设置" 
        :bordered="false"
        class="shadow-sm"
        :class="isDark ? 'bg-gray-800' : 'bg-white'"
      >
        <NSpace vertical :size="16">
          <NFormItem label="音频处理" label-placement="left">
            <NRadioGroup v-model:value="isSaveAudio">
              <NSpace>
                <NRadio :value="true">保留</NRadio>
                <NRadio :value="false">二压</NRadio>
              </NSpace>
            </NRadioGroup>
          </NFormItem>

          <NFormItem v-if="!isSaveAudio" label="音频格式" label-placement="left">
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
        title="输出设置" 
        :bordered="false"
        class="shadow-sm"
        :class="isDark ? 'bg-gray-800' : 'bg-white'"
      >
        <NFormItem label="输出文件夹" label-placement="top">
          <div class="flex gap-2 w-full">
            <NInput 
              v-model:value="outputfolder" 
              placeholder="请设置输出文件夹"
              readonly
              class="flex-1"
            />
            <NButton 
              type="primary" 
              @click="selectDirectory"
              :render-icon="() => h(FolderOpenOutline)"
            >
              选择
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