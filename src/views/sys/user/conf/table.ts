import { defineFormFields, defineTableColumns } from 'element-next'
import type { SysUserQueryForm, SysUser } from './intf'

const queryFormFields = defineFormFields<SysUserQueryForm>([
  {
    prop: 'username',
    component: 'n-input',
    props: {
      placeholder: '输入登入账户精确搜索',
    },
    label: '登入账户',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'nickName',
    component: 'n-input',
    props: {
      placeholder: '输入用户名称精确搜索',
    },
    label: '用户名称',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'mobile',
    component: 'n-input',
    props: {
      placeholder: '输入电话精确搜索',
    },
    label: '电话',
    labelWidth: '100px',
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },

])

const columns = defineTableColumns<SysUser>([
  {
    prop: 'entId',
    label: '企业主键',
    width: '150px',
  },
  {
    prop: 'username',
    label: '登入账户',
    width: '150px',
  },
  {
    prop: 'password',
    label: '登入密码',
    width: '150px',
  },
  {
    prop: 'nickName',
    label: '用户名称',
    width: '150px',
  },
  {
    prop: 'mobile',
    label: '电话',
    width: '150px',
  },
  {
    prop: 'email',
    label: '邮箱',
    width: '150px',
  },
  {
    prop: 'enabled',
    label: '启用状态(1启用 0禁用 2注销)',
    width: '150px',
    enumType: true,
  },
  {
    prop: 'remark',
    label: '备注',
    width: '150px',
  },
  {
    prop: 'createBy',
    label: '创建人主键',
    width: '150px',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    timeFormat: true,
    width: '150px',
  },
  {
    prop: 'updateBy',
    label: '修改人主键',
    width: '150px',
  },
  {
    prop: 'updateTime',
    label: '修改时间',
    timeFormat: true,
    width: '150px',
  },
  {
    prop: 'adminFlag',
    label: '是否管理员',
    width: '150px',
  },
])

export const useTable = () => {
  return {
    queryFormFields,
    columns,
  }
}
