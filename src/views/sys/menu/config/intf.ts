import type { BaseSearchForm } from 'element-next'

export interface SysMenuQueryForm extends BaseSearchForm {
  menuName: string
  parentId: string
  systemId: string
}
