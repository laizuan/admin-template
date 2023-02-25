<script lang="ts" setup name="Logo">
import { computed } from 'vue'
import store from '../store'

defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  showLogo: {
    type: Boolean,
    default: true,
  },
  alwaysShow: {
    type: Boolean,
    default: false,
  },
})
const state = store.state
const projectName = computed(() => {
  return import.meta.env.VITE_GLOB_APP_TITLE || ''
})
</script>

<template>
  <div
    class="logo-wrapper"
    :style="{
      'border-bottom':
        state.layoutMode === 'ttb' ? 'none' : '1px dashed var(--el-border-color-light)',
    }"
  >
    <img v-if="showLogo" class="logo-img" src="../../assets/logo.png">
    <transition v-if="showTitle" name="el-fade-in-linear">
      <span v-show="!state.isCollapse || alwaysShow" class="logo-title">{{ projectName }}</span>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $menuWidth;
  height: $logoHeight;
  background-color: var(--next-menu-bg-color);

  .logo-img {
    width: 30px;
    margin-right: 16px;
  }

  .logo-title {
    font-weight: bold;
  }
}

.vaw-tab-split-side-bar-wrapper {
  .tab-split-logo-wrapper .logo-img {
    margin-right: 0;
  }

  .tab-split-menu-wrapper .tab-split-logo-wrapper {
    display: inline-block;
    width: 100%;
    line-height: 48px;
    text-align: left;
  }
}
</style>
