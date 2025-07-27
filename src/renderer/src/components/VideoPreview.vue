<script setup lang="ts">
import { ref, computed } from 'vue'
import { NButton, NCard, NSpace, NText, NIcon, NUpload, NUploadDragger } from 'naive-ui'
import { CloudUploadOutline, CloseOutline, VideocamOutline } from '@vicons/ionicons5'
import useInputconfigStore from '@renderer/store/InputStore'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@renderer/store/ThemeStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inputStore = useInputconfigStore()
const themeStore = useThemeStore()
const { fileList } = storeToRefs(inputStore)

const isDragOver = ref(false)
const videoRef = ref<HTMLVideoElement>()

const hasVideo = computed(() => fileList.value.length > 0)
const currentVideo = computed(() => hasVideo.value ? fileList.value[0] : null)

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  
  const files = Array.from(e.dataTransfer?.files || [])
  const videoFiles = files.filter(file => file.type.startsWith('video/'))
  
  if (videoFiles.length > 0) {
    const fileWithPath = videoFiles[0] as any
    fileWithPath.path = fileWithPath.path || fileWithPath.name
    fileList.value = [fileWithPath]
  }
}

const handleFileSelect = async () => {
  try {
    const selectedFiles = await window.api.selectVideoFiles()
    if (selectedFiles && selectedFiles.length > 0) {
      fileList.value = selectedFiles
    }
  } catch (error) {
    console.error(t('video.selectFileError'), error)
  }
}

const removeVideo = () => {
  fileList.value = []
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<template>
  <div :class="[
    'h-full flex flex-col',
    themeStore.isDark ? 'bg-gray-800' : 'bg-gray-50'
  ]">
    <!-- 视频预览区域 -->
    <div v-if="hasVideo" class="h-full flex flex-col p-4">
      <!-- 视频头部 -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <n-icon size="20" :color="themeStore.isDark ? '#60a5fa' : '#3b82f6'">
            <VideocamOutline />
          </n-icon>
          <n-text class="text-lg font-semibold">{{ t('video.sourceFilePreview') }}</n-text>
        </div>
        <n-button 
          @click="removeVideo"
          size="small"
          type="error"
          ghost
          circle
        >
          <template #icon>
            <n-icon>
              <CloseOutline />
            </n-icon>
          </template>
        </n-button>
      </div>
      
      <!-- 视频播放器 -->
      <div :class="[
        'flex-1 rounded-lg overflow-hidden mb-4',
        themeStore.isDark ? 'bg-gray-900' : 'bg-white'
      ]">
        <video 
          ref="videoRef"
          :src="currentVideo?.path"
          controls
          class="w-full h-full object-contain"
          preload="metadata"
        />
      </div>
      
      <!-- 视频信息 -->
      <n-card 
        size="small" 
        :bordered="false"
        :class="themeStore.isDark ? 'bg-gray-700' : 'bg-white'"
      >
        <n-space vertical size="small">
          <div class="flex justify-between items-center">
            <n-text depth="3" class="text-sm">{{ t('video.fileName') }}:</n-text>
            <n-text class="text-sm font-medium truncate max-w-xs" :title="currentVideo?.name">
              {{ currentVideo?.name }}
            </n-text>
          </div>
          <div class="flex justify-between items-center">
            <n-text depth="3" class="text-sm">{{ t('video.size') }}:</n-text>
            <n-text class="text-sm">{{ formatFileSize(currentVideo?.size || 0) }}</n-text>
          </div>
          <div class="flex justify-between items-center">
            <n-text depth="3" class="text-sm">{{ t('video.type') }}:</n-text>
            <n-text class="text-sm">{{ currentVideo?.type }}</n-text>
          </div>
        </n-space>
      </n-card>
    </div>
    
    <!-- 上传区域 -->
    <div v-else class="h-full flex items-center justify-center p-8">
      <div 
        :class="[
          'w-full max-w-md border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300',
          isDragOver 
            ? (themeStore.isDark ? 'border-blue-400 bg-blue-900/20' : 'border-blue-400 bg-blue-50')
            : (themeStore.isDark ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'),
          'hover:' + (themeStore.isDark ? 'border-blue-400 bg-blue-900/10' : 'border-blue-400 bg-blue-50')
        ]"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        @click="handleFileSelect"
      >
        <n-space vertical size="large" align="center">
          <n-icon 
            size="64" 
            :color="themeStore.isDark ? '#6b7280' : '#9ca3af'"
          >
            <CloudUploadOutline />
          </n-icon>
          
          <div class="space-y-2" @click.stop="handleFileSelect">
            <n-text class="text-xl font-semibold">{{ t('video.uploadVideoFile') }}</n-text>
            <n-text depth="3" class="block">
              {{ t('video.dragOrClick') }}
            </n-text>
            <n-text depth="3" class="text-sm block">
              {{ t('video.supportedFormats') }}
            </n-text>
          </div>
        </n-space>
      </div>
    </div>
  </div>
</template>