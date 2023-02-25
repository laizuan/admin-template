<!-- 系统详情 -->
<script lang="ts" setup name="SysSystemEdit">
import { useForm } from './conf/form'
import { hasPermission } from '@/utils'

const emit = defineEmits(['refresh'])
const { fields, visible, openWindow, disabled, submit, form, title, roleList } = useForm(emit)
const auth = hasPermission('sys:system:all')
defineExpose<OpenWindowExport>({
  openWindow,
})
</script>

<template>
  <n-dialog-form
    ref="elRef"
    v-model="form"
    v-model:visible="visible"
    :dialog-props="{ title }"
    :form-props="{ fields, labelWidth: '120px', disabled, action: { submit: auth } }"

    @submit="submit"
  >
    <template #defaultRoleId>
      <el-radio-group v-model="form.defaultRoleId" class="system-role-list">
        <el-radio v-for="role in roleList" :key="role.roleId" :label="role.roleId" size="large" border>
          <div class="leading-3">
            {{ role.name }}
          </div>
          <div class="remark" :title="role.remark">
            {{ role.remark }}
          </div>
        </el-radio>
      </el-radio-group>
    </template>
  </n-dialog-form>
</template>

<style lang="scss" scoped>
@use '@/styles/mixins/index.scss' as *;

.system-role-list :deep(.el-radio.is-bordered) {
  width: 380px;
  height: auto !important;
  margin-top: 8px;
  padding-top: 12px;
  padding-bottom: 8px;

  .remark {
    @include text-no-wrap()
  ;

    width: 330px;}
}
</style>
