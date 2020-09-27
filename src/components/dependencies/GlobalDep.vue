<template>
  <div class="globalDep">
    <div class="header">
      <div class="item">
        <div class="name">名称: {{info.package.name || ''}}</div>
        <div class="version">版本: {{info.package.version || ''}}</div>
        <div class="date">日期: {{info.package.date || ''}}</div>
      </div>
      <div class="item">
        <div class="description">描述: {{info.package.description}}</div>
      </div>
    </div>
    <div class="body">{{info}}</div>
    <div class="footer">
      <div class="log">
        log
      </div>
      <div class="website btn">官网</div>
      <div class="delete btn">删除</div>
      <div class="update btn">更新</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { searchPkg } from '../../utils/package'
@Component
export default class Setting extends Vue {
  info = ''
  get dep () {
    return this.$store.getters.getDep
  }

  set dep (value) {
    this.$store.commit('setDep', value)
  }

  @Watch('dep', { deep: true })
  onChangeValue () {
    this.getDepInfo()
  }

  async getDepInfo () {
    const result = await searchPkg(this.dep.name)
    console.log(result, 'result')
    if (result) {
      this.info = result.data.results[0]
    }
  }

  mounted () {
    this.getDepInfo()
  }
}
</script>
<style lang="scss" scoped>
.globalDep{
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 5;
  background-color: #fff;
  width: calc(100% - 240px);
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  .header{
    padding: 20px;
    color: #363636;
    font-size: 14px;
    height: auto;
    .item{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
  .body{
    flex: 1;
    padding: 0 20px;
  }
  .footer{
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fafafa;
    box-sizing: border-box;
    border-top: 1px solid #ededed;
    font-size: 12px;
    .log{
      flex: 1;
      padding-left: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn{
      height: 100%;
      width: 70px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #ededed;
      &:hover{
        background-color: #f0f0f0;
      }
    }
    .delete{
      &:hover{
        color: #fff;
        background-color: #f18a8a;
      }
    }
  }
}
</style>
