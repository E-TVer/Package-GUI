<template>
  <div class="projectDep">
    <div class="body pkg-scrollbar">
      <div class="table">
        <vxe-table highlight-hover-row size="mini" :loading="loading" border auto-resize sync-resize height="auto" :data="allDep">
          <vxe-table-column field="name" title="依赖"></vxe-table-column>
          <vxe-table-column field="version" title="本地版本"></vxe-table-column>
          <vxe-table-column field="onlineVersion" title="最新版本"></vxe-table-column>
          <vxe-table-column field="env" title="环境" sort-by="env" sortable></vxe-table-column>
          <vxe-table-column title="操作">
            <template v-slot="{row, rowIndex}">
              <el-button size="mini" @click="deleteDepEvent(row, rowIndex)">删除</el-button>
              <el-button size="mini" @click="updateDepEvent(row, rowIndex)" type="primary">更新</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="btns">
        <el-button>lala</el-button>
      </div>
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

interface Dependencies {
  name: string;
  version: string;
  env: string;
}

@Component
export default class Setting extends Vue {
  info = null
  json = {}
  dependencies: Dependencies[] = []
  devDependencies: Dependencies[] = []
  allDep: Dependencies[] = []
  loading = false
  tableHeight = window.innerHeight - 40

  get project () {
    return this.$store.getters.getProject
  }

  set project (value) {
    this.$store.commit('setProject', value)
  }

  get dep () {
    return this.$store.getters.getDep
  }

  set dep (value) {
    this.$store.commit('setDep', value)
  }

  @Watch('project', { deep: true })
  onChangeValue () {
    this.getProjectInfo()
  }

  async getProjectInfo () {
    this.loading = true
    const json = await getProjectPkgJson(this.project.path)
    this.json = json
    const depArr = []
    if (json.dependencies) {
      for (const i in json.dependencies) {
        const j = {
          name: i,
          version: json.dependencies[i],
          env: ''
        }
        depArr.push(j)
      }
      this.dependencies = depArr
    }
    const devArr = []
    if (json.devDependencies) {
      for (const i in json.devDependencies) {
        const j = {
          name: i,
          version: json.devDependencies[i],
          env: 'dev'
        }
        devArr.push(j)
      }
      this.devDependencies = devArr
    }
    this.allDep = depArr.concat(devArr)
    this.loading = false
  }

  updateDepEvent (row: object, index: number) {
    console.log(row, index, 'updateDepEvent')
  }

  btnClickEvent () {
    console.log('lala')
  }

  openUrl (url: string) {
    shell.openExternal(url)
  }

  // mounted () {}
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
    position: relative;
    border: 1px solid #00000000;
    .table{
      height: calc(100% - 40px);
    }
    .btns{
      height: 40px;
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
