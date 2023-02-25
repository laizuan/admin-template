<!-- 角色维护列表 -->
<script lang="ts" setup name="SysRolePage">
import { defineTableActions, replaceHolder, successMessage, useOpQuery } from 'element-next'
import { ref, defineAsyncComponent } from 'vue'
// import Edit from './edit.vue'
import { useTable } from './conf/table'
import type { SysRoleQueryForm } from './conf/intf'
import SelectSystem from '@/components/business/LeftSelectSystem/index.vue'
import { ActionType } from '@/utils'
import type { SysRole } from '@/api/sys/role'
import { SysRoleApiUrl } from '@/api/sys/role'
const Edit = defineAsyncComponent(() => import('./edit.vue'))

const { queryFormFields, columns } = useTable()
const editRef = ref()

const { load, queryForm, data, total, doCurrentChange, doSizeChange, doDelete, doReset, loading }
  = useOpQuery<SysRoleQueryForm, SysRole>({
    list: SysRoleApiUrl.list,
    delete: SysRoleApiUrl.delete,
  })

const doSelectSystem = (id: string) => {
  queryForm.value.systemId = id
  load()
}

const actions = defineTableActions<SysRole>([
  {
    label: '详情',
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.detail, row.roleId)
    },
  },
  {
    label: '编辑',
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.edit, row.roleId)
    },
  },
  {
    label: '删除',
    type: 'danger',
    click: ({ row }) => {
      doDelete({ urlProcess: t => replaceHolder(t, { roleId: row.roleId }) })
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
  <SelectSystem @system-select="doSelectSystem">
    <n-table-form
      v-model="queryForm"
      :table-props="{
        columns,
        actions,
        data,
        tableLayout: 'fixed',
        total,
        currentPage: queryForm.start,
        flexible: true,
        showConfig: false,
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
  </SelectSystem>

  <Edit ref="editRef" :system-id="queryForm.systemId" @refresh="load" />
</template>

<style scoped lang="scss"></style>
