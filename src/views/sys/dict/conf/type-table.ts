import { defineFormFields, defineTableColumns } from 'element-next'
import { ElButton } from 'element-plus'
import { h, reactive } from 'vue'
import type { SysDictTypeQueryForm } from './intf'
import type { SysDictType } from '@/api/sys/dict'
import { useTo } from '@/utils'

const queryFormFields = defineFormFields<SysDictTypeQueryForm>([
  {
    prop: 'dictType',
    component: 'n-input',
    label: '字典类型',
    props: {
      placeholder: '输入字典类型前匹配搜索',
      trimAll: true,
    },
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
  {
    prop: 'description',
    component: 'n-input',
    label: '类型描述',
    props: {
      trimAll: true,
      placeholder: '输入字典类型描述模糊搜索',
    },
    sm: 12,
    xs: 24,
    md: 8,
    lg: 6,
    xl: 4,
  },
])

export const useTable = () => {
  const { jump } = useTo()

  const columns = reactive(defineTableColumns<SysDictType>([
    {
      prop: 'dictType',
      label: '字典类型代码',
      width: '280px',
      render(row: SysDictType) {
        return h(
          ElButton,
          {
            link: true,
            type: 'primary',
            onClick: () => {
              jump({ name: 'SysDictPage', params: { type: row.dictType } })
            },
          },
          () => row.dictType,
        )
      },
    },
    { prop: 'dictDesc', label: '字典类型描述', width: '280px' },
    { prop: 'sortNo', label: '排序', width: '80px' },
    { prop: 'enabledEnum', label: '启用状态', width: '90px', enumType: true },
    { prop: 'remark', label: '备注' },
  ]))
  return {
    queryFormFields,
    columns,
  }
}
