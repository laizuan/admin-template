<script lang="ts">
import path from 'path-browserify'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu as MenuIcon } from '@element-plus/icons-vue'
import { isExternal } from '../../utils'
import MenuItemTip from './MenuItemTip.vue'
export default defineComponent({
  name: 'MenuItem',
  components: {
    MenuItemTip,
  },
  props: {
    fullPath: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
    showRoute: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    function generatorPath() {
      if (isExternal(props.fullPath))
        return props.fullPath

      if (isExternal(props.showRoute.path))
        return props.showRoute.path

      return path.resolve(props.fullPath, props.showRoute.path)
    }
    function handleClick() {
      if (isExternal(props.showRoute.path)) {
        window.open(props.showRoute.path)
      }
      else if (isExternal(props.fullPath)) {
        window.open(props.fullPath)
      }
      else if (route.path !== path.resolve(props.fullPath, props.showRoute.path)) {
        router.push({
          path: path.resolve(props.fullPath, props.showRoute.path),
        })
      }
    }
    return {
      generatorPath,
      handleClick,
      MenuIcon,
    }
  },
})
</script>

<template>
  <el-menu-item :index="generatorPath()" @click="handleClick">
    <n-icon v-if="showRoute.meta.icon" class="mr-2" :name="showRoute.meta.icon" />
    <template #title>
      <span>{{ showRoute.meta.title }}</span>
      <MenuItemTip
        :value="showRoute.meta ? showRoute.meta.badge || '' : ''"
        :is-dot="showRoute.meta ? showRoute.meta.badge === 'dot' : false"
      />
    </template>
  </el-menu-item>
</template>
