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
      <div class="website btn" @click="openUrl(homepage)" v-if="homepage !== ''">官网</div>
      <div class="website btn" @click="openUrl(htmlUrl)" v-if="htmlUrl !== ''">Github</div>
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
import { shell } from 'electron'
@Component
export default class Setting extends Vue {
  info = null
  readme = ''
  loading = false

  homepage = ''
  htmlUrl = ''

  dependencies = []

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
    this.loading = true
    this.readme = ''
    this.homepage = ''
    this.htmlUrl = ''
    const result = await searchPkg(this.dep.name)

    if (result) {
      this.info = result.data.results[0]
      const arr = result.data.results[0].package.links.repository.split('/')
      const name = arr[arr.length - 1]
      this.getRepo(name)
    } else {
      this.loading = false
    }
  }

  async getRepo (name: string) {
    const repo = await getRepository(name)
    if (repo) {
      this.homepage = repo.data.items[0].homepage
      this.htmlUrl = repo.data.items[0].html_url
      const fullname = repo.data.items[0].full_name
      const branch = repo.data.items[0].default_branch
      this.getMd(fullname, branch)
    }
  }

  async getMd (fullname: string, branch: string) {
    const mdArr = ['README.md', 'readme.md', 'README.MD', 'Readme.md', 'readme.MD', 'ReadMe.md', 'ReadMe.Md', 'ReadMe.MD', 'README.markdown', 'readme.markdown', 'README', 'readme']
    for (const i of mdArr) {
      const md = await getMarkdown(fullname, branch, i)
      if (md) {
        this.readme = marked(md.data, {
          mangle: false,
          highlight: (code, language) => {
            const lan = hljs.getLanguage(language) ? language : 'plaintext'
            return hljs.highlight(lan, code).value
          }
        })
        this.loading = false
        return false
      }
    }
    this.loading = false
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
