<!-- 角色维护详情 -->
<script lang="ts" setup name="SysRoleEdit">
import { watch } from 'vue'
import { useForm } from './conf/form'
import MenuTree from './components/menu-tree.vue'

const props = defineProps({
  systemId: {
    type: String,
  },
})

const emit = defineEmits(['refresh'])

const { fields, visible, openWindow, disabled, submit, form, title, menuTreeRef } = useForm(emit, props)

defineExpose<OpenWindowExport>({
  openWindow,
})

watch(
  () => visible.value,
  (nv) => {
    if (!nv)
      menuTreeRef.value.$resetChecked()
  },
)
</script>

<template>
  <n-dialog-form
    ref="elRef"
    v-model="form"
    v-model:visible="visible"
    :dialog-props="{ title, top: '0px' }"
    :form-props="{ fields, labelWidth: '100px', disabled }"
    @submit="submit"
  >
    <MenuTree ref="menuTreeRef" :system-id="props.systemId" />
  </n-dialog-form>
</template>

<style lang="scss" scoped></style>
