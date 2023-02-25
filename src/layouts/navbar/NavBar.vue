<script lang="ts" setup name="NavBar">
import store from '../store'
import Humburger from '../humburger/index.vue'
import VAWAvatar from '../avatar/VAWAvatar.vue'
import ActionItems from '../actions/index.vue'
import Breadcrumb from '../breadcrumb/index.vue'
</script>

<template>
  <div class="vaw-nav-bar-wrapper">
    <Humburger />
    <Breadcrumb v-if="store.state.device !== 'mobile'" />
    <div style="flex: 1" />
    <div class="right-wrapper">
      <ActionItems />
      <VAWAvatar />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/variables.scss' as *;

.vaw-nav-bar-wrapper {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: $logoHeight;
  min-height: $logoHeight;
  max-height: $logoHeight;
  overflow: hidden;
  background-color: var(--next-menu-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);

  .right-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 16px;
    background-color: var(--next-menu-bg-color);
  }
}
</style>
