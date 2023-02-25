import type { SelectTree } from 'element-next'
import { get, post, replaceHolder } from 'element-next'

/**
 * 菜单管理
 * @author laizuan
 * @since 2022/04/19
 */
export interface SysMenu {
  /**
   *   菜单主键
   */
  menuId: string
  /**
   *   菜单名称
   */
  menuName: string
  /**
   *   父级菜单主键
   */
  parentId: string
  systemId: string
  /**
   *   国际化菜单key
   */
  i18n: string
  /**
   *   菜单类型（1目录，2菜单，3按钮）
   */
  menuType: number
  /**
   *   图标
   */
  icon: string
  /**
   *   路由不缓存（0,缓存，1不缓存）
   */
  noCache: boolean
  /**
   *   路由名称
   */
  routerName: string
  /**
   *   激活菜单名称
   */
  activeMenu: string
  /**
   *   路由地址
   */
  url: string
  /**
   *   组件路径
   */
  componentPath: string
  /**
   *   权限
   */
  permission: string
  /**
   *   启禁用
   */
  enabledEnum: BaseEnum
  enabled: number
  /**
   *   是否显示
   */
  display: boolean
  /**
   *   排序
   */
  sortNo: number
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
  createTime?: number
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

export interface TreeList {
  value: string
  desc: string
  childrenList: Array<TreeList>
}

export enum SysMenuApiUrl {
  list = '/v1/menu/list',
  get = '/v1/menu/{id}/get',
  update = '/v1/menu/update',
  delete = '/v1/menu/{id}/delete',
  treeList = '/v1/menu/selectTreeMenu/',
  add = '/v1/menu/add',
}

// 获取下拉选择菜单树
export const fetchMenuSelectTreeList = (systemId: string, all = false) => {
  return get<Array<SelectTree<SysMenu>>>(SysMenuApiUrl.treeList + systemId, { params: { type: all ? 1 : 0 } })
}

// 获取列表菜单树
export const fetchTableMenuTreeList = (data) => {
  return post<Array<SelectTree<SysMenu>>>(SysMenuApiUrl.list, { data })
}

// 删除菜单树
export const fetchDeleteMenu = (id) => {
  return get<boolean>(replaceHolder(SysMenuApiUrl.delete, { id }), { params: { id } })
}
