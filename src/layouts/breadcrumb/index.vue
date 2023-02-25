<script lang="ts" setup name="Breadcrumb">
import { onMounted, shallowReactive, watch } from 'vue'
import { useRoute } from 'vue-router'
interface Breadcrumb {
  title: string
  path?: string
}
const breadcrumbs = shallowReactive([] as Array<Breadcrumb>)
const route = useRoute()
function generatorBreadcrumb() {
  const arr: Array<Breadcrumb> = route.matched.filter((it) => {
    return it.meta && it.meta.title
  }).map((m) => {
    return {
      title: m.meta.title as string,
    }
  })
  const rootRoute = route.matched.find((it) => {
    return it.meta && it.meta.title
  })

  const activeMenu = route.meta?.activeMenu
  if (activeMenu) {
    const parentRouter = rootRoute.children.find((it) => {
      return it.path === activeMenu
    })
    if (parentRouter) {
      const lastRouter = arr[arr.length - 1]
      arr[arr.length - 1] = {
        title: parentRouter.meta.title as string,
        path: parentRouter.path,
      }
      arr.push(lastRouter)
    }
  }
  breadcrumbs.length = 0
  breadcrumbs.push(...arr)
}
watch(
  () => route.path,
  () => {
    generatorBreadcrumb()
  },
)
onMounted(generatorBreadcrumb)
</script>

<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) of breadcrumbs" :key="index">
        <router-link v-if="item.path" :to="{ path: item.path }" class="breadcrumb-title">
          {{ item.title }}
        </router-link>
        <span v-else>{{ item.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.breadcrumb-title {
  color: var(--el-text-color-regular);
}
</style>
