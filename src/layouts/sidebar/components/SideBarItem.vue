<script lang="ts" setup name="SideBarItem">
import path from 'path-browserify'
import { computed, ref } from 'vue'
import { isExternal } from '../../utils'
import MenuItem from './MenuItem.vue'
import SubMenuItem from './SubMenuItem.vue'
const props = defineProps({
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
})
const showRoute = ref({})
function isSubMenu() {
  const tempShowRoutes = props.item.children
    ? props.item.children.filter((it: any) => {
      if (it.hidden) {
        return false
      }
      else {
        showRoute.value = it
        return true
      }
    })
    : []
  if (tempShowRoutes.length === 1)
    return false

  if (tempShowRoutes.length === 0) {
    showRoute.value = {
      ...props.item,
      path: '',
      noChildren: true,
    }
    return false
  }
  return true
}
function generatorPath(childPath: string) {
  if (isExternal(childPath))
    return childPath

  if (isExternal(props.fullPath))
    return childPath

  return path.resolve(props.fullPath, childPath)
}
const sideBarComponent = computed(() => {
  if (isSubMenu())
    return SubMenuItem

  return MenuItem
})
</script>

<template>
  <component
    :is="sideBarComponent"
    v-if="!item.hidden"
    :full-path="fullPath"
    :item="item"
    :show-route="showRoute"
  >
    <template v-if="item.children && item.children.length !== 0">
      <SideBarItem
        v-for="child of item.children"
        :key="child.path"
        :full-path="generatorPath(child.path)"
        :item="child"
      />
    </template>
  </component>
</template>
