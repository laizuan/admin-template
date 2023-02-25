import type { BaseSearchForm } from 'element-next'

export interface SysRoleQueryForm extends BaseSearchForm {
  /**
        * 角色名称
        */
  name: string
  /**
        * 角色代码
        */
  code: string

  systemId: string
}
