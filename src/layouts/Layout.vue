<script lang="ts" setup name="Layout">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SideBar from './sidebar/SideBar.vue'
import TabSplitSideBar from './sidebar/TabSplitSideBar.vue'
import MainLayout from './MainLayout.vue'
import VAWHeader from './header/index.vue'
import Setting from './setting/index.vue'

import store from './store'
import { useEmit } from '@/hooks'
const emit = useEmit()
const appSettingRef = ref()
emit?.on('show_setting', () => {
  appSettingRef.value.openDrawer()
})

const state = ref(store.state)

function handleScreenResize() {
  const width = document.body.clientWidth
  if (width <= 768) {
    store.changeDevice('mobile')
    store.toggleCollapse(true)
  }
  else if (width < 992 && width > 768) {
    store.changeDevice('pad')
    store.toggleCollapse(true)
  }
  else if (width < 1200 && width >= 992) {
    store.changeDevice('pc')
    store.toggleCollapse(false)
  }
  else {
    store.changeDevice('pc')
    store.toggleCollapse(false)
  }
}
function closeMenu() {
  store.toggleCollapse(true)
}
onMounted(() => {
  handleScreenResize()
  window.addEventListener('resize', handleScreenResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleScreenResize)
})
</script>

<template>
  <div
    class="vaw-layout-container"
    :class="[state.device === 'mobile' && 'is-mobile', state.theme, state.layoutMode]"
  >
    <template v-if="state.device === 'mobile'">
      <SideBar ref="sideBar" />
      <MainLayout />
    </template>
    <template v-else>
      <template v-if="state.layoutMode === 'ttb'">
        <VAWHeader />
      </template>
      <template v-else-if="state.layoutMode === 'lcr'">
        <TabSplitSideBar />
      </template>
      <template v-else>
        <SideBar ref="sideBar" />
      </template>
      <MainLayout :show-nav-bar="state.layoutMode !== 'ttb'" />
    </template>
    <div
      v-if="state.device === 'mobile'"
      class="mobile-shadow"
      :class="[state.isCollapse ? 'close-shadow' : 'show-shadow']"
      @click="closeMenu"
    />
    <Setting ref="appSettingRef" />
  </div>
</template>

<style scoped lang="scss">
@use './styles/variables.scss' as *;

.vaw-layout-container {
  max-width: 100%;
  height: 100%;
  overflow-x: hidden;

  .mobile-shadow {
    display: none;
  }

  .layout-mode-ttb {
    margin-top: $logoHeight;
    transition: all $transitionTime;
  }
}

.is-mobile {
  .mobile-shadow {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 98;
    width: 100vw;
    height: 100vh;
    background-color: #000;
  }

  .close-shadow {
    display: none;
  }

  .show-shadow {
    display: block;
    opacity: 0.5;
    transition: all $transitionTime;
  }
}
</style>
