<template>
  <div id="app">
    <Sidebar />
    <Main />
    <AddDep :depType="'project'" v-if="dep.event === 'add'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Main from './components/Main.vue'
import Sidebar from './components/Sidebar.vue'
import Setting from './components/Setting.vue'
import AddDep from './components/dependencies/AddDep.vue'

@Component({
  components: {
    Main,
    Sidebar,
    Setting,
    AddDep
  }
})
export default class App extends Vue {
  addShow = false

  get dep () {
    return this.$store.getters.getDep
  }
}
</script>

<style lang="scss">
@import './assets/scss/style.scss';
html, body, #app{
  height: 100%;
  margin: 0;
  padding: 0;
}
#app{
  display: flex;
  overflow: hidden;
  justify-content: flex-start;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
</style>
