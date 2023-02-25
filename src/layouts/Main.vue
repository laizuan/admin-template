<script lang="ts" setup name="Main">
import { useTitle } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import store from './store'
const state = store.state
const route = useRoute()
const routeKey = ref(route.fullPath)
const cachedViews = computed(() => {
  return state.cachedView.map(it => it)
})
const projectName = computed(() => {
  return import.meta.env.VITE_GLOB_APP_TITLE || ''
})
watch(
  () => route.fullPath,
  () => {
    routeKey.value = route.fullPath
    useTitle(`${projectName.value} - ${route.meta.title}`)
  }, {
    immediate: true,
  },
)
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cachedViews">
      <component :is="Component" :key="routeKey" />
    </keep-alive>
  </router-view>
</template>
