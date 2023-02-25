<!-- 部门管理详情 -->
<script lang="ts" setup name="SysDeptEdit">
import { useForm } from './config/form'

const emit = defineEmits(['refresh'])

const { fields, visible, openWindow, disabled, submit, form, title } = useForm(emit)

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
    :form-props="{ fields, labelWidth: '100px', disabled }"
    @submit="submit"
  />
</template>

<style lang="scss" scoped></style>
