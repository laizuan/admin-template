<!-- 企业申请系统 -->
<script lang='ts' setup>
import type { Ref } from 'vue'
import { ref, onMounted, inject } from 'vue'
import type { SysEnterprise, SysEnterpriseSystem } from '@/api/sys/enterprise'
import { fetchEnterpriseSystemList } from '@/api/sys/enterprise'
import { DictEnumUrl, DictTypeConst } from '@/utils'

const disabled = inject<Ref<boolean>>('disabled', ref(false))
const form = inject<Ref<SysEnterprise>>('form')

const systemList = ref<Array<SysEnterpriseSystem>>([])

defineExpose({
  getSystemList: () => systemList.value,
})

const _getEnterpriseSystem = () => {
  fetchEnterpriseSystemList(form.value.id).then((res) => {
    systemList.value = res
  })
}
onMounted(() => {
  _getEnterpriseSystem()
})
</script>

<template>
  <el-table :data="systemList" border size="small">
    <el-table-column prop="name" label="系统名称" />
    <el-table-column prop="openRegistry" label="注册企业是否可申请">
      <template #default="{ row }">
        <span v-if="row.displayRegistry && row.openRegistry">可以申请</span>
        <span v-else>不能申请</span>
      </template>
    </el-table-column>
    <el-table-column prop="intro" label="系统简介" />
    <el-table-column prop="auditStatus" label="审核状态">
      <template #default="{ row }">
        <n-select v-model="row.auditStatus" :disabled="disabled" size="small" :clearable="false" :remote-config="{ url: `${DictEnumUrl}/${DictTypeConst.ENTERPRISE_SYSTEM_AUDIT_STATUS}` }" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang='scss' scoped>
</style>
