<!-- 字典维护详情 -->
<script lang="ts" setup name="SysDictEdit">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useForm } from './conf/data-form'
import type { SysDict } from '@/api/sys/dict'
const emit = defineEmits(['refresh'])

const { fields, visible, openWindow, disabled, submit, form, title } = useForm(emit)
const { params } = useRoute()
watch(
  () => visible.value,
  (nv) => {
    if (nv) {
      form.value = {
        dictType: params?.type as string,
      } as SysDict
    }
  },
)

defineExpose<OpenWindowExport>({
  openWindow,
})

const doClose = () => {
  form.value = {} as SysDict
}
</script>

<template>
  <n-dialog-form
    ref="elRef"
    v-model="form"
    v-model:visible="visible"
    :dialog-props="{ title }"
    :form-props="{ fields, labelWidth: '100px', disabled }"
    @close="doClose"
    @submit="submit"
  />
</template>

<style lang="scss" scoped></style>
