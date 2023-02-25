import { reactive, shallowReactive } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { toHump } from '../utils'
import type { Device, LayoutSetting, StoreState } from '../types'

import { GlobalCacheKey } from '../utils/constant'
const layoutModes = ['ltr', 'lcr', 'ttb']

const defaultSetting = {
  isCollapse: false,
  isDark: false,
  isFixedNavBar: true,
  layoutMode: 'lcr',
  device: 'pc',
  theme: 'light',
}

export default {
  state: shallowReactive<StoreState>({
    isCollapse: false,
    isFixedNavBar: true,
    isDark: false,
    layoutMode: 'lcr',
    device: 'pc',
    theme: 'light',
    permissionRoutes: shallowReactive([]) as Array<any>,
    visitedView: shallowReactive([]) as Array<any>,
    cachedView: shallowReactive([]) as Array<any>,
    actionItem: reactive({
      showSearch: true,
      showMessage: true,
      showFullScreen: true,
      showRefresh: true,
      showDark: true,
    }),
  }),
  start(options: StoreState) {
    const storeSetting = JSON.parse(
      localStorage.getItem(GlobalCacheKey.setting) || '{}',
    ) as LayoutSetting

    const setting = Object.assign(defaultSetting, options || {}, storeSetting)

    document.documentElement.setAttribute('class', setting.isDark ? 'dark' : '')
    this.state = Object.assign(this.state, setting)
    this.saveSetting(setting)
    this.restoreVisitedView()
  },
  randomLayouMode() {
    return layoutModes[Math.floor(Math.random() * layoutModes.length)]
  },
  toggleDark(newStatus: boolean) {
    this.state.isDark = newStatus
    this.saveSetting({ isDark: newStatus })
  },
  toggleCollapse(newStatus: boolean) {
    this.state.isCollapse = newStatus
    this.saveSetting({ isCollapse: newStatus })
  },
  toggleFixedNavBar(newStatus: boolean) {
    this.state.isFixedNavBar = newStatus
    this.saveSetting({ isFixedNavBar: newStatus })
  },
  changeLayoutMode(mode = 'ltr') {
    this.state.layoutMode = mode
    this.saveSetting({ layoutMode: mode })
  },
  changeDevice(device: Device = 'pc') {
    this.state.device = device
  },
  changeTheme(theme = 'dark') {
    this.state.theme = theme
    this.saveSetting({ theme })
  },
  isShowHeader() {
    return this.state.device === 'pc' && this.state.layoutMode === 'ttb'
  },
  getSplitTabs() {
    return this.state.permissionRoutes.filter((it) => {
      return it.path && !(it as any).hidden && it.children && it.children.length > 0
    })
  },
  initPermissionRoute(routes: Array<RouteRecordRaw>) {
    this.state.permissionRoutes.length = 0
    this.state.permissionRoutes.push(...routes)
  },
  isEmptyPermissionRoute() {
    return !this.state.permissionRoutes || this.state.permissionRoutes.length === 0
  },
  saveSetting(setting: any) {
    const settings = Object.assign(defaultSetting, { ...setting })
    delete settings.permissionRoutes
    delete settings.visitedView
    delete settings.cachedView
    delete settings.actionItem

    localStorage.setItem(GlobalCacheKey.setting, JSON.stringify(settings))
  },
  reset() {
    this.state = shallowReactive<StoreState>({
      isCollapse: false,
      isFixedNavBar: true,
      isDark: false,
      layoutMode: defaultSetting.layoutMode,
      device: 'pc',
      theme: defaultSetting.theme,
      permissionRoutes: shallowReactive([]) as Array<any>,
      visitedView: shallowReactive([]) as Array<any>,
      cachedView: shallowReactive([]) as Array<any>,
      actionItem: reactive({
        showSearch: true,
        showMessage: true,
        showFullScreen: true,
        showRefresh: true,
        showDark: true,
      }),
    })
  },
  addCachedView(route: RouteRecordRaw) {
    if (route.name && route.meta && route.meta.cacheable) {
      const humName = toHump(route.name as string)
      if (!this.state.cachedView.includes(humName))
        this.state.cachedView.push(humName)
    }
  },
  removeCachedView(route: RouteRecordRaw) {
    const humName = toHump(route.name as string)
    const index = this.state.cachedView.indexOf(humName)
    if (index !== -1)
      this.state.cachedView.splice(index, 1)
  },
  resetCachedView() {
    // 从已经访问过的页面的数组中过滤可缓存的页面
    this.state.cachedView.length = 0
    this.state.cachedView.push(
      ...this.state.visitedView
        .filter((it, _index) => {
          return it.name && it.meta && it.meta.cacheable
        })
        .map(it => toHump(it.name as string)),
    )
  },
  addVisitedView(route: any) {
    return new Promise<any>((resolve) => {
      if (!this.state.visitedView.find((it: any) => it.fullPath === route.fullPath)) {
        this.state.visitedView.push(route)
        this.persistentVisitedView()
      }
      this.addCachedView && this.addCachedView(route)
      resolve(route)
    })
  },
  removeVisitedView(route: RouteRecordRaw) {
    return new Promise<RouteRecordRaw>((resolve) => {
      this.state.visitedView.splice(this.state.visitedView.indexOf(route), 1)
      this.persistentVisitedView()
      this.removeCachedView && this.removeCachedView(route)
      resolve(route)
    })
  },
  closeLeftVisitedView(selectRoute: RouteRecordRaw) {
    return new Promise<void>((resolve) => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        const tempList = this.state.visitedView.filter((it, index) => {
          return (it.meta && it.meta.affix) || index >= selectIndex
        })
        this.state.visitedView.length = 0
        this.state.visitedView.push(...tempList)
        this.persistentVisitedView()
      }
      this.removeCachedView && this.removeCachedView(selectRoute)
      resolve()
    })
  },
  closeRightVisitedView(selectRoute: RouteRecordRaw) {
    return new Promise<void>((resolve) => {
      const selectIndex = this.state.visitedView.indexOf(selectRoute)
      if (selectIndex !== -1) {
        const tempList = this.state.visitedView.filter((it, index) => {
          return (it.meta && it.meta.affix) || index <= selectIndex
        })
        this.state.visitedView.length = 0
        this.state.visitedView.push(...tempList)
        this.persistentVisitedView()
      }
      this.removeCachedView && this.removeCachedView(selectRoute)
      resolve()
    })
  },
  closeAllVisitedView() {
    return new Promise<void>((resolve) => {
      const tempList = this.state.visitedView.filter((it, _index) => {
        return it.meta && it.meta.affix
      })
      this.state.visitedView.length = 0
      this.state.visitedView.push(...tempList)
      this.persistentVisitedView()
      this.state.cachedView.length = 0
      this.state.cachedView.push(
        ...this.state.visitedView
          .filter(route => route.name && route.meta && route.meta.cacheable)
          .map(it => toHump(it.name as string)),
      )
      resolve()
    })
  },
  persistentVisitedView() {
    const tempPersistendRoutes = this.state.visitedView.map((it: any) => {
      return {
        fullPath: it.fullPath,
        meta: it.meta,
        name: it.name,
        params: it.params,
        path: it.path,
        query: it.query,
      }
    })
    localStorage.setItem('visited', JSON.stringify(tempPersistendRoutes))
  },
  restoreVisitedView() {
    this.state.visitedView.splice(0, this.state.visitedView.length)
    const originRouteString = localStorage.getItem('visited')
    const persistentVisitedRoutes = JSON.parse(originRouteString || '[]')
    persistentVisitedRoutes.forEach((originRoute: any) => {
      if (
        !this.state.visitedView.find(
          (it: any) => it.fullPath === originRoute.fullPath && it.name === originRoute.name,
        )
      )
        this.state.visitedView.push(originRoute)
    })
  },
}
