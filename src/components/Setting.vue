<template>
  <div class="setting">
    <div>版本: v0.1.26</div>
    <div><el-button @click="checkUpdate()">检查更新</el-button></div>
    <div>版本: v {{version}}</div>
    <div>更新内容: </div>
    <div v-html="html"></div>
    <div><el-button @click="startDownload()">开始下载更新</el-button></div>
    <div>更新进度: {{percent}}</div>
    <div v-show="done"><el-button @click="quitAndInstall()">退出安装</el-button></div>
  </div>
</template>
<script lang="ts">
import { ipcRenderer } from 'electron'
import { Component, Vue } from 'vue-property-decorator'
import { searchPkg } from '../utils/package'
@Component
export default class Setting extends Vue {
  version = ''
  html = ''
  percent = null
  done = false

  getInfo () {
    searchPkg('vue').then(res => {
      console.log(res)
    })
  }

  checkUpdate () {
    ipcRenderer.send('checkForUpdate')
    ipcRenderer.on('update-available', (e, info) => {
      console.log(info, 'update-available info')
      this.version = info.version
      this.html = info.releaseNotes
    })
  }

  startDownload () {
    ipcRenderer.send('downloadUpdate')
    ipcRenderer.on('download-progress', (e, info) => {
      console.log(info, 'download-progress info')
      this.percent = info
    })
    ipcRenderer.on('update-downloaded', () => {
      console.log('update-downloaded')
      this.done = true
    })
  }

  quitAndInstall () {
    ipcRenderer.send('quitAndInstall')
  }

  mounted () {
    // this.checkUpdate()
  }
}
</script>
<style lang="scss" scoped>
.setting{
  z-index: 5;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
</style>
