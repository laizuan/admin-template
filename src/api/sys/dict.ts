/**
 * 字典维护
 * @author laizuan
 * @since 2022/04/20
 */
export interface SysDict {
  /**
   *   主键
   */
  id: string
  /**
   *   字典类型
   */
  dictType: string
  /**
   *   前端状态类型
   */
  tagType: string
  /**
   *   显示名称
   */
  description: string
  /**
   *   字典值
   */
  value: string
  /**
   *   字典值2
   */
  value2: string
  /**
   *   字典值3
   */
  value3: string
  /**
   *   字典值4
   */
  value4: string
  /**
   *   字典值5
   */
  value5: string
  /**
   *   排序
   */
  sortNo: number
  /**
   *   启用状态(1启用 0禁用)
   */
  enabledEnum: BaseEnum
  enabled: number
  /**
   *   备注
   */
  remark: string
}

/**
 * 字典类型维护
 * @author laizuan
 * @since 2022/04/20
 */
export interface SysDictType {
  /**
   *   主键
   */
  id: string
  /**
   *   字典类型代码
   */
  dictType: string
  /**
   *   字典类型描述
   */
  dictDesc: string
  /**
   *   排序
   */
  sortNo: number
  /**
   *   启用状态(1启用 0禁用)
   */
  enabled: number
  enabledEnum?: BaseEnum
  /**
   *   备注
   */
  remark: string
  /**
   *   创建人主键
   */
  createBy?: string
  createByName?: string
  /**
   *   创建时间
   */
  createTime: number
  /**
   *   修改人主键
   */
  updateBy?: string
  updateByName?: string
  /**
   *   修改时间
   */
  updateTime: number
}

export enum SysDictApiUrl {
  list = '/v1/dict/data/list',
  get = '/v1/dict/data/{id}/get',
  update = '/v1/dict/data/update',
  delete = '/v1/dict/data/{id}/delete',
  add = '/v1/dict/data/create',
}

export enum SysDictTypeApiUrl {
  list = '/v1/dict/type/list',
  get = '/v1/dict/type/{dictType}/get',
  update = '/v1/dict/type/update',
  delete = '/v1/dict/type/{dictType}/delete',
  add = '/v1/dict/type/create',
}
