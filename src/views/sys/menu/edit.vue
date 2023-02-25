<!-- 菜单管理详情 -->
<script lang="ts" setup name="SysMenuEdit">
import type { SelectTree } from 'element-next'
import { useForm } from './config/form'
import type { SysMenu } from '@/api/sys/menu'

const props = defineProps({
  parentListMenu: {
    type: Array<SelectTree<SysMenu>>,
    default: [],
  },
  systemId: String,
})

const emit = defineEmits(['refresh'])

const { fields, visible, openWindow, disabled, submit, form, title, elRef } = useForm(emit, props)

defineExpose<OpenWindowExport>({
  openWindow,
})
</script>

<template>
  <n-dialog-form
    ref="elRef"
    v-model="form"
    v-model:visible="visible"
    :dialog-props="{ title, fixedHeight: false, top: '10vh' }"
    :form-props="{ fields, labelWidth: '100px', disabled }"
    @submit="submit"
  >
    <template #parentId>
      <n-tree-select
        v-model="form.parentId"
        :data="props.parentListMenu"
      />
    </template>
  </n-dialog-form>
</template>

<style lang="scss" scoped></style>
