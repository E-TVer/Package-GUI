<template>
  <div class="setting">setting</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Setting extends Vue {

}
</script>
<style lang="scss" scoped>
.setting{
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 5;
  background-color: #fff;
  width: calc(100% - 240px);
  height: calc(100% - 30px);
}
</style>
