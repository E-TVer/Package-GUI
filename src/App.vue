<template>
  <div id="app">
    <Sidebar />
    <Main />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Main from './components/Main.vue'
// import Setting from './components/Setting.vue'
import Sidebar from './components/Sidebar.vue'

@Component({
  components: {
    Main,
    // Setting,
    Sidebar
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
html, body, #app{
  height: 100%;
  margin: 0;
  padding: 0;
}
#app{
  display: flex;
  justify-content: flex-start;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
</style>
