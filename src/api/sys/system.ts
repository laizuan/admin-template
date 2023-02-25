import { get } from 'element-next'

/**
* 系统
* @author laizuan
* @since 2023/02/16
*/
export interface SysSystem {
  /**
        * 主键
        */
  id: string
  /**
        * 系统代码
        */
  code: string
  /**
        * 系统代码
        */
  name: string
  /**
        * 系统链接地址
        */
  link: string
  /**
        * 备注
        */
  remark: string
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
  /**
        * 排序
        */
  sortNo: number
  /**
        * 系统简介
        */
  intro: string
  /**
        * 是否开放申请，true是，false否
        */
  openRegistry: boolean
  /**
        * 是否显示
        */
  indexDisplay: boolean
  /**
        * 是否显示申请
        */
  displayRegistry: boolean

  /**
   * 默认的角色
   */
  defaultRoleId: string
}

export enum SysSystemApiUrl {
  list = '/v1/system/list',
  get = '/v1/system/{id}/get',
  update = '/v1/system/update',
  delete = '/v1/system/{id}/delete',
  add = '/v1/system/create',
  simple = '/v1/system/simple',
}

export const fetchGetSystemSimple = () => {
  return get <Array<SysSystem>>(SysSystemApiUrl.simple)
}
