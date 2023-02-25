<!-- 企业管理列表 -->
<script lang="ts" setup name="SysEnterprisePage">
import { defineTableActions, useOpQuery } from 'element-next'
import { onMounted } from 'vue'
import { useTable } from './conf/table'
import type { SysEnterpriseQueryForm } from './conf/intf'
import { useTo } from '@/utils'
import type { SysEnterprise } from '@/api/sys/enterprise'
import { SysEnterpriseApiUrl } from '@/api/sys/enterprise'

const { queryFormFields, columns } = useTable()

const { jump } = useTo()

const { load, queryForm, data, total, doCurrentChange, doSizeChange, doReset, loading }
    = useOpQuery<SysEnterpriseQueryForm, SysEnterprise>({
      list: SysEnterpriseApiUrl.list,
    })

onMounted(() => {
  load()
})

const actions = defineTableActions<SysEnterprise>([
  {
    label: '详情',
    click: ({ row }) => {
      jump({ name: 'SysEnterpriseEdit', params: { id: row.id, readonly: 1 } })
    },
  },
  {
    label: '编辑',
    click: ({ row }) => {
      jump({ name: 'SysEnterpriseEdit', params: { id: row.id, readonly: 0 } })
    },
  },
])

const doAdd = () => {
  jump({ name: 'SysEnterpriseEdit', params: { id: 0, readonly: 0 } })
}
</script>

<template>
  <n-wrap>
    <n-table-form
      v-model="queryForm"
      :table-props="{
        columns,
        actions,
        actionProps: { width: '120px', fixed: 'right' },
        data,
        tableLayout: 'fixed',
        total,
        showConfig: false,
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
</template>

<style scoped lang="scss"></style>
