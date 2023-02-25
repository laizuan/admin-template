import { isArray, isNil, isNull, isUndefined } from 'lodash-es'
import { unref } from 'vue'
import type {
  LocationAsRelativeRaw,
  RouteQueryAndHash,
  RouteRecordRaw,
} from 'vue-router'
import {
  useRoute,
  useRouter,
} from 'vue-router'
import { ReadonlyFormFlag } from './const'
import store from '@/layouts/store'
import { useUserStore } from '@/store'
const publicPath = import.meta.env.VITE_PUBLIC_PATH

export * from './const'

export function useTo() {
  const router = useRouter()

  const redirect = (params) => {
    const { name } = unref(router.currentRoute)
    router.replace({ name, params })
  }

  const refresh = () => {
    router.replace({ path: `${publicPath}/redirect${router.currentRoute.value.path}` })
  }

  const closeCurrentTab = (): Promise<RouteRecordRaw> | null => {
    const state = store.state
    const currFullPath = router.currentRoute.value.fullPath
    const findItem = state.visitedView.find(it => it.fullPath === currFullPath)
    if (findItem)
      return store.removeVisitedView(findItem)

    return null
  }

  /**
   * 路由跳转，如果路由名称存在tabs中，删除tabs后新建一个tab
   * @param to 跳转的路由
   * @param megerRouter 相同的路由共用一个tab
   */
  const jump = (to: LocationAsRelativeRaw & RouteQueryAndHash, megerRouter = true) => {
    if (megerRouter) {
      const name = to.name
      store.state.visitedView.forEach((it) => {
        if (it.name === name)
          store.removeVisitedView(it)
      })
    }

    router.push(to)
  }

  const closeBack = (backRouteName?: string) => {
    const response = closeCurrentTab()

    if (response) {
      response.then(() => {
        if (backRouteName) {
          const backItem = store.state.visitedView.find((it: any) => it.name === backRouteName)
          if (backItem)
            router.push(backItem.fullPath)
          else
            router.back()
        }
        else {
          router.back()
        }
      })
    }
  }

  return {
    router,
    refresh,
    redirect,
    closeCurrentTab,
    closeBack,
    jump,
  }
}

/**
 * 字符串是否为null，'', Undefined
 * @param id 字符串
 * @returns true不为空，false为空
 */
export function isNotNull(id: string | number) {
  if (isNil(id) || isNull(id) || isUndefined(id))
    return false

  return true
}

/**
 * 表单页面主键是否为null
 * @param id 表单主键
 * @returns true 编辑或详情，false新增
 */
export function idIsNotNull(id: string | undefined) {
  if (id === '0' || !isNotNull(id))
    return false

  return true
}

/**
 * 表单页面是否只读
 * @returns true 只读，false：可编辑
 */
export function isReadonlyForm() {
  const { readonly } = useRoute().params
  return readonly === ReadonlyFormFlag
}

/**
 * 检查全局用户信息权限集合
 * @param permission 权限
 * @returns true 有权限
 */
export function hasGlobalePermission(permission: string | string[]): boolean {
  const { userInfo: { permissions } } = useUserStore()
  return hasAnyPermission(permissions as string[], permission)
}

/**
 * 检查路由中的mate是否有对应权限
 * @param permission 权限
 * @returns true 有权限
 */
export function hasPermission(permission: string | string[]): boolean {
  const route = useRoute()
  return hasAnyPermission(route?.meta?.permissions as string[], permission)
}

function hasAnyPermission(permissions: string[], permission: string | string[]) {
  if (permissions == null || permissions.length === 0)
    return false

  if (isArray(permission))
    return permissions.some((v, _) => (permission as string[]).some((p, _) => p === v))
  else
    return permissions.some((v, _) => (permission as string) === v)
}

/**
 *
 * @param role 角色名称
 * @returns 是否有该角色权限
 */
export function hasRole(role: string | string[]): boolean {
  const { userInfo: { roles } } = useUserStore()
  if (isArray(role))
    return roles.some((v, _) => (role as string[]).some((p, _) => p === v))
  else
    return roles.some((v, _) => (role as string) === v)
}

/**
 * 获取后端服务路径
 */
export function getServiceHost(): string {
  const base = import.meta.env.VITE_GLOB_API_URL || ''
  const host = import.meta.env.VITE_SERVICE_HOST || ''
  return host + base
}

/**
 * 获取文件下载路径
 */
export function getDownloadPath(filePath: string, preview: boolean, appentTime = false): string {
  return `${getServiceHost()}/v1/attachment/download/${preview ? 1 : 0}?path=${filePath}&t=${appentTime ? new Date().getTime() : 1}`
}
