<template>
  <div class="globalDep">
    <div class="header">
      <div class="item" v-if="info">
        <div class="name">名称: {{info.package.name}}</div>
        <div class="version">版本: {{info.package.version}}</div>
        <div class="date">日期: {{info.package.date}}</div>
      </div>
      <div class="item" v-if="info">
        <div class="description">描述: {{info.package.description}}</div>
      </div>
    </div>
    <div class="body markdown-body pkg-scrollbar">
      <div class="readme link-none" v-html="readme"></div>
    </div>
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
import { searchPkg, getRepository, getMarkdown } from '../../utils/package'
import marked from 'marked'
import hljs from 'highlight.js'
@Component({
  components: {}
})
export default class Setting extends Vue {
  info = null
  readme = ''
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
    this.readme = ''
    this.dep.name = 'css'
    const result = await searchPkg(this.dep.name)

    if (result) {
      this.info = result.data.results[0]
    }
    const repo = await getRepository(this.dep.name)

    if (repo) {
      // const fullname = repo.data.items[0].full_name
      // const branch = repo.data.items[0].default_branch
      const fullname = 'markedjs/marked'
      const branch = 'master'
      const md = await getMarkdown(fullname, branch, 'README.md')
      console.log(md)
      this.readme = marked(md.data, {
        mangle: false,
        highlight: (code, language) => {
          const lan = hljs.getLanguage(language) ? language : 'plaintext'
          return hljs.highlight(lan, code).value
        }
      })
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
    padding: 20px 20px 0;
    color: #363636;
    font-size: 14px;
    .item{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
  .body{
    flex: 1;
    padding-right: 10px;
    padding: 0 20px;
    position: relative;
    overflow: hidden;
    border: 1px solid #00000000;
    &:hover{
      overflow-y: auto;
      padding: 0 14px 0 20px;
    }
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
