import { defineFormFields, defineTableColumns } from 'element-next'
import type { SysEnterpriseQueryForm } from './intf'
import type { SysEnterprise } from '@/api/sys/enterprise'

const queryFormFields = defineFormFields<SysEnterpriseQueryForm>([
  {
    prop: 'entName',
    component: 'n-input',
    props: {
      placeholder: '输入企业名称精确搜索',
    },
    label: '企业名称',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'entCode',
    component: 'n-input',
    props: {
      placeholder: '输入企业代码精确搜索',
    },
    label: '企业代码',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
])

const columns = defineTableColumns<SysEnterprise>([
  {
    prop: 'entName',
    label: '企业名称',
    width: '150px',
  },
  {
    prop: 'entCode',
    label: '企业代码',
    width: '90px',
  },
  {
    prop: 'addr',
    label: '公司地址',
  },
  {
    prop: 'enabledEnum',
    label: '启用状态',
    width: '90px',
    enumType: true,
  },
  {
    prop: 'remark',
    label: '备注',
  },
  {
    prop: 'createByName',
    label: '创建人',
    width: '120px',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    timeFormat: true,
    width: '160px',
  },
  {
    prop: 'updateByName',
    label: '修改人',
    width: '120px',
  },
  {
    prop: 'updateTime',
    label: '修改时间',
    timeFormat: true,
    width: '160px',
  },
])

export const useTable = () => {
  return {
    queryFormFields,
    columns,
  }
}
