<!-- 系统左边选择菜单 -->
<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import type { MenuData } from '../SplitList/index.vue'
import SplitList from '../SplitList/index.vue'
import { fetchGetSystemSimple } from '@/api/sys/system'

const emit = defineEmits(['systemSelect'])

const systemList = ref<Array<MenuData>>([])
const currentSystemId = ref<string>()

const doSelectSystem = (item: MenuData) => {
  currentSystemId.value = item.id
  emit('systemSelect', item.id)
}

const _loadSelectMenu = () => {
  fetchGetSystemSimple().then((res) => {
    if (res) {
      systemList.value = res.map((m) => {
        return {
          title: m.name,
          id: m.id,
        }
      })
    }
  })
}

onMounted(() => {
  _loadSelectMenu()
})
</script>

<template>
  <SplitList :menu-data="systemList" @select-item="doSelectSystem">
    <slot />
  </SplitList>
</template>
