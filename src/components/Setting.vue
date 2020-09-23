<template>
  <div class="setting">
    <el-button @click="getInfo()">get package info</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import pg from '../utils/package'
@Component
export default class Setting extends Vue {
  getInfo () {
    pg.search('vue').then(res => {
      console.log(res)
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
