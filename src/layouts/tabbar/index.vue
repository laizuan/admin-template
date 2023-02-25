<script lang="ts" setup name="TabBar">
import path from 'path-browserify'
import qs from 'qs'
import type { RouteRecordRaw, _RouteLocationBase } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, reactive, ref, watch } from 'vue'
import { Back, CircleClose, Refresh, Right } from '@element-plus/icons-vue'
import store from '../store'
const publicPath = import.meta.env.VITE_PUBLIC_PATH

const currRoute = useRoute()
const router = useRouter()

const currentTab = ref(currRoute.fullPath)
const contextMenuStyle = reactive({
  left: '0',
  top: '0',
})
const showContextMenu = ref(false)
const selectRoute = ref({} as RouteRecordRaw & _RouteLocationBase)
const showLeftMenu = ref(true)
const showRightMenu = ref(true)
const state = ref(store.state)
const tabRef = ref()

function initRoute() {
  const affixedRoutes = findAffixedRoutes(state.value.permissionRoutes, '/')
  affixedRoutes.forEach((it) => {
    store.addVisitedView(it)
  })

  if (currRoute.meta.ignoreTabbar) {
    currentTab.value = ''
    return
  }
  store.addVisitedView(currRoute).then((route) => {
    currentTab.value = route.fullPath
  })
}
function findAffixedRoutes(routes, basePath) {
  const temp = []
  routes.forEach((it) => {
    if (!it.hidden && it.meta && it.meta.affix) {
      temp.push({
        name: it.name,
        fullPath: path.resolve(basePath, it.path),
        path: it.path,
        meta: it.meta,
      })
    }
    if (it.children && it.children.length > 0)
      temp.push(...findAffixedRoutes(it.children, path.resolve(basePath, it.path)))
  })
  return temp
}
function isAffix(route) {
  return route.meta && route.meta.affix
}
function onContextMenu(ctx) {
  const { clientX } = ctx
  const { x } = tabRef.value.$el.getBoundingClientRect()
  const parentElementRect = document
    .getElementById('tagViewTab')
    .getElementsByClassName('el-tabs__nav is-top')[0]
    .getBoundingClientRect()
  if (clientX < parentElementRect.x)
    return

  if (clientX > parentElementRect.x + parentElementRect.width)
    return

  selectRoute.value = null
  selectRoute.value = state.value.visitedView.find((it) => {
    const { x, width } = document.getElementById(`tab-${it.fullPath}`).getBoundingClientRect()
    if (x < clientX && clientX < x + width)
      return it
    else
      return null
  })
  if (selectRoute.value) {
    showLeftMenu.value = isLeftLast(selectRoute.value)
    showRightMenu.value = isRightLast(selectRoute.value)
    const screenWidth = document.body.clientWidth
    contextMenuStyle.left
      = `${clientX + 130 > screenWidth ? clientX - 130 - x - 15 : clientX - x + 15}px`
    contextMenuStyle.top = '15px'
    showContextMenu.value = true
  }
}
function clickTab(route) {
  const query = route.props.name.split('?')[1]
  router.push({ path: route.props.name, query: qs.parse(query) })
}
function removeTab(name) {
  const findItem = state.value.visitedView.find(it => it.fullPath === name)
  if (findItem) {
    store.removeVisitedView(findItem).then((_) => {
      if (currentTab.value === name) {
        currentTab.value = state.value.visitedView[state.value.visitedView.length - 1].fullPath
        router.push(currentTab.value)
      }
    })
  }
}

// context menu actions
function isLeftLast(tempRoute) {
  return state.value.visitedView.indexOf(tempRoute) === 0
}
function isRightLast(tempRoute) {
  return state.value.visitedView.indexOf(tempRoute) === state.value.visitedView.length - 1
}
function refreshRoute() {
  router.replace({ path: `${publicPath}/redirect${currRoute.path}` })
}
function closeLeft() {
  store.closeLeftVisitedView(selectRoute.value).then((_) => {
    if (currRoute.fullPath !== selectRoute.value.fullPath)
      router.push(state.value.visitedView[state.value.visitedView.length - 1].fullPath)
  })
}
function closeRight() {
  store.closeRightVisitedView(selectRoute.value).then((_) => {
    if (currRoute.fullPath !== selectRoute.value.fullPath)
      router.push(state.value.visitedView[state.value.visitedView.length - 1].fullPath)
  })
}
function closeAll() {
  store.closeAllVisitedView().then((_) => {
    router.push(state.value.visitedView[state.value.visitedView.length - 1].fullPath)
  })
}
function closeMenu() {
  showContextMenu.value = false
}

