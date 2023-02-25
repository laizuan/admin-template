import { defineFormFields, defineTableColumns } from 'element-next'
import { h } from 'vue'
import { ElTag } from 'element-plus'
import type { SysUserQueryForm } from './intf'
import type { SysUser } from '@/api/sys/user'
import { StaticEnumUrl } from '@/utils'

const queryFormFields = defineFormFields<SysUserQueryForm>([
  {
    prop: 'username',
    component: 'n-input',
    label: '登入账号',
    props: {
      trimAll: true,
      placeholder: '输入登入账号精确搜索',
    },
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'nickName',
    component: 'n-input',
    label: '用户昵称',
    props: {
      placeholder: '输入用户昵称前匹配搜索',
      trimAll: true,
    },
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'mobile',
    component: 'n-input',
    label: '手机号',
    props: {
      placeholder: '输入手机号前匹配搜索',
      trimAll: true,
    },
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'enabled',
    component: 'n-select',
    label: '状态',
    props: {
      placeholder: '请选择用户状态',
      remoteConfig: {
        url: `${StaticEnumUrl}/UserEnableStatus`,
        key: 'UserEnableStatus',
      },
    },
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
])

const columns = defineTableColumns<SysUser>([
  { prop: 'username', label: '登入账户', width: '100px' },
  { prop: 'nickName', label: '用户名称', width: '150px' },
  {
    prop: 'adminFlag',
    label: '是否管理员',
    width: '70px',
    render: (row) => {
      if (row.adminFlag)
        return h(ElTag, { type: 'success' }, () => '是')

      else
        return h('span', '否')
    },
  },
  { prop: 'sensitiveMobile', label: '电话', width: '110px' },
  { prop: 'sensitiveEmail', label: '邮箱', width: '180px' },
  { prop: 'enabledEnum', label: '启用状态', width: '90px', enumType: true },
  { prop: 'createByName', label: '创建人' },
  { prop: 'createTime', label: '创建时间', timeFormat: true, width: '160px' },
  { prop: 'updateByName', label: '修改人', width: '150px' },
  { prop: 'updateTime', label: '最后一次修改时间', timeFormat: true, width: '160px' },
])

export const useTable = () => {
  return {
    queryFormFields,
    columns,
  }
}
