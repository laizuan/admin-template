import type { UnwrapNestedRefs } from 'vue'
import type { RouteRecordRaw, _RouteLocationBase } from 'vue-router'
export type LayoutMode = 'ltr' | 'lcr' | 'ttb'

export type Device = 'pc' | 'mobile' | 'pad'

export declare interface UserInfo {
  nickName: string
  avatar: string
  [propsName: string]: any
}

export declare interface ActionItem {
  showSearch: boolean
  showMessage: boolean
  showFullScreen: boolean
  showRefresh: boolean
  showDark: boolean
}

export interface LayoutSetting {
  isCollapse: boolean
  isDark: boolean
  isFixedNavBar: boolean
  layoutMode: string
  device: Device
  theme: string
}

export interface StoreState extends LayoutSetting {
  actionItem: UnwrapNestedRefs<ActionItem>
  permissionRoutes: Array<RouteRecordRaw>
  visitedView: UnwrapNestedRefs<Array<RouteRecordRaw & _RouteLocationBase>>
  cachedView: Array<string>
}

export type RouteRecordRawWithHidden = RouteRecordRaw & { hidden: boolean }

export interface LocalLayoutStore {
  state: UnwrapNestedRefs<StoreState>
  initPermissionRoute(routes: any): void
  reset: () => void
  isEmptyPermissionRoute: () => boolean
  start(option: any): void
  addCachedView: (route: RouteRecordRaw) => void
  removeCachedView: (route: RouteRecordRaw) => void
  resetCachedView: () => void
  addVisitedView: (route: any) => Promise<any>
  removeVisitedView: (route: RouteRecordRaw) => Promise<RouteRecordRaw>
  closeLeftVisitedView: (selectRoute: RouteRecordRaw) => void
  closeRightVisitedView: (selectRoute: RouteRecordRaw) => void
  closeAllVisitedView: () => Promise<void>
  persistentVisitedView: () => void
  restoreVisitedView: () => void
  toggleCollapse: (isCollapse: boolean) => void
  toggleDark: (isDark: boolean) => void
  toggleFixedNavBar: (isFixedNavBar: boolean) => void
  changeTheme: (themeId: any) => void
  changeLayoutMode: (layoutId: any) => void
  changeDevice: (device: string) => void
  isShowHeader: () => boolean
  cancelLogout?: () => void
  saveSetting: (setting: any) => void
}
