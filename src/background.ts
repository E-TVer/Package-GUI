'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { autoUpdater } from 'electron-updater'
const isDevelopment = process.env.NODE_ENV !== 'production'

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = false

let win: BrowserWindow | null

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow () {
  win = new BrowserWindow({
    width: 1800,
    height: 800,
    frame: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      enableRemoteModule: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
    autoUpdater.checkForUpdatesAndNotify()
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('update', async () => {
  const checkForUpdates = await autoUpdater.checkForUpdates()
  if (win) win.webContents.send('update-replay-check', checkForUpdates)
  const download = await autoUpdater.downloadUpdate()
  if (win) win.webContents.send('update-replay-download', download)
  autoUpdater.on('update-downloaded', () => {
    if (win) win.webContents.send('update-replay-downloaded', 'downloaded')
    autoUpdater.quitAndInstall()
  })
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
