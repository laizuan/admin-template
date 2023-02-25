import NProgress from 'nprogress'
import { isNil } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'

import LayoutStore, { Layout } from '@/layouts'
import { isExternal, mapTwoLevelRouter } from '@/layouts/utils'
import 'nprogress/nprogress.css'
import router, { routes as constantRoutes, errorRouter } from '@/router'
import { getToken } from '@/utils/auth'
import type { RouteRecordRawWithHidden } from '@/layouts/types'
import useUserStore from '@/store/modules/user'
const publicPath = import.meta.env.VITE_PUBLIC_PATH
const modulesRoutes = import.meta.glob('/src/views/**/*.{vue,tsx}')
NProgress.configure({
  showSpinner: false,
})

export interface OriginRoute {
  componentPath?: string
  url?: string
  routerName?: string
  display?: boolean
  tip?: string | number
  children: Array<OriginRoute>
  meta: RouteMeta
}

interface RouteMeta {
  i18n?: string
  permissions?: Array<String>
  title: string
  activeMenu?: string
  icon?: string
  noCache: boolean
  affix: boolean
}

function getComponent(it: OriginRoute) {
  const componentPath = `/src/views${it.componentPath}.vue`
  return modulesRoutes[componentPath]
}

function getCharCount(str: string, char: string) {
  const regex = new RegExp(char, 'g')
  const result = str.match(regex)
  const count = !result ? 0 : result.length
  return count
}

function isMenu(path: string) {
  return isNil(path) || getCharCount(path, '/') === 1
}

function generatorRoutes(res: Array<OriginRoute>) {
  const tempRoutes: Array<RouteRecordRawWithHidden> = []
  res?.forEach((it) => {
    const {
      meta: { title, affix, noCache, icon, activeMenu, permissions },
      url,
      componentPath,
      routerName,
      display,
      tip,
    } = it
    const route: RouteRecordRawWithHidden = {
      path: ((url && isExternal(url)) ? url : publicPath + (url || `/R${Math.random()}`)),
      name: routerName || componentPath || `R${Math.random()}`,
      hidden: display === false,
      component: isMenu(url) ? Layout : getComponent(it),
      meta: {
        permissions,
        title,
        affix: !!affix,
        cacheable: !noCache,
        icon: icon || '',
        badge: tip,
        activeMenu,
      },
    }
    if (it.children)
      route.children = generatorRoutes(it.children) as never

    tempRoutes.push(route)
  })
  return tempRoutes
}

const whiteRoutes: string[] = []

function isTokenExpired(): boolean {
  const token = getToken()
  return !!token
}
router.beforeEach(async (to) => {
  NProgress.start()
  if (whiteRoutes.includes(to.path)) {
    NProgress.done()
    return true
  }
  else {
    if (!isTokenExpired()) {
      NProgress.done()
      return {
        path: '/',
        query: { redirect: to.fullPath },
      }
    }
    else {
      const isEmptyRoute = LayoutStore.isEmptyPermissionRoute()
      if (isEmptyRoute) {
        // 加载路由
        const accessRoutes: Array<RouteRecordRaw> = []
        const userInfo = useUserStore()
        userInfo.doGetUserInfo()
        const tempRoutes = await userInfo.doGetMenuList()
        accessRoutes.push(...generatorRoutes(tempRoutes))
        accessRoutes.push({
          path: '/:pathMatch(.*)*',
          redirect: `${publicPath}/error/403`,
          hidden: true,
        } as RouteRecordRaw)
        const mapRoutes = mapTwoLevelRouter(accessRoutes)
        mapRoutes.forEach((it: any) => {
          router.addRoute(it)
        })
        router.addRoute(errorRouter)
        LayoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
        return { ...to, replace: true }
      }
      else {
        return true
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
