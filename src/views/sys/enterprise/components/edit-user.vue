<!-- 用户管理详情 -->
<script lang="ts" setup name="SysUserEdit">
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { useForm } from './conf/form'
import type { SysEnterprise } from '@/api/sys/enterprise'

const emit = defineEmits(['refresh'])
const entForm = inject<Ref<SysEnterprise>>('form')
const entDisabled = inject<Ref<boolean>>('disabled', ref(false))
const { formRef, fields, visible, openWindow, disabled, submit, form, title } = useForm(emit, entForm.value.id)

defineExpose<OpenWindowExport>({
  openWindow,
})
</script>

<template>
  <n-dialog-form
    ref="formRef"
    v-model="form"
    v-model:visible="visible"
    :dialog-props="{ title }"
    :form-props="{ fields, labelWidth: '120px', disabled: entDisabled || disabled }"
    @submit="submit"
  />
</template>

<style scoped lang="scss">
.role-box {
  display: flex;
  flex-wrap: wrap;

  .el-checkbox {
    display: inline-table;
    margin: 0 15px 15px 0;
    padding: 5px 10px 5px 0;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    transition: 0.3s;

    &.is-checked {
      border-color: var(--el-color-primary);
    }
  }

  :deep(.el-checkbox) {
    width: 205px;
    margin-bottom: 15px;
  }

  :deep(.el-checkbox__input) {
    display: none;
  }

  .role-name {
    font-size: 16px;
  }

  .role-remark {
    width: 200px;
    overflow: hidden;
    color: #808695;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
