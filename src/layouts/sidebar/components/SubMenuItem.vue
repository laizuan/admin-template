<script lang="ts" setup name="SubMenuItem">
import path from 'path-browserify'
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from '../../utils'

const props = defineProps({
  fullPath: {
    type: String,
    default: '',
  },
  item: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => {
      return {} as RouteRecordRaw
    },
  },
})

function generatorPath(childPath: string) {
  if (isExternal(props.fullPath))
    return props.fullPath

  if (isExternal(childPath))
    return childPath

  return path.resolve(props.fullPath, props.item.path)
}
</script>

<template>
  <el-sub-menu :index="generatorPath(item.path)" teleported>
    <template #title>
      <n-icon v-if="item.meta.icon" :name="item.meta.icon as string" />
      <span class="ml-2">{{ item.meta.title }}</span>
    </template>
    <slot />
  </el-sub-menu>
</template>
