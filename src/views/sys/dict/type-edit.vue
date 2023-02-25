<!-- 字典类型维护详情 -->
<script lang="ts" setup name="SysDictTypeEdit">
import { useForm } from './conf/type-form'

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
    :form-props="{ fields, labelWidth: '120px', disabled }"
    @submit="submit"
  />
</template>

<style lang="scss" scoped></style>
