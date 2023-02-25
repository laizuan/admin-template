<script lang="ts" setup name="MainLayout">
import { computed } from 'vue'
import NavBar from './navbar/NavBar.vue'
import TabBar from './tabbar/index.vue'
// import Footer from './footer/index.vue'
import Main from './Main.vue'
import store from './store'
const props = defineProps({
  showNavBar: {
    type: Boolean,
    default: true,
  },
})
const state = store.state
// function onFixedHeader() {
//   store.toggleFixedNavBar(!state.isFixedNavBar)
// }
const mShowNavBar = computed(() => {
  return props.showNavBar
})
// const isShowHeader = computed(() => {
//   return store.isShowHeader()
// })
</script>

<template>
  <div
    class="vaw-main-layout-container"
    :class="[
      state.layoutMode === 'ttb'
        ? 'main-layout__ttb'
        : !state.isCollapse
          ? 'main-layout-open-status'
          : 'main-layout-close-status',
      state.isFixedNavBar ? 'main-layout_fixed-nav-bar' : 'main-layout',
    ]"
  >
    <section
      :class="[
        state.layoutMode === 'ttb'
          ? 'nav-bar__ttb'
          : !state.isCollapse
            ? 'nav-bar-open-status'
            : 'nav-bar-close-status',
        state.isFixedNavBar ? 'fixed-nav-bar' : '',
        !mShowNavBar ? 'tab-bar-top' : '',
      ]"
    >
      <NavBar v-if="mShowNavBar" />
      <TabBar />
    </section>
    <el-scrollbar class="main-base-style">
      <section class="main-section">
        <Main />
      </section>
      <!-- <section class="footer-wrapper">
        <Footer />
      </section> -->
      <el-backtop target=".main-base-style" />
    </el-scrollbar>
    <el-backtop target=".vaw-main-layout-container" />
  </div>
</template>

<style lang="scss" scoped>
@use './styles/variables.scss' as *;

.main-layout__ttb {
  margin-left: 0;
}

.main-layout-open-status {
  margin-left: $menuWidth;
}

.main-layout-close-status {
  margin-left: $minMenuWidth;
}

.nav-bar__ttb {
  width: 100%;
}

.nav-bar-open-status.fixed-nav-bar {
  width: calc(100% - #{$menuWidth});
}

.nav-bar-close-status.fixed-nav-bar {
  width: calc(100% - #{$minMenuWidth});
}

.main-layout {
  padding-top: 0;
  overflow-y: auto;
}

.main-layout_fixed-nav-bar {
  padding-top: $logoHeight + $tabHeight;
  overflow-y: hidden;

  .main-base-style {
    overflow-y: auto;
  }
}

.vaw-main-layout-container {
  box-sizing: border-box;
  height: 100%;
  transition: margin-left $transitionTime;

  .main-base-style {
    box-sizing: border-box;
    height: 100%;
    padding: 10px;
  }

  .main-section {
    min-height: calc(100% - #{$footerHeight} - 6px);
    overflow-x: hidden;
  }

  .fixed-nav-bar {
    position: fixed;
    top: 0;
    z-index: 96;
    transition: width $transitionTime;
  }

  .tab-bar-top {
    padding-top: $logoHeight;
  }
}

.footer-wrapper {
  margin-top: 6px;
}

.is-mobile {
  .main-layout-open-status,
  .main-layout-close-status {
    margin-left: 0;
    transition: none;
  }

  .nav-bar-open-status,
  .nav-bar-close-status {
    width: 100%;
  }
}
</style>
