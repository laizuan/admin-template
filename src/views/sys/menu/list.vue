<!-- 菜单管理列表 -->
<script lang="ts" setup name="SysDeptPage">
import type { SelectTree } from 'element-next'
import { confirmMessage, defineTableActions, successMessage } from 'element-next'
import { ref } from 'vue'
import { Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import type { Fn } from '@vueuse/core'
import Edit from './edit.vue'
import { useTable } from './config/table'
import type { SysMenuQueryForm } from './config/intf'
import SystemList from '@/components/business/LeftSelectSystem/index.vue'
import type { SysMenu } from '@/api/sys/menu'
import { fetchDeleteMenu, fetchMenuSelectTreeList, fetchTableMenuTreeList } from '@/api/sys/menu'
import { ActionType, hasPermission } from '@/utils'
const { queryFormFields, columns } = useTable()

const parentListMenu = ref<Array<SelectTree<SysMenu>>>([])
const editRef = ref()
const formRef = ref()
const dataList = ref<Array<SelectTree<SysMenu>>>([])
const queryForm = ref<SysMenuQueryForm>({} as SysMenuQueryForm)

function _loadSelectMenu() {
  fetchMenuSelectTreeList(queryForm.value.systemId).then((res) => {
    if (res && res.length > 0)
      parentListMenu.value = res
    else
      parentListMenu.value.length = 0
  })
}

function _loadMenu(done?: Fn) {
  fetchTableMenuTreeList(queryForm.value)
    .then((res) => {
      if (res && res.length > 0)
        dataList.value = res
      else
        dataList.value.length = 0
    })
    .finally(() => {
      if (done)
        done()
    })
}

const show = hasPermission('sys:menu:all')

const actions = defineTableActions<SysMenu>([
  {
    label: '详情',
    show,
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.detail, row.menuId)
    },
  },
  {
    label: '编辑',
    show,
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.edit, row.menuId)
    },
  },
  {
    label: '删除',
    type: 'danger',
    show,
    click: ({ row }) => {
      confirmMessage('删除后不能恢复！是否继续？').then(() => {
        fetchDeleteMenu(row.menuId)
          .then((res) => {
            if (res) {
              successMessage('操作成功')
              _loadMenu()
            }
          })
          .catch(() => { })
      })
    },
  },
])

const doAdd = () => {
  editRef.value.openWindow(ActionType.add)
}

const doSelectSystem = (id: string) => {
  queryForm.value.systemId = id
  _loadSelectMenu()
  _loadMenu()
}
</script>

<template>
  <SystemList @system-select="doSelectSystem">
    <n-form
      ref="formRef" v-model="queryForm" :fields="queryFormFields" :fixed-action="true" :action="{
        submitText: '查询',
        submitProps: { icon: Search },
        resetText: '重置',
        resetProps: { icon: RefreshRight },
        md: 12,
        lg: 8,
      }" @submit="_loadMenu"
    >
      <template #parentId>
        <n-tree-select :data="parentListMenu" />
      </template>
      <template #action-after>
        <el-button type="primary" :icon="Plus" @click="doAdd">
          新增
        </el-button>
      </template>
    </n-form>
    <n-table
      :data="dataList" row-key="menuId" :columns="columns" :actions="actions" :tree-props="{
        children: 'childrenList',
      }" :action-props="{ width: '180px' }"
    />
    <Edit ref="editRef" :parent-list-menu="parentListMenu" :system-id="queryForm.systemId" @refresh="_loadMenu" />
  </SystemList>
</template>

<style scoped lang="scss">
</style>
