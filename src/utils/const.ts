export const ReadonlyFormFlag = '1'
export enum ActionType {
  detail = 1,
  edit = 0,
  add = 2,
}

export const Enabled = [
  {
    desc: '启用',
    value: 1,
  },
  {
    desc: '禁用',
    value: 0,
  },
]

export const YesOrNo = [
  {
    desc: '是',
    value: 1,
  },
  {
    desc: '否',
    value: 0,
  },
]

export const SwitchEnabled = {
  inlinePrompt: true,
  activeText: '启用',
  inactiveText: '禁用',
  activeValue: 1,
  inactiveValue: 0,
}
export const SwitchYesOrNo = {
  inlinePrompt: true,
  activeText: '是',
  inactiveText: '否',
  activeValue: true,
  inactiveValue: false,
}

export const DynamicQueryUrl = '/dynamic/query'
export const StaticEnumUrl = '/v1/index/enum/static'
export const DictEnumUrl = '/v1/index/enum'

export const DictTypeConst = {
  ENTERPRISE_SYSTEM_AUDIT_STATUS: 'ent_sys_aud_sts',
}
