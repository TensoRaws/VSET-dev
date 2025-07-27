import { stat } from 'node:fs/promises'
import { join } from 'node:path'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, dialog, ipcMain, nativeImage, shell, session } from 'electron'
import { killAllProcesses } from './childProcessManager'
import ipc from './ipc'
import { RunCommand } from './RunCommand'

// 修复缓存相关错误
app.commandLine.appendSwitch('--disable-gpu-sandbox')
app.commandLine.appendSwitch('--disable-software-rasterizer')
app.commandLine.appendSwitch('--disable-gpu-process-crash-limit')
app.commandLine.appendSwitch('--disable-features', 'VizDisplayCompositor')

const icon = join(__dirname, '../../resources/icon.ico')

let mainWindow: BrowserWindow | null = null

function createWindow(): BrowserWindow {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    frame: false, // 移除默认窗口框架
    titleBarStyle: 'hiddenInset', // 完全隐藏标题栏
    backgroundColor: '#1a1a1a', // 窗口背景色
    icon: nativeImage.createFromPath(icon),
    title: 'VSET 4.2.0',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
    
    // 在开发模式下自动打开开发者工具
    if (is.dev) {
      mainWindow?.webContents.openDevTools()
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // ✅ 点击“关闭按钮 X”时：优雅终止进程再退出
  mainWindow.on('close', async (e) => {
    if ((app as any).isQuitting)
      return

    e.preventDefault()
    ;(app as any).isQuitting = true
    try {
      await killAllProcesses()
    }
    catch (err) {
      console.error('❌ 终止子进程时出错：', err)
    }

    // 手动退出
    app.quit()
  })

  // ✅ 加载主页面
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  }
  else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

// ✅ 当用户点击任务栏关闭或调用 app.quit() 时，先清理子进程
app.on('before-quit', async (event) => {
  if ((app as any).isQuitting)
    return
  event.preventDefault()
  ;(app as any).isQuitting = true

  try {
    await killAllProcesses()
  }
  catch (err) {
    console.error('❌ killAllProcesses 失败：', err)
  }

  // 退出应用（再次触发 before-quit 也无害）
  app.quit()
})

// ✅ 初始化窗口和主进程监听
app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  // 配置会话以避免缓存错误
  try {
    await session.defaultSession.clearCache()
    await session.defaultSession.clearStorageData({
      storages: ['filesystem', 'indexdb', 'localstorage', 'shadercache', 'websql', 'serviceworkers', 'cachestorage']
    })
  } catch (error) {
    console.warn('清理缓存时出现警告:', error)
  }

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('selectVideoFiles', async () => {
    const result = await dialog.showOpenDialog(mainWindow!, {
      properties: ['openFile'],
      filters: [
        {
          name: '视频文件',
          extensions: ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm', 'm4v', '3gp']
        },
        {
          name: '所有文件',
          extensions: ['*']
        }
      ]
    })
    
    if (!result.canceled && result.filePaths.length > 0) {
      const files: Array<{ path: string; name: string; size: number; type: string }> = []
      for (const path of result.filePaths) {
        try {
          const stats = await stat(path)
          files.push({
            path: path,
            name: path.split('\\').pop() || path.split('/').pop() || '',
            size: stats.size,
            type: 'video/' + (path.split('.').pop() || '')
          })
        } catch (error) {
          console.error('获取文件信息失败:', error)
          files.push({
            path: path,
            name: path.split('\\').pop() || path.split('/').pop() || '',
            size: 0,
            type: 'video/' + (path.split('.').pop() || '')
          })
        }
      }
      return files
    }
    
    return []
  })

  ipcMain.on('execute-command', RunCommand)

  ipcMain.on('stop-all-processes', () => {
    killAllProcesses()
  })

  // 窗口控制IPC监听器
  ipcMain.on('window-minimize', () => {
    if (mainWindow) {
      mainWindow.minimize()
    }
  })

  ipcMain.on('window-maximize', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
      } else {
        mainWindow.maximize()
      }
    }
  })

  ipcMain.on('window-close', () => {
    if (mainWindow) {
      mainWindow.close()
    }
  })

  ipcMain.on('open-folder-dialog', (event) => {
    dialog
      .showOpenDialog({
        properties: ['openDirectory'],
      })
      .then((result) => {
        if (!result.canceled) {
          event.sender.send('selected-folder', result.filePaths[0])
        }
      })
      .catch((err) => {
        console.error('Error opening folder dialog:', err)
      })
  })

  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('upload-file', (_, filePath) => {
    console.log('File path:', filePath)
  })

  const win = createWindow()
  ipc(win)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const newWin = createWindow()
      ipc(newWin)
    }
  })
})

// ✅ 所有窗口关闭时退出（除 macOS）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
