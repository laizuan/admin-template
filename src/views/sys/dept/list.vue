<!-- 部门管理列表 -->
<script lang="ts" setup name="SysDeptPage">
import type { SelectTree } from 'element-next'
import { confirmMessage, defineTableActions, successMessage } from 'element-next'
import { onMounted, ref } from 'vue'
import { Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import type { Fn } from '@vueuse/core'
import Edit from './edit.vue'
import { useTable } from './config/table'
import type { SysDept } from './config/intef'
import { fetchDeleteDept, fetchTableDeptTreeList } from '@/api/sys/dept'
import { ActionType } from '@/utils'
const { queryFormFields, columns } = useTable()
const editRef = ref()
const formRef = ref()

const dataList = ref<Array<SelectTree<SysDept>>>([])
const queryForm = ref({})

onMounted(() => {
  _load()
})

function _load(done?: Fn) {
  fetchTableDeptTreeList(queryForm.value)
    .then((res) => {
      if (res)
        dataList.value = res
    })
    .finally(() => {
      if (done)
        done()
    })
}

const actions = defineTableActions<SysDept>([
  {
    label: '详情',
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.detail, row.deptId)
    },
  },
  {
    label: '编辑',
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.edit, row.deptId)
    },
  },
  {
    label: '删除',
    type: 'danger',
    click: ({ row }) => {
      confirmMessage('删除后不能恢复！是否继续？').then(() => {
        fetchDeleteDept(row.deptId)
          .then((res) => {
            if (res) {
              successMessage('操作成功')
              _load()
            }
          })
          .catch(() => {})
      })
    },
  },
])

const doAdd = () => {
  editRef.value.openWindow(ActionType.add)
}
</script>

<template>
  <n-wrap>
    <n-form
      ref="formRef"
      v-model="queryForm"
      :fields="queryFormFields"
      :fixed-action="true"
      :action="{
        submitText: '查询',
        submitProps: { icon: Search },
        resetText: '重置',
        resetProps: { icon: RefreshRight },
      }"
      @submit="_load"
    >
      <template #action-after>
        <el-button type="primary" :icon="Plus" @click="doAdd">
          新增
        </el-button>
      </template>
    </n-form>
    <n-table
      :data="dataList"
      row-key="deptId"
      :columns="columns"
      :actions="actions"
      :tree-props="{
        children: 'childrenList',
      }"
      :action-props="{ width: '160px', fixed: 'right' }"
    />
  </n-wrap>
  <Edit ref="editRef" @refresh="_load" />
</template>

<style scoped lang="scss"></style>
