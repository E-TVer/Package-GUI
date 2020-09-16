<template>
  <div class="main">
    <Frame />
    <div class="body">body</div>
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
    background-color: #ddd;
  }
}
</style>
