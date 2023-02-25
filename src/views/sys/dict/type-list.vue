<!-- 字典类型维护列表 -->
<script lang="ts" setup name="SysDictTypePage">
import { defineTableActions, replaceHolder, successMessage, useOpQuery } from 'element-next'
import { onMounted, ref } from 'vue'
import TypeEdit from './type-edit.vue'
import { useTable } from './conf/type-table'
import type { SysDictTypeQueryForm } from './conf/intf'
import { ActionType, hasPermission } from '@/utils'
import type { SysDictType } from '@/api/sys/dict'
import { SysDictTypeApiUrl } from '@/api/sys/dict'

const { queryFormFields, columns } = useTable()
const typeEditRef = ref()

const { load, queryForm, data, total, doCurrentChange, doSizeChange, doDelete, doReset, loading }
  = useOpQuery<SysDictTypeQueryForm, SysDictType>({
    list: SysDictTypeApiUrl.list,
    delete: SysDictTypeApiUrl.delete,
  })

onMounted(() => {
  load()
})
const auth = hasPermission('sys:dict:all')

const actions = defineTableActions<SysDictType>([
  {
    label: '详情',
    show: auth,
    click: ({ row }) => {
      typeEditRef.value.openWindow(ActionType.detail, row.dictType)
    },
  },

  {
    label: '编辑',
    show: auth,
    click: ({ row }) => {
      typeEditRef.value.openWindow(ActionType.edit, row.dictType)
    },
  },
  {
    label: '删除',
    show: auth,
    type: 'danger',
    click: ({ row }) => {
      doDelete({ urlProcess: url => replaceHolder(url, { dictType: row.dictType }) })
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
  typeEditRef.value.openWindow(ActionType.add)
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
        showConfig: false,
        currentPage: queryForm.start,
        actionProps: { width: '160px', fixed: 'right' },
        flexible: true,
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
  <TypeEdit ref="typeEditRef" @refresh="load" />
</template>

<style scoped lang="scss"></style>
