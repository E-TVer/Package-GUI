<template>
  <div class="setting">
    <el-button @click="checkUpdate()">检查更新</el-button>
  </div>
</template>
<script lang="ts">
import { ipcRenderer } from 'electron'
import { Component, Vue } from 'vue-property-decorator'
import { searchPkg } from '../utils/package'
@Component
export default class Setting extends Vue {
  getInfo () {
    searchPkg('vue').then(res => {
      console.log(res)
    })
  }

  checkUpdate () {
    ipcRenderer.send('update')
    ipcRenderer.on('update-replay-check', (e, res) => {
      console.log(res, 'update-replay-check')
    })
    ipcRenderer.on('update-replay-download', (e, res) => {
      console.log(res, 'update-replay-download')
    })
    ipcRenderer.on('update-replay-downloaded', (e, res) => {
      console.log(res, 'update-replay-downloaded')
    })
  }
}
</script>
<style lang="scss" scoped>
.setting{
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 5;
  background-color: #fff;
  width: calc(100% - 240px);
  height: calc(100% - 30px);
}
</style>
