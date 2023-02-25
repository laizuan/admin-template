<!-- 字典维护列表 -->
<script lang="ts" setup name="SysDictPage">
import { defineTableActions, errorMessage, replaceHolder, successMessage, useOpQuery } from 'element-next'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTable } from './conf/data-table'
import type { SysDictQueryForm } from './conf/intf'
import Edit from './data-edit.vue'
import { ActionType, hasGlobalePermission } from '@/utils'
import type { SysDict } from '@/api/sys/dict'
import { SysDictApiUrl } from '@/api/sys/dict'

const route = useRoute()
const router = useRouter()

const type = route.params.type as string
if (!type) {
  errorMessage('无效路径')
  router.push({ name: 'SysDictTypePage' })
}

const { queryFormFields, columns } = useTable()
const editRef = ref()

const { load, queryForm, data, total, doCurrentChange, doSizeChange, doDelete, doReset, loading }
  = useOpQuery<SysDictQueryForm, SysDict>({
    list: SysDictApiUrl.list,
    delete: SysDictApiUrl.delete,
  })

queryForm.value.dictType = type

onMounted(() => {
  load()
})
const auth = hasGlobalePermission('sys:dict:all')

const actions = defineTableActions<SysDict>([
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
    type: 'danger',
    show: auth,
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
        columns,
        actions,
        data,
        tableLayout: 'fixed',
        total,
        showConfig: false,
        flexible: true,
        currentPage: queryForm.start,
        actionProps: { width: '160px', fixed: 'right' },
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
