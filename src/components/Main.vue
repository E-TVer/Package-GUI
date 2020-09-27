<template>
  <div class="main">
    <Frame />
    <div class="body">
      <Project-Dep />
    </div>
    <transition name="fade">
      <Setting v-if="setting.show" />
      <Global-Dep v-if="dep.event === 'view'" />
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Frame from './Frame.vue'
import Setting from './Setting.vue'
import GlobalDep from './dependencies/GlobalDep.vue'
import ProjectDep from './dependencies/ProjectDep.vue'

@Component({
  components: {
    Frame,
    Setting,
    GlobalDep,
    ProjectDep
  }
})
export default class Main extends Vue {
  get dep () {
    return this.$store.getters.getDep
  }

  get setting () {
    return this.$store.getters.getSetting
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
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
