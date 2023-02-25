import type { BaseSearchForm } from 'element-next'

export interface SysDictQueryForm extends BaseSearchForm {
  description?: string
  value?: string
  dictType: string
}

export interface SysDictTypeQueryForm extends BaseSearchForm {
  dictType?: string
  description?: string
}
