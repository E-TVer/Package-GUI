import { ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

export function initUpdater () {
  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = false

  // 主进程监听检查更新事件
  ipcMain.on('checkForUpdate', async event => {
    autoUpdater.checkForUpdates()

    // 检测到有可用的更新
    autoUpdater.on('update-available', info => {
      event.sender.send('update-available', info)
    })
  })

  // 主进程监听下载安装事件
  ipcMain.on('downloadUpdate', async event => {
    autoUpdater.downloadUpdate()

    // 下载更新进度
    autoUpdater.on('download-progress', progress => {
      event.sender.send('download-progress', progress.percent)
    })

    // 下载完成
    autoUpdater.on('update-downloaded', () => {
      event.sender.send('update-downloaded');
    })
  })

  // 主进程监听退出并安装事件
  ipcMain.on('quitAndInstall', () => {
    autoUpdater.quitAndInstall();
  })
}
