<!-- 用户管理列表 -->
<script lang="ts" setup name="SysUserPage">
import { confirmMessage, defineTableActions, successMessage, useOpQuery } from 'element-next'
import type { Ref } from 'vue'
import { onMounted, ref, inject, defineAsyncComponent } from 'vue'
import { useTable } from './conf/table'
import type { SysUserQueryForm } from './conf/intf'
import type { SysEnterprise } from '@/api/sys/enterprise'
import { ActionType } from '@/utils'
import type { SysUser } from '@/api/sys/user'
import { SysUserApiUrl, fetchUpdateUserStatus } from '@/api/sys/user'

const disabled = inject<Ref<boolean>>('disabled', ref(false))
const form = inject<Ref<SysEnterprise>>('form')

const Edit = defineAsyncComponent(() => import('./edit-user.vue'))

const { queryFormFields, columns } = useTable()
const editRef = ref()

const { load, queryForm, data, total, doCurrentChange, doSizeChange, doReset, loading }
  = useOpQuery<SysUserQueryForm, SysUser>({
    list: SysUserApiUrl.list,
    delete: SysUserApiUrl.delete,
  })
onMounted(() => {
  queryForm.value.entId = form.value.id
  load()
})
const doStatus = (message, row, status) => {
  confirmMessage(message).then(() => {
    fetchUpdateUserStatus(row.userId, status).then((res) => {
      if (res) {
        successMessage('操作成功')
        load()
      }
    })
  })
}
const actions = defineTableActions<SysUser>([
  {
    label: '详情',
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.detail, row.userId)
    },
  },
  {
    label: '编辑',
    disabled: disabled.value,
    ifShow: ({ row }) => {
      return row.enabled === 1 || row.enabled === 0
    },
    click: ({ row }) => {
      editRef.value.openWindow(ActionType.edit, row.userId)
    },
  },
  {
    label: '启用',
    disabled: disabled.value,
    ifShow: ({ row }) => {
      return row.enabled === 0
    },
    click: ({ row }) => {
      doStatus('是否启用该用户？', row, 1)
    },
  },
  {
    label: '禁用',
    disabled: disabled.value,
    type: 'warning',
    ifShow: ({ row }) => {
      return row.enabled === 1
    },
    click: ({ row }) => {
      doStatus('禁用后不能登入！确定要禁用吗？', row, 0)
    },
  },
  {
    label: '注销',
    disabled: disabled.value,
    type: 'danger',
    ifShow: ({ row }) => {
      return row.enabled === 1 || row.enabled === 0
    },
    click: ({ row }) => {
      doStatus('注销后不能再次开启，请确认是否继续？', row, 2)
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
        height: 'auto',
        data,
        tableLayout: 'fixed',
        total,
        currentPage: queryForm.start,
        flexible: true,
        actionProps: { width: '200px', fixed: 'right' },
        showConfig: false,
      }"
      :form-props="{ fields: queryFormFields, labelWidth: '100px', action: { xs: 24, md: 24, sm: 24, lg: 24, xl: 24 } }"
      :loading="loading"
      :add="!disabled"
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
