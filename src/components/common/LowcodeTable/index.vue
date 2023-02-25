<!-- 低代码查询表格组件 -->
<script lang="ts" setup name="LowcodeTable">
import type {
  NFormProps,
  NTableProps,
  TableActionType,
  TableFormExpose,
} from 'element-next'
import {
  errorMessage,
  defineTableFormMethod,
  useOpColumns,
  useOpQuery,
} from 'element-next'
import type { Ref } from 'vue'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { HttpRequestConfig } from 'element-next/types/utils/http'
// import { fetchGetField } from '@/api/lc/tableQuery'
import { DynamicQueryUrl } from '@/utils/const'
interface LowcodeTableExpose<R = any> {
  doDelete: (
    requestConfig: HttpRequestConfig,
    options?: {
      message?: string
      dialogOptions?: Recordable
    }
  ) => Promise<any>
  load: () => void
  lowcodeRef: Ref<TableFormExpose>
  getCurrentRow: () => R
  getCurrentRows: () => Array<R>
}

const props = defineProps({
  modelValue: {
    type: Object,
  },
  actions: {
    type: Array<TableActionType>,
    default: [],
  },
  deleteUrl: String,
  add: {
    type: Boolean,
    default: true,
  },
  enterQuery: {
    type: Boolean,
    default: true,
  },
  outsideHeight: {
    type: Number,
    default: 0,
  },
  tableProps: {
    type: Object as PropType<NTableProps>,
    default: () => {},
  },
  formProps: {
    type: Object as PropType<NFormProps>,
    default: () => {},
  },
})

const emit = defineEmits(['onUpdateModelValue'])

const {
  params: { sqlId },
} = useRoute()

if (!sqlId) {
  errorMessage('低代码查询表格参数错误，请检查是否配置路由参数：slqId')
  useRouter().back()
}

const queryFormFields = ref()
const lowcodeRef = defineTableFormMethod()

const { doSaveColumns, fetchListColumns, columns } = useOpColumns({
  cache: true,
  key: sqlId as string,
})

const {
  load,
  queryForm,
  data,
  total,
  doCurrentChange,
  doSizeChange,
  doReset,
  loading,
  doDelete,
  doSelectRow,
  currentRow,
  currentRows,
  doSelectRows,
} = useOpQuery<any, any>(
  {
    list: `${DynamicQueryUrl}/${sqlId}`,
    delete: props.deleteUrl,
  },
  {
    params: props.modelValue,
  },
)

watch(
  () => props.modelValue,
  (val) => {
    queryForm.value = val
  },
  {
    deep: true,
  },
)

watch(
  () => queryForm,
  (val) => {
    emit('onUpdateModelValue', val.value)
  },
  {
    deep: true,
  },
)

defineExpose<LowcodeTableExpose>({
  load,
  doDelete,
  lowcodeRef,
  getCurrentRow: () => {
    return currentRow.value
  },
  getCurrentRows: () => {
    return currentRows.value
  },
})
const fetchGetField = (id: string): any => {
  console.log('id :>> ', id)
}
onBeforeMount(async () => {
  await fetchListColumns({ params: { tableQueryId: sqlId } })
  const result = await fetchGetField(sqlId as string)
  if (result)
    queryFormFields.value = result

  lowcodeRef.value.calculateTableHeight()
  load()
})
</script>

<template>
  <n-wrap>
    <n-table-form
      ref="lowcodeRef"
      v-model="queryForm"
      :table-props="{
        columns,
        actions,
        data,
        tableLayout: 'fixed',
        total,
        currentPage: queryForm.start,
        flexible: true,
        ...tableProps,
      }"
      :form-props="Object.assign({ fields: queryFormFields, labelWidth: '100px' }, props.formProps)"
      :loading="loading"
      :add="add"
      @query="load"
      @reset="doReset"
      @save="doSaveColumns"
      @current-change="doCurrentChange"
      @size-change="doSizeChange"
      @select-row="doSelectRow"
      @selection-change="doSelectRows"
    />
  </n-wrap>
</template>
