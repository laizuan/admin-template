<script lang="ts" setup name="SideBar">
import { computed } from 'vue'
import store from '../store'
import Logo from '../logo/index.vue'
import SideBarItem from './components/SideBarItem.vue'
import ScrollerMenu from './components/ScrollerMenu.vue'

defineProps({
  showLogo: {
    type: Boolean,
    default: true,
  },
})

const state = store.state
const routes = computed(() => {
  return state.permissionRoutes.filter(it => !!it.name)
})
</script>

<template>
  <div class="vaw-side-bar-wrapper" :class="[!state.isCollapse ? 'open-status' : 'close-status']">
    <transition name="logo">
      <Logo v-if="showLogo" />
    </transition>
    <ScrollerMenu>
      <template #default>
        <SideBarItem v-for="item of routes" :key="item.path" :full-path="item.path" :item="item" />
      </template>
    </ScrollerMenu>
    <div class="mobile-shadow" />
  </div>
</template>

<style scoped lang="scss">
@use '../styles/variables.scss' as *;

.open-status {
  width: $menuWidth;
  box-shadow: 2px 5px 10px rgb(0 0 0 / 12%);
  transition: all $transitionTime;
}

.close-status {
  width: $minMenuWidth;
  box-shadow: none;
  transition: all $transitionTime;
}

.vaw-side-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;

  .vaw-menu-wrapper {
    overflow-x: hidden;
  }

  .scrollbar {
    height: calc(100% - #{$logoHeight}) !important;
    background-color: var(--next-menu-bg-color);
  }
}

.is-mobile {
  .open-status {
    width: $menuWidth;
    transform: translateX(0);
    transition: transform $transitionTime;
  }

  .close-status {
    width: $menuWidth;
    box-shadow: none;
    transform: translateX(-$menuWidth);
    transition: transform $transitionTime;
  }
}
</style>

<style lang="scss">
@use '../styles/variables.scss' as *;

.scrollbar-wrap-class {
  overflow-x: hidden !important;
}

.el-menu {
  overflow: hidden;
  border-right: none !important;
}

.el-menu-item:hover {
  color: var(--el-menu-active-color);
  background-color: transparent;
}

.el-menu-item.is-active {
  color: var(--el-menu-active-color);
  background-color: var(--el-color-primary-light-8);
}

:deep(.el-menu--collapse .el-sub-menu__title span) {
  display: none !important;
}

:deep(.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow) {
  display: none !important;
}
</style>
