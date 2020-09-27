<template>
  <div class="add">
    <div class="box">
      <div class="title">安装{{ dep.type === 'global' ? '全局' : '项目' }}依赖</div>
      <div class="content">
        <el-input v-model.trim="txt" placeholder="name or name@version">
          <el-button slot="append" icon="el-icon-download"></el-button>
        </el-input>
      </div>
      <div class="detail">{{detail}}</div>
      <div class="btns">
        <el-button size="small" @click="closeAddDep()">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Add extends Vue {
  txt = ''
  name = ''
  version = ''
  detail = ''

  @Prop({
    type: String,
    required: true,
    default: 'global'
  }) depType !: string

  @Prop({
    type: String,
    required: false,
    default: ''
  }) projectPath !: string

  get dep () {
    return this.$store.getters.getDep
  }

  set dep (value) {
    this.$store.commit('setDep', value)
  }

  closeAddDep () {
    this.dep.event = ''
  }
}
</script>
<style lang="scss" scoped>
.add{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(7, 17, 27, 0.7);
  z-index: 5;
  .box{
    width: 620px;
    height: auto;
    background-color: #fff;
    padding: 10px;
    border-radius: 2px;
    .title{
      margin-bottom: 20px;
    }
    .detail{
      margin: 15px 0;
      border: 1px solid #dedede;
      height: 200px;
      width: 100%;
      border-radius: 2px;
    }
    .btns{
      text-align: center;
    }
  }
}
</style>
