import type { BaseSearchForm } from 'element-next'

export interface SysUserQueryForm extends BaseSearchForm {
  username: string
  nickName: string
  mobile: string
  enabled: BaseEnum
  entId: string
}
