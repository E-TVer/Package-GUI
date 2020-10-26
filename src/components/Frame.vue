<template>
  <div class="frame">
    <div class="left">
      <span class="side" @click="checkUpdate()">
        <i class="gg-menu-left-alt" v-show="sidebar"></i>
        <i class="gg-menu-right-alt" v-show="!sidebar"></i>
      </span>
      <span class="name">Package GUI v0.1.14</span>
      <span class="name">状态: {{txt}}</span>
      <span class="name" v-if="hasUpdate" @click="starUpdate()">开始更新</span>
    </div>
    <div class="right">
      <span class="min" @click="frameClickEvent('min')">
        <i class="gg-math-minus"></i>
      </span>
      <span class="max" @click="frameClickEvent('max')">
        <i class="gg-math-plus"></i>
      </span>
      <span class="close" @click="frameClickEvent('close')">
        <i class="gg-close"></i>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { remote, ipcRenderer } from 'electron'

@Component
export default class Frame extends Vue {
  sidebar = false
  txt = '无'
  hasUpdate = false

  get setting () {
    return this.$store.getters.getSetting
  }

  set setting (value) {
    this.$store.commit('setSetting', value)
  }

  sideClickEvent () {
    this.sidebar = !this.sidebar
  }

  frameClickEvent (e: string) {
    const win = remote.getCurrentWindow()
    if (e === 'min') {
      win.minimize()
    }
    if (e === 'max') {
      win.isMaximized() ? win.unmaximize() : win.maximize()
    }
    if (e === 'close') {
      win.destroy()
    }
  }

  checkUpdate () {
    ipcRenderer.send('checkForUpdate')
    ipcRenderer.on('checking-for-update', () => {
      this.txt = 'checking-for-update'
    })
    ipcRenderer.on('update-available', (e, info) => {
      const v = info.version
      this.txt = 'update-available 检测到有可用更新: V' + v
      this.hasUpdate = true
      const releaseNotes = info.releaseNotes
      this.$alert(releaseNotes, {
        dangerouslyUseHTMLString: true
      })
    })
    ipcRenderer.on('update-not-available', () => {
      this.txt = 'update-not-available 没有检测到有可用更新'
    })
    ipcRenderer.on('update-error', (e, err) => {
      this.txt = 'update-error 更新报错' + err
    })
    ipcRenderer.on('download-progress', (e, progressObj) => {
      const number = progressObj.percent
      this.txt = 'download-progress 更新进度: ' + number
    })
    ipcRenderer.on('update-downloaded', () => {
      this.txt = 'update-downloaded 下载完毕, 退出安装'
    })
  }

  starUpdate () {
    console.log('lala')
    ipcRenderer.send('quitAndInstall')
  }

  mounted () {
    ipcRenderer.on('update-replay-downloaded', (e, res) => {
      console.log(res, 'frame ipc on downloaded')
    })
  }
}
</script>
<style lang="scss" scoped>
.frame{
  width: 100%;
  height: 30px;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  color: #5c5c5c;
  background-color: #fff;
  .left{
    height: 100%;
    display: flex;
    .side{
      width: 45px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      -webkit-app-region: no-drag;
      &:hover{
        background-color: #ededed;
      }
    }
    .name{
      margin-left: 10px;
      display: flex;
      font-size: 12px;
      align-items: center;
      -webkit-app-region: no-drag;
      cursor: pointer;
    }
  }
  .right{
    display: flex;
    span{
      display: flex;
      width: 45px;
      height: 100%;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      -webkit-app-region: no-drag;
      &:hover{
        background-color: #ededed;
      }
    }
    .close{
      color: #34495e;
      &:hover{
        background-color: #f70505;
        color: #fff;
      }
    }
  }
  i{
    transform: scale(0.8);
  }
}
</style>
