<script lang="ts">
import { computed, defineComponent } from 'vue'
import store from '../store'
import ScrollerMenu from '../sidebar/components/ScrollerMenu.vue'
import SideBarItem from '../sidebar/components/SideBarItem.vue'
import VAWAvatar from '../avatar/VAWAvatar.vue'
import ActionItems from '../actions/index.vue'
import Logo from '../logo/index.vue'
export default defineComponent({
  name: 'VAWHeader',
  components: {
    Logo,
    VAWAvatar,
    ActionItems,
    ScrollerMenu,
    SideBarItem,
  },
  setup() {
    const state = store.state
    const routes = computed(() => {
      return state.permissionRoutes.filter(it => !!it.name)
    })

    return {
      routes,
      state,
    }
  },
})
</script>

<template>
  <div class="vaw-header-layout" :class="[state.theme === 'light' ? 'light' : 'dark']">
    <Logo :always-show="true" />
    <div class="menu-wrapper">
      <ScrollerMenu mode="horizontal">
        <template #default>
          <SideBarItem
            v-for="item of routes"
            :key="item.path"
            :full-path="item.path"
            :item="item"
          />
        </template>
      </ScrollerMenu>
    </div>
    <div class="right-wrapper">
      <ActionItems v-if="state.device !== 'mobile'" />
      <VAWAvatar />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/variables.scss' as *;

.vaw-header-layout {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: $logoHeight;
  background-color: var(--next-menu-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);

  .menu-wrapper {
    flex: 1;
    overflow: hidden;
  }

  .right-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 12px;
    background-color: var(--next-menu-bg-color);
  }

  .avatar-wrapper {
    padding-right: 15px;
  }
}
</style>
