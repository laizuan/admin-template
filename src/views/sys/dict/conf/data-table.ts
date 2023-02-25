import { defineFormFields, defineTableColumns } from 'element-next'
import { h } from 'vue'
import type { SysDictQueryForm } from './intf'
import type { SysDict } from '@/api/sys/dict'

const queryFormFields = defineFormFields<SysDictQueryForm>([
  {
    prop: 'description',
    component: 'n-input',
    label: '显示值',
    props: {
      trimAll: true,
      placeholder: '输入显示值全匹配搜索',
    },
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'value',
    component: 'n-input',
    label: '字典值',
    props: {
      trimAll: true,
      placeholder: '输入字典值精确搜索',
    },
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
])

const columns = defineTableColumns<SysDict>([
  { prop: 'description', label: '显示名称', width: '150px', showCopy: true },
  { prop: 'value', label: '字典值', width: '150px', showCopy: true },
  {
    prop: 'tagType',
    label: '状态类型',
    width: '90px',
    render(row) {
      if (row.tagType) {
        return h(
          'span',
          { class: `el-tag el-tag--mini el-tag--light el-tag--${row.tagType}` },
          row.description,
        )
      }
      else {
        return h('span')
      }
    },
  },
  { prop: 'sortNo', label: '排序', width: '60px' },
  { prop: 'value2', label: '字典值2', width: '100px' },
  { prop: 'value3', label: '字典值3', width: '100px' },
  { prop: 'value4', label: '字典值4', width: '100px' },
  { prop: 'value5', label: '字典值5', width: '100px' },
  { prop: 'enabledEnum', label: '启禁用', width: '80px', enumType: true },
  { prop: 'remark', label: '备注' },

])

export const useTable = () => {
  return {
    queryFormFields,
    columns,
  }
}
