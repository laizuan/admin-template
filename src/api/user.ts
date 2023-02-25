import type { OriginRoute } from '@/router/router'
import { post } from '@/utils/request'

export interface UserInfo {
  username: string
  nickName: string
  avatar?: string
  userId: string
  permissions: String[]
  roles: String[]
}

// 获取用户信息
export const fetchGetUserInfo = () => {
  // return get<UserInfo>('/index/curruser')

  return Promise.resolve<UserInfo>({
    username: 'administrator',
    nickName: '超级管理员',
    userId: '1',
    permissions: ['*', 'sys:dict:all'],
    roles: ['admin'],
  })
}

// 退出登入
export const fetchLogout = () => {
  return post<boolean>('/auth/logout')
}

// 获取用户菜单
export const fetchGetMenuList = () => {
  // return get<Array<OriginRoute>>('index/user/menu')

  return Promise.resolve<Array<OriginRoute>>([
    {
      meta: {
        title: '企业管理',
        icon: 'setting',
        noCache: true,
        affix: false,
      },
      display: true,
      children: [
        {
          url: '/abs',
          componentPath: '/sys/system/list',
          meta: {
            permissions: [
              'sys:system:all',
            ],
            title: '异常管理',
            noCache: false,
            affix: false,
          },
          display: true,
          routerName: 'Abnormal',
          children: [],
        },
      ],
    },
    {
      meta: {
        title: '系统管理',
        icon: 'setting',
        noCache: true,
        affix: false,
      },
      display: true,
      children: [
        {
          url: '/sys/system/list',
          componentPath: '/sys/system/list',
          meta: {
            permissions: [
              'sys:system:all',
            ],
            title: '系统管理',
            noCache: false,
            affix: false,
          },
          display: true,
          routerName: 'SysSystemPage',
          children: [],
        },

        {
          url: '/sys/enterprise/list',
          componentPath: '/sys/enterprise/list',
          meta: {
            permissions: [
              'sys:enterprise:all',
            ],
            title: '企业管理',
            noCache: false,
            affix: false,
          },
          display: true,
          routerName: 'SysEnterprisePage',
          children: [
            {
              url: '/sys/enterprise/edit/:id/:readonly',
              componentPath: '/sys/enterprise/edit',
              meta: {
                permissions: [
                  'sys:enterprise:all',
                ],
                title: '企业维护',
                noCache: false,
                affix: false,
                activeMenu: '/upm/sys/enterprise/list',
              },
              display: false,
              routerName: 'SysEnterpriseEdit',
              children: [],
            },
          ],
        },
        {
          url: '/sys/menu/list',
          componentPath: '/sys/menu/list',
          meta: {
            permissions: [
              'sys:menu:all',
            ],
            title: '菜单管理',
            noCache: false,
            affix: false,
          },
          display: true,
          routerName: 'SysMenuPage',
          children: [],
        },
        {
          url: '/sys/dict/list',
          componentPath: '/sys/dict/type-list',
          meta: {
            permissions: [
              'sys:dict:all',
            ],
            title: '字典管理',
            noCache: false,
            affix: false,
          },
          display: true,
          routerName: 'SysDictTypePage',
          children: [
            {
              url: '/sys/dict-data/list/:type',
              componentPath: '/sys/dict/data-list',
              meta: {
                permissions: [
                  'sys:user:update',
                ],
                title: '字典数据',
                noCache: false,
                affix: false,
                activeMenu: '/upm/sys/dict/list',
              },
              display: false,
              routerName: 'SysDictPage',
              children: [],
            },
          ],
        },
        {
          url: '/sys/role/list',
          componentPath: '/sys/role/list',
          meta: {
            permissions: [
              'sys:role:delete',
            ],
            title: '角色管理',
            noCache: false,
            affix: false,
          },
          display: true,
          routerName: 'SysRolePage',
          children: [],
        },
      ],
    },
  ])
}
