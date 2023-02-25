import { defineFormFields, defineTableColumns } from 'element-next'
import type { SysRoleQueryForm } from './intf'
import type { SysRole } from '@/api/sys/role'

const queryFormFields = defineFormFields<SysRoleQueryForm>([
  {
    prop: 'name',
    component: 'n-input',
    props: {
      placeholder: '输入角色名称全模糊搜索',
    },
    label: '角色名称',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'code',
    component: 'n-input',
    props: {
      format: 'uppercase',
      placeholder: '输入角色代码精确搜索',
    },
    label: '角色代码',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
])

const columns = defineTableColumns<SysRole>([
  {
    prop: 'name',
    label: '角色名称',
    width: '150px',
  },
  {
    prop: 'code',
    label: '角色代码',
    width: '150px',
  },
  {
    prop: 'enabledEnum',
    label: '启用状态',
    width: '150px',
    enumType: true,
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
