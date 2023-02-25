<script lang="ts" setup name="MenuTree">
import { concat } from 'lodash-es'
import { ref, watch, reactive } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { fetchMenuSelectTreeList } from '@/api/sys/menu'
const props = defineProps({
  systemId: String,
})

const emit = defineEmits(['selectMenu'])

const treeRef = ref()
const customNodeClass = (data: any, _: Node) => {
  if (data.childrenList && data.childrenList.length > 0 && data.childrenList[0].childrenList?.length === 0)
    return 'is-penultimate'

  return null
}

const defaultProps = reactive({
  children: 'childrenList',
  label: 'desc',
  class: customNodeClass,
})
const checkStrictly = ref(0)
const expandAll = ref(1)
const defaultExpandedKeys = ref([])
const filterText = ref()
const data = ref([])

watch(
  () => filterText.value,
  (val) => {
    treeRef.value.filter(val)
  },
)
watch(
  () => props.systemId,
  () => {
    getTreeList()
  },
  {
    immediate: true,
  },
)

function $setCheckedKeys(checked) {
  treeRef.value.setCheckedKeys(checked, false)
}
function $resetChecked() {
  checkStrictly.value = 0
  treeRef.value.setCheckedKeys([])
}
function $getSelectNodeKey() {
  return concat(treeRef.value.getHalfCheckedKeys(), treeRef.value.getCheckedKeys())
}

defineExpose({
  $setCheckedKeys,
  $resetChecked,
  $getSelectNodeKey,
})

function filterNode(value, data) {
  if (!value)
    return true
  return data.name.includes(value)
}

function getTreeList() {
  fetchMenuSelectTreeList(props.systemId, true).then((res) => {
    if (res.length > 0)
      data.value = res
  })
}

function doSelectMenu(data) {
  emit('selectMenu', data.id)
}
</script>

<template>
  <n-card title="权限" class="w-full">
    <template #left>
      <el-tooltip content="勾上后可以级联选择菜单" placement="right">
        <el-checkbox v-model="checkStrictly" :true-label="1" :false-label="0">
          父子菜单强关联
        </el-checkbox>
      </el-tooltip>
      <el-checkbox v-model="expandAll" :true-label="1" :false-label="0">
        展开所有
      </el-checkbox>
    </template>
    <el-input v-model="filterText" clearable class="mb-1" placeholder="输入关键字进行过滤" />
    <el-tree
      ref="treeRef"
      :data="data"
      node-key="value"
      show-checkbox
      :default-expand-all="expandAll === 1"
      :check-strictly="checkStrictly === 0"
      class="menu-tree"
      :props="defaultProps"
      :default-expanded-keys="defaultExpandedKeys"
      :filter-node-method="filterNode"
      @node-click="doSelectMenu"
    />
  </n-card>
</template>

<style lang="scss">
.menu-tree {
  height: calc(100vh - 440px);
  overflow: auto;

  .is-penultimate {
    margin-bottom: 16px;
    padding-left: 12px;
  }

  .el-tree-node.is-penultimate > .el-tree-node__children {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 48px;
  }

  .is-penultimate > .el-tree-node__children > div {
    width: 130px;
  }

  .is-penultimate > .el-tree-node__children .el-tree-node__expand-icon {
    display: none;
  }

  .is-penultimate > .el-tree-node__children .el-tree-node__content {
    padding-left: 12px !important;
  }
}
</style>
