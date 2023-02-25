import { NIcon, NTag, defineFormFields, defineTableColumns } from 'element-next'
import { h } from 'vue'
import type { SysMenuQueryForm } from './intf'
import type { SysMenu } from '@/api/sys/menu'

const columns = defineTableColumns<SysMenu>([
  {
    prop: 'menuName',
    label: '菜单名称',
    width: '150px',
    render(row) {
      const icon = row.icon
      if (icon) {
        return h('span', [
          h(NIcon, {
            name: icon,
          }),
          h('span', { class: 'ml-1' }, row.menuName),
        ])
      }
      return h('span', row.menuName)
    },
  },
  {
    prop: 'menuType',
    label: '菜单类型',
    width: '90px',
    render(row) {
      let text = '菜单'
      if (row.menuType === 1) {
        text = '目录'
        return h(NTag, { text, type: 'green' })
      }
      else if (row.menuType === 3) {
        text = '按钮'
        return h(NTag, { text, type: 'primary' })
      }
      return h(NTag, { text, type: 'orange' })
    },
  },
  { prop: 'url', label: '路径' },
  { prop: 'permission', label: '权限', width: '150px' },
  { prop: 'enabledEnum', label: '启禁用', width: '80px', enumType: true },
  { prop: 'sortNo', width: '80px', label: '排序' },
])

export const useTable = () => {
  const queryFormFields = defineFormFields<SysMenuQueryForm>([
    {
      prop: 'menuName',
      component: 'n-input',
      label: '菜单名称',
      props: {
        placeholder: '菜单名称前匹配搜索',
        trimAll: true,
      },
      sm: 12,
      xs: 24,
      md: 8,
      lg: 6,
      xl: 4,
    },
    {
      prop: 'parentId',
      slot: true,
      label: '上级菜单',
      sm: 12,
      xs: 24,
      md: 8,
      lg: 6,
      xl: 4,
    },
  ])
  return {
    queryFormFields,
    columns,
  }
}
