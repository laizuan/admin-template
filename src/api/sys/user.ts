import { post } from 'element-next'

/**
 * 用户管理
 * @author laizuan
 * @since 2022/04/20
 */
export interface SysUser {
  /**
   *   用户主键
   */
  userId: string
  /**
   *   公司主键
   */
  entId: string
  /**
   *   登入账户
   */
  username: string
  /**
   * 头像
   */
  avatar: string
  /**
   *   登入密码
   */
  password: string
  /**
   *   用户名称
   */
  nickName: string
  /**
   *   电话
   */
  mobile: string
  /**
   *   邮箱
   */
  email: string
  /**
   *   是否管理员
   */
  adminFlag: boolean

  enabled: number

  /**
   *   备注
   */
  remark: string
  /**
   *   创建人主键
   */
  createByName: string
  /**
   *   创建时间
   */
  createTime: number
  /**
   *   修改人主键
   */
  updateByName: string
  /**
   *   修改时间
   */
  updateTime: number

  roleIdList: Array<string>

  sensitiveMobile?: string
  sensitiveEmail?: string
  /**
   *   启用状态(1启用 0禁用 2注销)
   */
  enabledEnum?: BaseEnum
  deptIdList?: []
  auth?: []
}

export enum SysUserApiUrl {
  list = 'v1/user/list',
  get = 'v1/user/{userId}/get',
  update = 'v1/user/update',
  delete = 'v1/user/{userId}/delete',
  add = 'v1/user/create',
  updateStatus = 'v1/user/update',
}

// 修改用户的状态
export function fetchUpdateUserStatus(userId, status) {
  return post(`${SysUserApiUrl.updateStatus}/${status}/${userId}`)
}
