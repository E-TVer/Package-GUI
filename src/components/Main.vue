<template>
  <div class="main">
    <Frame />
    <div class="body">
      <transition name="fade">
        <Project-Dep v-if="dep.event==='view' && dep.type === 'project'"/>
      </transition>
      <transition name="fade">
        <Setting v-if="setting.show" />
      </transition>
      <transition name="fade">
        <Global-Dep v-if="dep.event === 'view' && dep.type === 'global'" />
      </transition>
    </div>
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
  width: calc(100% - 240px);
  .body{
    height: calc(100% - 30px);
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
