<!-- 用户管理列表 -->
<script lang="ts" setup name="SysUserPage">
import { defineTableActions, successMessage, replaceHolder, useOpQuery } from 'element-next'
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { useTable } from './conf/table'
import type { SysUserQueryForm, SysUser } from './conf/intf'
import { ActionType } from '@/utils'
import { SysUserApiUrl } from '@/api/sys/user'
const Edit = defineAsyncComponent(() => import('./edit.vue'))

const { queryFormFields, columns } = useTable()
const editRef = ref()

const { load, queryForm, data, total, doCurrentChange, doSizeChange, doDelete, doReset, loading }
    = useOpQuery<SysUserQueryForm, SysUser>({
      list: SysUserApiUrl.list,
      delete: SysUserApiUrl.delete,
    })

onMounted(() => {
  load()
})

const actions = defineTableActions<SysUser>([
  {
    label: '详情',
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.detail, row.userId)
    },
  },
  {
    label: '编辑',
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.edit, row.userId)
    },
  },
  {
    label: '删除',
    type: 'danger',
    click: ({ row }) => {
      doDelete({ urlProcess: url => replaceHolder(url, { userId: row.userId }) })
        .then((res) => {
          if (res) {
            successMessage('操作成功')
            load()
          }
        })
        .catch(() => {})
    },
  },
])

const doAdd = () => {
  editRef.value.openWindow(ActionType.add)
}
</script>

<template>
  <n-wrap>
    <n-table-form
      v-model="queryForm"
      :table-props="{
        columns,
        actions,
        data,
        tableLayout: 'fixed',
        total,
        currentPage: queryForm.start,
      }"
      :form-props="{ fields: queryFormFields, labelWidth: '100px' }"
      :loading="loading"
      @add="doAdd"
      @query="load"
      @reset="doReset"
      @current-change="doCurrentChange"
      @size-change="doSizeChange"
    />
  </n-wrap>
  <Edit ref="editRef" @refresh="load" />
</template>

<style scoped lang="scss"></style>
