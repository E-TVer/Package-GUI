<template>
  <div class="sidebar" v-loading="loading">
    <div class="top"></div>
    <div class="middle">
      <div class="header">
        <div :class="[sidebar.type === 'global' ? 'active ' : ''] + 'global'" @click="activeNameEvent('global')">全局</div>
        <div :class="[sidebar.type === 'project' ? 'active ' : ''] + 'project'" @click="activeNameEvent('project')">项目</div>
      </div>
      <div class="body pkg-scrollbar">
        <div class="global" v-show="sidebar.type === 'global'">
          <hsc-menu-style-white>
            <hsc-menu-context-menu style="display: block;" v-for="(i, index) in globalDep" :key="index">
              <div class="item" @click="globalitemClick(i.name, i.version, 'global')">{{i.name}}</div>
              <template slot="contextmenu">
                <hsc-menu-item label="删除" @click="deleteItem(i)" :sync="true" />
              </template>
            </hsc-menu-context-menu>
          </hsc-menu-style-white>
        </div>
        <div class="project" v-show="sidebar.type === 'project'">
          <hsc-menu-style-white>
            <hsc-menu-context-menu style="display: block;" v-for="i in projects" :key="i.name">
              <div class="item" @click="projectItemClick(i.name, i.path)">
                <i class="el-icon-folder"></i>
                <span>{{i.name}}</span>
              </div>
              <template slot="contextmenu">
                <hsc-menu-item label="删除" @click="deleteItem(i + '')" :sync="true" />
                <hsc-menu-item label="打开项目目录" @click="showInFolder(i.path)" :sync="true" />
              </template>
            </hsc-menu-context-menu>
          </hsc-menu-style-white>
        </div>
      </div>
    </div>
    <div class="bottom" v-show="sidebar.type === 'global'">
      <div class="btn refresh" @click="refreshBtnClick()">
        <i class="gg-sync"></i>
        <span>刷新</span>
      </div>
      <div class="btn add" @click="addDepEvent('global')">
        <i class="gg-add"></i>
        <span>添加全局依赖</span>
      </div>
      <div class="btn sort" @click="sortBtnClick('global')">
        <i class="gg-sort-az" v-show="globalSort"></i>
        <i class="gg-sort-za" v-show="!globalSort"></i>
        <span>排序</span>
      </div>
    </div>
    <div class="bottom" v-show="sidebar.type === 'project'">
      <div class="btn add" @click="addProject()">
        <i class="gg-folder-add"></i>
        <span>添加项目目录</span>
      </div>
      <div class="btn sort">
        <i class="gg-sort-az"></i>
        <!-- <i class="gg-sort-za"></i> -->
        <span>排序</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { shell } from 'electron'
import { getGlobalDepSimple } from '../plugins/spawn/global/globalDep'
import { getProject } from '../utils/package'
interface ProjectValue {
  name: string;
  path: string;
}
@Component
export default class Sidebar extends Vue {
  loading = false
  globalSort = true
  globalDep: Array<object> = []
  projects: Array<ProjectValue> = []

  get sidebar () {
    return this.$store.getters.getSidebar
  }

  set sidebar (value) {
    this.$store.commit('setSidebar', value)
  }

  get dep () {
    return this.$store.getters.getDep
  }

  set dep (value) {
    this.$store.commit('setDep', value)
  }

  get project () {
    return this.$store.getters.getProject
  }

  set project (value) {
    this.$store.commit('setProject', value)
  }

  addDepEvent (e: string) {
    this.dep.event = 'add'
    this.dep.type = e
  }

  activeNameEvent (e: string) {
    this.sidebar.type = e
  }

  globalitemClick (name: string, version: string, type: string) {
    this.dep.name = name
    this.dep.version = version
    this.dep.type = type
    this.dep.event = 'view'
  }

  projectItemClick (name: string, path: string) {
    this.project.name = name
    this.project.path = path
  }

  deleteItem (e: string) {
    console.log(e)
  }

  async refreshBtnClick () {
    this.loading = true
    this.globalDep = await getGlobalDepSimple()
    this.loading = false
  }

  async sortBtnClick (type: string) {
    this.globalSort = !this.globalSort
    if (type === 'global') {
      this.globalDep.reverse()
      return false
    }
    if (type === 'project') {
      this.projects.reverse()
      return false
    }
  }

  showInFolder (path: string) {
    shell.showItemInFolder(path)
  }

  async addProject () {
    const project = await getProject()
    if (project) {
      for (const i of this.projects) {
        if (i.name === project.name) {
          this.$message.warning('项目已存在, 请勿重复添加')
          return false
        }
      }
      this.projects.push(project)
    } else {
      this.$message.warning('不是项目目录, 无法添加')
    }
  }

  mounted () {
    // this.refreshBtnClick()
  }
}
</script>
<style lang="scss" scoped>
.sidebar{
  width: 240px;
  height: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  user-select: none;
  border-right: 1px solid #ededed;
  .top{
    height: 30px;
    -webkit-app-region: drag;
  }
  .middle{
    flex: 1;
    display: flex;
    flex-direction: column;
    .header{
      display: flex;
      justify-content: space-around;
      height: 28px;
      .global, .project{
        font-size: 14px;
        cursor: pointer;
        width: 70px;
        text-align: center;
        color: #5c5c5c;
        &.active{
          font-weight: bold;
          border-bottom: 3px solid #34495e;
        }
      }
    }
    .body{
      flex: 1;
      position: relative;
      overflow: hidden;
      &:hover{
        overflow-y: auto;
      }
      .global, .project{
        position: absolute;
        width: 100%;
      }
      .item{
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-left: 14px;
        font-size: 14px;
        i{
          margin-right: 4px;
        }
        &:hover{
          background-color: #f0f0f0;
        }
        &.hasUpdate{
          &::after{
            content: '*';
            color: red;
          }
        }
      }
    }
  }
  .bottom{
    height: 30px;
    display: flex;
    .btn{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      cursor: pointer;
      box-sizing: border-box;
      border-top: 1px solid #ededed;
      &:hover{
        background-color: #f0f0f0;
      }
    }
    .refresh{
      width: 60px;
      border-right: 1px solid #ededed;
      i{
        color: #5c5c5c;
        transform: scale(0.6);
        margin-right: 6px;
      }
    }
    .add{
      flex: 1;
      position: relative;
      i{
        color: #5c5c5c;
        transform: scale(0.6);
        margin-right: 6px;
      }
      .directory{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .sort{
      width: 60px;
      border-left: 1px solid #ededed;
      i{
        color: #5c5c5c;
        transform: scale(0.8);
        margin-right: 6px;
      }
    }
  }
}
</style>
