import { get, replaceHolder } from 'element-next'
import type { SysSystem } from './system'
import type { Attachment } from '@/utils/request'
import { upload } from '@/utils/request'

export interface SysEnterpriseSystem extends SysSystem {
  auditStatus: number
}
/**
* 企业管理
* @author laizuan
* @since 2023/02/20
*/
export interface SysEnterprise {
  /**
        * 主键
        */
  id: string
  /**
        * 企业名称
        */
  entName: string
  /**
        * 企业代码
        */
  entCode: string

  /**
        * 企业LOGO
        */
  logoPath: string
  /**
        * 公司地址
        */
  addr: string
  /**
        * 营业执照地址
        */
  scc: string
  /**
        * 启用状态(1启用 0禁用 2注销)
        */
  enabled: number
  enabledEnum?: BaseEnum
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

  systemList: Array<SysEnterpriseSystem>
}
export enum SysEnterpriseApiUrl {
  list = '/v1/ent/list',
  get = '/v1/ent/{id}/get',
  update = '/v1/ent/update',
  add = '/v1/ent/create',
  findEnterpriseSystem = '/v1/ent/{entId}/system',
}

/**
 *
 * @param entId 企业主键
 * @returns 获取企业申请系统数据
 */
export const fetchEnterpriseSystemList = (entId: string) => {
  const url = replaceHolder(SysEnterpriseApiUrl.findEnterpriseSystem, { entId })
  return get<Array<SysEnterpriseSystem>>(url)
}

/**
 * 创建企业信息
 * @param data  企业数据
 * @param files  附件
 * @returns
 */
export const fetchCreateEnterprise = (data: SysEnterprise, files: Attachment[]) => {
  return upload(SysEnterpriseApiUrl.add, data, files)
}

/**
 * 修改企业信息
 * @param data  企业数据
 * @param files  附件
 * @returns
 */
export const fetchUpdateEnterprise = (data: SysEnterprise, files: Attachment[]) => {
  return upload(SysEnterpriseApiUrl.update, data, files)
}
