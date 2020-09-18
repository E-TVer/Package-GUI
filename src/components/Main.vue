<template>
  <div class="main">
    <Frame />
    <div class="body">
      <div class="header">
        <el-button size="mini">添加新依赖</el-button>
        <el-button size="mini">一键更新依赖</el-button>
        <el-button size="mini">打开项目目录</el-button>
      </div>
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
        <div class="count">共有 {{dependencies.length}} 个依赖</div>
        <div class="setting">
          <i class="gg-options"></i>
          <span>设置</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Frame from './Frame.vue'
@Component({
  components: {
    Frame
  }
})
export default class Main extends Vue {
  dependencies = [
    { name: 'vue', localVersion: '2.6.12', onlineVersion: '2.8.9' },
    { name: 'vue', localVersion: '2.8.11', onlineVersion: '2.9.1' }
  ]

  btnClickEvent (e: object) {
    console.log(e)
  }
}
</script>
<style lang="scss" scoped>
.main{
  flex: 1;
  display: flex;
  flex-direction: column;
  .body{
    flex: 1;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .header{
      height: 40px;
    }
    .body{
      flex: 1;
      position: relative;
      overflow-y: auto;
      .table{
        position: absolute;
        .updateBtn{
          margin-top: 6px;
        }
      }
    }
    .footer{
      height: 30px;
      box-sizing: border-box;
      border-top: 1px solid #ededed;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 12px;
      .count{
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
      }
      .setting{
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
      i{
        color: #5c5c5c;
        transform: scale(0.8);
        margin-right: 6px;
      }
    }
  }
}
</style>
