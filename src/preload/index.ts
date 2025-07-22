import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  selectDirectory: () => {
    return ipcRenderer.invoke('selectDirectory')
  },
  selectVideoFiles: () => {
    return ipcRenderer.invoke('selectVideoFiles')
  },
  getCpuInfo: () => {
    return ipcRenderer.invoke('getCpuInfo')
  },
  getGpuInfo: () => {
    return ipcRenderer.invoke('getGpuInfo')
  },
  // 窗口控制API
  minimizeWindow: () => {
    ipcRenderer.send('window-minimize')
  },
  maximizeWindow: () => {
    ipcRenderer.send('window-maximize')
  },
  closeWindow: () => {
    ipcRenderer.send('window-close')
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
