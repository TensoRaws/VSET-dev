// src/renderer/store/InputStore.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface FileWithPath extends File {
  path: string
}

export interface SimpleFileInfo {
  path: string
  name: string
  size: number
  type: string
}

export default defineStore('inputConfig', () => {
  const fileList = ref<(FileWithPath | SimpleFileInfo)[]>([])

  return {
    fileList,
  }
})
