<template>
  <div class="projectDep">
    <div class="body pkg-scrollbar">
      <el-table class="table" :data="dependencies">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="本地版本" prop="localVersion"></el-table-column>
        <el-table-column label="线上版本" prop="onlineVersion"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="btnClickEvent(scope.row)">更新</el-button>
            <el-button size="mini" type="danger" @click="btnClickEvent(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="log">
        log
      </div>
      <div class="delete btn">删除</div>
      <div class="update btn">更新</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getProjectPkgJson } from '../../utils/package'
import { shell } from 'electron'
@Component
export default class Setting extends Vue {
  info = null
  dependencies = []
  loading = false

  get project () {
    return this.$store.getters.getProject
  }

  set project (value) {
    this.$store.commit('setProject', value)
  }

  @Watch('project', { deep: true })
  onChangeValue () {
    this.getProjectInfo()
  }

  async getProjectInfo () {
    this.loading = true
    console.log(this.project)
    getProjectPkgJson(this.project.path)
  }

  btnClickEvent () {
    console.log('lala')
  }

  openUrl (url: string) {
    shell.openExternal(url)
  }

  mounted () {
    // this.getDepInfo()
  }
}
</script>
<style lang="scss" scoped>
.projectDep{
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .body{
    flex: 1;
    // padding-right: 10px;
    // padding: 0 20px;
    position: relative;
    overflow: hidden;
    border: 1px solid #00000000;
    // &:hover{
    //   overflow-y: auto;
    //   padding: 0 14px 0 20px;
    // }
    .readme{
      padding: 10px 0;
      word-wrap:break-word;
    }
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