onBeforeMount(() => {
  initRoute()
})

watch(
  () => showContextMenu.value,
  (val) => {
    if (val)
      document.body.addEventListener('click', closeMenu)
    else
      document.body.removeEventListener('click', closeMenu)
  },
)

watch(
  () => router.currentRoute.value,
  (val) => {
    if (val.path.includes('/redirect'))
      return

    if (val.meta.ignoreTabbar) {
      currentTab.value = ''
      return
    }
    store.addVisitedView(val).then((route) => {
      currentTab.value = route.fullPath
    })
  },
)
</script>

<template>
  <div class="vaw-tab-bar-container">
    <el-tabs
      id="tagViewTab"
      ref="tabRef"
      v-model="currentTab"
      type="card"
      @tab-click="clickTab"
      @tab-remove="removeTab"
      @contextmenu.prevent="onContextMenu"
    >
      <el-tab-pane
        v-for="item of state.visitedView"
        :key="item.path"
        :label="item.meta ? item.meta.title : item.name"
        :name="item.fullPath"
        :closable="!isAffix(item)"
      />
    </el-tabs>
    <ul v-show="showContextMenu" class="contex-menu-wrapper" :style="contextMenuStyle">
      <li @click="refreshRoute">
        <el-button link :underline="false">
          <el-icon class="mr-2">
            <Refresh />
          </el-icon>刷新页面
        </el-button>
      </li>
      <li :disabled="showLeftMenu" @click="closeLeft">
        <el-button :disabled="showLeftMenu" link>
          <el-icon class="mr-2">
            <Back />
          </el-icon>关闭左侧
        </el-button>
      </li>
      <li :disabled="showRightMenu" @click="closeRight">
        <el-button :disabled="showRightMenu" link>
          <el-icon class="mr-2">
            <Right />
          </el-icon>关闭右侧
        </el-button>
      </li>
      <li @click="closeAll">
        <el-button link>
          <el-icon class="mr-2">
            <CircleClose />
          </el-icon>
          关闭所有
        </el-button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;

.dark .vaw-tab-bar-container {
  border-bottom: 1px solid var(--el-border-color-light);
  box-shadow: none;
}

.vaw-tab-bar-container {
  position: relative;
  box-sizing: border-box;
  height: $tabHeight;
  line-height: $tabHeight;
  white-space: nowrap;
  background-color: var(--next-menu-bg-color);
  box-shadow: 0 5px 10px #ddd;

  .contex-menu-wrapper {
    position: absolute;
    z-index: 999;
    width: 130px;
    padding-left: 0;
    list-style: none;
    background-color: var(--next-menu-bg-color);
    box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);

    & > li {
      box-sizing: border-box;
      width: 100%;
      padding-left: 15px;
      line-height: 40px;
    }

    & > li:hover {
      background-color: var(--el-menu-hover-bg-color);
    }
  }

  .humburger-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;

    :deep(.fold-wrapper) {
      margin-top: calc(50% - 10px);
    }
  }

  .tab-humburger-wrapper {
    margin-left: 40px;
    transition: margin-left $transitionTime;
  }

  .tab-no-humburger-wrapper {
    margin-left: 0;
    transition: margin-left $transitionTime;
  }
}

:deep(.el-tabs--card > .el-tabs__header) {
  margin: 0;
  padding: 0 10px;
  border: none;

  .el-tabs__nav {
    border: none !important;
  }

  .el-tabs__item {
    height: calc(#{$tabHeight} - 12px);
    padding: 0 10px !important;
    font-weight: normal;
    font-size: 12px;
    line-height: calc(#{$tabHeight} - 14px);
    border: 1px solid var(--el-border-color-light) !important;
    border-radius: 2px;
  }

  .el-tabs__item.is-active {
    color: var(--el-color-white);
    background-color: var(--el-color-primary);
    border: 1px solid var(--el-color-primary) !important;
  }

  .el-tabs__item:hover {
    border: 1px solid var(--el-color-primary) !important;
  }
}

:deep(.el-tabs__nav) {
  .el-tabs__item + .el-tabs__item {
    margin-left: 10px;
  }
}
</style>
