import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import { Layout } from '@/layouts'
const publicPath = import.meta.env.VITE_PUBLIC_PATH

export const errorRouter = {
  path: `${publicPath}`,
  component: Layout,
  redirect: `${publicPath}/error/403`,
  hidden: true,
  children: [
    {
      path: `${publicPath}/error/403`,
      name: 'ErrorNotAuthPage',
      component: () => import('@/views/error/403.vue'),
      meta: {
        title: '无权限',
        ignoreTabbar: true,
      },
    },
    {
      path: `${publicPath}/error/404`,
      name: 'ErrorNotFoundPage',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '找不到资源',
        ignoreTabbar: true,
      },
    },
  ],
}

export const routes = [
  {
    path: `${publicPath}/redirect`,
    component: Layout,
    hidden: true,
    children: [
      {
        name: 'Redirect',
        path: `${publicPath}/redirect/:path(.*)*`,
        component: (): any => import('@/views/redirect/index.vue'),
      },
    ],
  },

  {
    path: `${publicPath}/personal`,
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Personal',
        component: (): any => import('@/views/personal/index.vue'),
        meta: {
          title: '个人中心',
        },
      },
    ],
  },
  {
    path: `/${publicPath}`,
    redirect: `${publicPath}/index`,
    hidden: true,
  },
  {
    path: `${publicPath}/index`,
    name: 'root',
    component: Layout,
    redirect: `${publicPath}/index/work`,
    meta: {
      title: '主页',
      icon: 'house',
    },
    children: [
      {
        path: `${publicPath}/index/work`,
        name: 'WorkPage',
        component: (): any => import('@/views/index/work.vue'),
        meta: {
          title: '工作台',
          icon: 'house',
          affix: true,
        },
      },
    ],
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
