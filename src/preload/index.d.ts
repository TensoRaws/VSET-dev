import type { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      selectDirectory: () => Promise<any>
      selectVideoFiles: () => Promise<Array<{
        path: string
        name: string
        size: number
        type: string
      }>>
      getCpuInfo: () => Promise<Array<string>>
      getGpuInfo: () => Promise<Array<string>>
      minimizeWindow: () => void
      maximizeWindow: () => void
      closeWindow: () => void
    }
    electronAPI?: {
      minimizeWindow: () => void
      maximizeWindow: () => void
      closeWindow: () => void
    }
  }
}
