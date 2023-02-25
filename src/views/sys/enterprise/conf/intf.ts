import type { BaseSearchForm } from 'element-next'

export interface SysEnterpriseQueryForm extends BaseSearchForm {
  entName: string
  entCode: string
}
