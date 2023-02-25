import { defineFormFields, defineTableColumns } from 'element-next'
import type { SysSystemQueryForm } from './intf'
import type { SysSystem } from '@/api/sys/system'

const queryFormFields = defineFormFields<SysSystemQueryForm>([

  {
    prop: 'code',
    component: 'n-input',
    props: {
      placeholder: '输入系统代码精确搜索',
    },
    label: '系统代码',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'name',
    component: 'n-input',
    props: {
      placeholder: '输入系统代码精确搜索',
    },
    label: '系统代码',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
])

const columns = defineTableColumns<SysSystem>([
  {
    prop: 'code',
    label: '系统代码',
    width: '150px',
  },
  {
    prop: 'name',
    label: '系统代码',
    width: '150px',
  },
  {
    prop: 'intro',
    label: '系统简介',
    width: '150px',
  },
  {
    prop: 'openRegistry',
    label: '是否开放申请',
    width: '150px',
    render(row, h) {
      return h('span', row.openRegistry ? '开放申请' : '不开放申请')
    },
  },
  {
    prop: 'indexDisplay',
    label: '是否显示',
    width: '150px',
    render(row, h) {
      return h('span', row.indexDisplay ? '显示' : '不显示')
    },
  },
  {
    prop: 'displayRegistry',
    label: '是否显示申请',
    width: '80px',
    render(row, h) {
      return h('span', row.displayRegistry ? '显示' : '不显示')
    },
  },
  {
    prop: 'link',
    label: '系统链接地址',
    width: '150px',
  },
  {
    prop: 'remark',
    label: '备注',
  },
  {
    prop: 'createByName',
    label: '创建人',
    width: '150px',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    timeFormat: true,
    width: '150px',
  },
  {
    prop: 'updateByName',
    label: '修改人',
    width: '150px',
  },
  {
    prop: 'updateTime',
    label: '修改时间',
    timeFormat: true,
    width: '150px',
  },

])

export const useTable = () => {
  return {
    queryFormFields,
    columns,
  }
}
