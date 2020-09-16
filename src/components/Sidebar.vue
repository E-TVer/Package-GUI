<template>
  <div class="sidebar">sidebar</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Sidebar extends Vue {

}
</script>
<style lang="scss" scoped>
.sidebar{
  width: 220px;
  height: 100%;
  background-color: #ccc;
}
</style>
