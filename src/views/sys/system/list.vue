<!-- 系统列表 -->
<script lang="ts" setup name="SysSystemPage">
import { defineTableActions, replaceHolder, successMessage, useOpQuery } from 'element-next'
import { onMounted, ref } from 'vue'
import { useTable } from './conf/table'
import type { SysSystemQueryForm } from './conf/intf'
import Edit from './edit.vue'
import { ActionType, hasPermission } from '@/utils'
import type { SysSystem } from '@/api/sys/system'
import { SysSystemApiUrl } from '@/api/sys/system'
const { queryFormFields, columns } = useTable()
const editRef = ref()

const { load, queryForm, data, total, doCurrentChange, doSizeChange, doDelete, doReset, loading }
    = useOpQuery<SysSystemQueryForm, SysSystem>({
      list: SysSystemApiUrl.list,
      delete: SysSystemApiUrl.delete,
    })

onMounted(() => {
  load()
})

const auth = hasPermission('sys:system:all')

const actions = defineTableActions<SysSystem>([
  {
    label: '详情',
    show: auth,
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.detail, row.id)
    },
  },
  {
    label: '编辑',
    show: auth,
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.edit, row.id)
    },
  },
  {
    label: '删除',
    show: auth,
    type: 'danger',
    click: ({ row }) => {
      doDelete({ urlProcess: url => replaceHolder(url, { id: row.id }) })
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
        actionProps: { width: '160px', fixed: 'right' },
        columns,
        actions,
        data,
        tableLayout: 'fixed',
        total,
        currentPage: queryForm.start,
      }"
      :form-props="{ fields: queryFormFields, labelWidth: '100px' }"
      :loading="loading"
      :add="auth"
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
