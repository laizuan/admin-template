<!-- 左右分割列表 -->
<script lang='ts' setup name="SplitList">
import { ref, watch } from 'vue'
export interface MenuData {
  title: string
  id: string
  [key: string]: any
}
const props = defineProps({
  menuData: {
    type: Array<MenuData>,
    default: [],
  },
})
const emit = defineEmits(['selectItem'])

const currentId = ref<string>()

const doSelectItem = (item: MenuData) => {
  currentId.value = item.id
  emit('selectItem', item)
}
watch(() => props.menuData, (newData) => {
  if (newData && newData.length > 0) {
    const val = newData[0]
    currentId.value = val.id
    doSelectItem(val)
  }
})
</script>

<template>
  <n-wrap>
    <el-row>
      <el-col :xs="24" :lg="3" :md="4" class="min-w-32">
        <div v-for="(item) of menuData" :key="item.id" :class="{ active: item.id === currentId }" class="inline-block w-full px-3 py-1 cursor-pointer item" @click="doSelectItem(item)">
          <slot name="item">
            {{ item.title }}
          </slot>
        </div>
      </el-col>
      <el-col :xs="24" :lg="21" :md="20">
        <slot />
      </el-col>
    </el-row>
  </n-wrap>
</template>

<style lang='scss' scoped>
.item:hover {
  color: var(--el-menu-active-color);
  background-color: var(--el-color-primary-light-8);
}

.active {
  color: var(--el-menu-active-color);
  background-color: var(--el-color-primary-light-8);

  &:hover {
    color: #fff;
    background-color: var(--el-color-primary-light-3);
  }
}
</style>
