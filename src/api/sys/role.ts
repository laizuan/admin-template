import { get } from 'element-next'

/**
* 角色
* @author laizuan
* @since 2023/02/16
*/
export interface SysRole {
  /**
        * 主键
        */
  roleId: string
  /**
        * 角色名称
        */
  name: string
  /**
        * 角色代码
        */
  code: string
  /**
        * 启用状态(1启用 0禁用)
        */
  enabled: number
  enabledEnum?: BaseEnum
  /**
        * 备注
        */
  remark: string

  /**
        * 平台方角色，true是，false不是
        */
  systemRole: boolean
  /**
        * 创建人主键
        */
  createBy: string
  createByName?: string
  /**
        * 创建时间
        */
  createTime: number
  /**
        * 修改人主键
        */
  updateBy: string
  updateByName?: string
  /**
        * 修改时间
        */
  updateTime: number

  // 系统主键
  systemId: string
  menuIdList: Array<string>
}

export enum SysRoleApiUrl {
  list = '/v1/role/list',
  get = '/v1/role/{roleId}/get',
  update = '/v1/role/update',
  delete = '/v1/role/{roleId}/delete',
  add = '/v1/role/create',
  listValid = '/v1/role/list',
}

/** 获取到有效的角色列表 */
export const fetchValidRoleList = (systemId: string) => {
  return get<Array<SysRole>>(`${SysRoleApiUrl.listValid}/${systemId}`)
}
