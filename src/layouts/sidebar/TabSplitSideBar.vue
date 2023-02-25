<script lang="ts" setup name="TabSplitSideBar">
import path from 'path-browserify'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import store from '../store'
import { isExternal } from '../utils'
import Logo from '../logo/index.vue'
import ScrollerMenu from './components/ScrollerMenu.vue'
import SideBarItem from './components/SideBarItem.vue'

defineProps({
  showLogo: {
    type: Boolean,
    default: false,
  },
})
const router = useRouter()
const route = useRoute()

const state = ref(store.state)
const currentTab = ref()
const basePath = ref()
const tabs = ref()
const routes = ref([])

function getItem(item) {
  item.children = item.children || []
  return item
}
function getFullPath(item) {
  if (isExternal(item.path))
    return item.path
  return path.resolve(basePath.value, item.path)
}
function doChangeTab() {
  const matchedRoutes = route.matched
  if (matchedRoutes && matchedRoutes.length > 0) {
    tabs.value.forEach((it) => {
      if (it.path === matchedRoutes[0].path) {
        it.active = true
        basePath.value = it.path
        if (it.children)
          routes.value = it.children
      }
      else {
        it.active = false
      }
    })
  }
}
// inited 标志是否要查找第一个元素
function changeTab(item, inited = true) {
  tabs.value.forEach((it) => {
    it.active = it.path === item.path
  })
  currentTab.value = item || null
  if (inited)
    findPath(currentTab.value, currentTab.value.path)
}

function findPath(tab, fullPath) {
  const firstItem = tab.children[0]

  if (
    firstItem.component.name === 'Layout'
    && !firstItem.hidden
    && firstItem.children?.length > 0
  ) {
    findPath(firstItem, path.resolve(fullPath, firstItem.path))
  }
  else {
    if (isExternal(firstItem.path))
      window.open(firstItem.path)
    else
      router.push({ path: path.resolve(fullPath, firstItem.path) })
  }
}

onMounted(() => {
  tabs.value = store.getSplitTabs().map((it, index) => {
    return {
      ...it,
      active: index === 0,
    }
  })
  doChangeTab()
})

watch(
  () => currentTab.value,
  (newVal) => {
    routes.value = newVal.children
    basePath.value = newVal.path
  },
)
watch(() => route.path, doChangeTab)
</script>

<template>
  <div
    class="vaw-tab-split-side-bar-wrapper"
    :class="[!state.isCollapse ? 'open-status' : 'close-status']"
  >
    <div class="tab-split-tab-wrapper">
      <Logo class="tab-split-logo-wrapper" :show-title="false" />
      <el-scrollbar class="scrollbar" wrap-class="scrollbar-wrap-class">
        <div class="tab-split-content-wrapper">
          <div
            v-for="item of tabs"
            :key="item.path"
            class="label-item-wrapper"
            :class="{ 'vaw-tab-split-item-is-active': item.active }"
            @click="changeTab(item)"
          >
            <n-icon :name="item.meta.icon" size="16px" />
            <span class="label">{{ item.meta.title }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="tab-split-menu-wrapper">
      <Logo class="tab-split-logo-wrapper" :show-logo="showLogo" />
      <ScrollerMenu>
        <template #default>
          <SideBarItem
            v-for="item of routes"
            :key="item.path"
            :full-path="getFullPath(item)"
            :item="getItem(item)"
          />
        </template>
      </ScrollerMenu>
    </div>
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

.vaw-tab-split-side-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;

  .scrollbar {
    height: calc(100% - #{$logoHeight}) !important;
    background-color: var(--next-menu-bg-color);
  }

  .tab-split-tab-wrapper {
    position: relative;
    top: 0;
    left: 0;
    width: $tabSplitMenuWidth;
    min-width: $tabSplitMenuWidth;
    max-width: $tabSplitMenuWidth;
    height: 100%;
    overflow: hidden;

    .tab-split-logo-wrapper {
      width: $tabSplitMenuWidth;
      min-width: $tabSplitMenuWidth;
      max-width: $tabSplitMenuWidth;
    }

    .tab-split-content-wrapper {
      @mixin after {
        position: absolute;
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        z-index: -1;
        border-radius: 3px;
        content: '';
      }

      position: relative;
      padding: 0 2px;

      .label-item-wrapper {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-height: $logoHeight * 1.2;
        padding: 10px 0;
        overflow: hidden;
        cursor: pointer;

        &:hover:not(.vaw-tab-split-item-is-active) {
          color: var(--el-menu-hover-text-color);
        }

        & > span {
          display: inline-block;
          width: 80%;
          margin: 0 auto;
          margin-top: 5px;
          overflow: hidden;
          font-size: 12px;
          line-height: 14px;
          text-align: center;
          text-overflow: ellipsis;
        }
      }

      .vaw-tab-split-item-is-active::after {
        @include after;
      }
    }
  }

  .tab-split-menu-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: $tabSplitMenuWidth;
    overflow-x: hidden;

    .el-menu-item {
      margin: 0 2px;
      padding: 0 8px !important;
      border-radius: 4px;
    }
  }

  .vaw-menu-wrapper {
    overflow-x: hidden;
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

.tab-split-menu-wrapper .el-scrollbar__view {
  height: 100%;
}

.el-menu {
  overflow-x: hidden !important;
  border-right: none !important;
}

:deep(.el-menu--collapse .el-sub-menu__title span) {
  display: none !important;
}

:deep(.el-menu--collapse .el-sub-menu__title .el-sub-menu__icon-arrow) {
  display: none !important;
}

.el-sub-menu .el-menu-item {
  min-width: 180px !important;
}
</style>
