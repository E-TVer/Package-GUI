<template>
  <div class="sidebar">
    <div class="top"></div>
    <div class="middle">
      <div class="header">
        <div :class="[activeName === 'global' ? 'active ' : ''] + 'global'" @click="activeNameEvent('global')">全局</div>
        <div :class="[activeName === 'project' ? 'active ' : ''] + 'project'" @click="activeNameEvent('project')">项目</div>
      </div>
      <div class="body pkg-scrollbar">
        <div class="global" v-show="activeName === 'global'">
          <hsc-menu-style-white>
            <hsc-menu-context-menu style="display: block;" v-for="i in 50" :key="i">
              <div class="item">全局依赖</div>
              <template slot="contextmenu">
                <hsc-menu-item label="删除" @click="deleteItem(i + '')" :sync="true" />
              </template>
            </hsc-menu-context-menu>
          </hsc-menu-style-white>
        </div>
        <div class="project" v-show="activeName === 'project'">
          <hsc-menu-style-white>
            <hsc-menu-context-menu style="display: block;" v-for="i in 50" :key="i">
              <div class="item">项目目录</div>
              <template slot="contextmenu">
                <hsc-menu-item label="删除" @click="deleteItem(i + '')" :sync="true" />
              </template>
            </hsc-menu-context-menu>
          </hsc-menu-style-white>
        </div>
      </div>
    </div>
    <div class="bottom" v-show="activeName === 'project'">
      <div class="btn add">
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
@Component
export default class Sidebar extends Vue {
  activeName = 'global'

  activeNameEvent (e: string) {
    this.activeName = e
  }

  deleteItem (e: string) {
    console.log(e)
  }
}
</script>
<style lang="scss" scoped>
.sidebar{
  width: 220px;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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
        &:hover{
          background-color: #f0f0f0;
        }
      }
    }
  }
  .bottom{
    height: 30px;
    display: flex;
    .btn{
      width: 100%;
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
    .add{
      i{
        color: #5c5c5c;
        transform: scale(0.6);
        margin-right: 6px;
      }
    }
    .sort{
      width: 70px;
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
