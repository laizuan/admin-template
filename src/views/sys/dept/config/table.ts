import { defineFormFields, defineTableColumns } from 'element-next'
import type { SysDept } from './intef'
import { fetchGetDeptTreeList } from '@/api/sys/dept'

const columns = defineTableColumns<SysDept>([
  { prop: 'deptCode', label: '部门代码', width: '150px' },
  { prop: 'deptName', label: '部门名称', minWidth: '100px' },
  { prop: 'sortNo', label: '显示顺序', width: '100px' },
  { prop: 'enabledEnum', label: '部门状态', width: '100px', enumType: true },
  { prop: 'createTime', label: '创建时间', timeFormat: true, width: '170px' },
  { prop: 'createByName', label: '创建人', width: '150px' },
  { prop: 'updateTime', label: '更新时间', timeFormat: true, width: '170px' },
  { prop: 'updateByName', label: '最后一次修改人', width: '150px' },
])
const queryFormFields = defineFormFields<SysDept>([
  {
    prop: 'deptName',
    component: 'n-input',
    props: {
      placeholder: '输入部门名称精确搜索',
      trimType: 'all',
    },
    label: '部门名称',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'deptCode',
    component: 'n-input',
    props: {
      placeholder: '输入部门代码精确搜索',
      trimType: 'all',
      format: 'uppercase',
    },
    label: '部门代码',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'parentId',
    component: 'n-tree-select',
    label: '上级部门',
    props: {
      fetchData: fetchGetDeptTreeList,
    },
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
])
export const useTable = () => {
  return {
    queryFormFields,
    columns,
  }
}
