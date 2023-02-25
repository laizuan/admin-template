import type { BaseSearchForm } from 'element-next'

/**
* 用户管理
* @author laizuan
* @since 2023/02/22
*/
export interface SysUser {
  // 用户主键
  userId: string
  // 企业主键
  entId: string
  // 登入账户
  username: string
  // 登入密码
  password: string
  // 用户名称
  nickName: string
  // 电话
  mobile: string
  // 邮箱
  email: string
  // 启用状态(1启用 0禁用 2注销)
  enabled: number
  enabledEnum?: BaseEnum
  // 备注
  remark: string
  // 创建人主键
  createBy: string
  createByName?: string
  // 创建时间
  createTime: number
  // 修改人主键
  updateBy: string
  updateByName?: string
  // 修改时间
  updateTime: number
  // 是否管理员
  adminFlag: boolean
}

export interface SysUserQueryForm extends BaseSearchForm {
  username: string
  nickName: string
  mobile: string
}
