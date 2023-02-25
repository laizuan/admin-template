<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import store from '../../store'
export default defineComponent({
  name: 'ScrollerMenu',
  props: {
    routes: {
      type: Array,
      require: true,
      default: () => {
        return []
      },
    },
    fullPath: {
      type: String,
      default: null,
    },
    mode: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical',
    },
  },
  setup(props) {
    const state = store.state
    const route = useRoute()

    const activePath = computed(() => {
      if (route.meta.activeMenu)
        return route.meta.activeMenu

      return route.path
    })

    const mMode = computed(() => {
      return props.mode
    })

    return {
      mMode,
      activePath,
      state,
    }
  },
})
</script>

<template>
  <el-scrollbar :class="mMode === 'vertical' ? 'scrollbar' : ''" wrap-class="scrollbar-wrap-class">
    <el-menu
      :default-active="activePath as string"
      :mode="mMode"
      :collapse="state.isCollapse"
      :style="{ height: mMode === 'vertical' ? '100%' : '49px' }"
    >
      <slot />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
@use '../../styles/variables.scss' as *;

:deep(.el-menu-item) {
  display: flex;
  align-items: center;
}

:deep(.el-sub-menu .el-menu-item) {
  height: 47px;
  line-height: 0;
}

.scrollbar {
  height: calc(100% - #{$logoHeight}) !important;
}

.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
</style>
