

## 动态路由

根据当前用户的角色从后台请求到对应的路由模块。当用户登录成功之后，就会请求对应的路由模块。经过系统的转化成 vue-router 所需要的路由信息格式的数据，通过 vue-router 的 addRoute 方法动态添加到路由表中。


**路由额外参数**
| 参数名称      | 类型            | 说明       | 默认值  |
| ------------- | --------------- | ------------------- | ------- |
| `url` | `string` | 地址栏路径，支持参数路径`/sys/user/:id/:flag`   | -   |
| `componentPath`      | `string`       | 组件地址 | - |
| `display`  | `Boolean`       | 是否显示在菜单栏中    | `true` |
| `children`  | `Array`       | 二级菜单，支持无限级    | - |
| `routerName`  | `string`       | 路由名称，开启缓存后该路由名称必须和页面的`name`值相同，否则会造成内存溢出    | - |

**Meta元数据**

| 参数名称      | 类型            | 说明       | 默认值  |
| ------------- | --------------- | ------------------- | ------- |
| `title` | `string` | 显示表体   | -   |
| `icon`      | `string`       | 图标 | - |
| `noCache`  | `Boolean`       | 不缓存路由    | `true` |
| `affix`  | `Boolean`       | 是否固定在Tab栏    | `false` |


```json
{
  "status": "200",
  "data": [
    {
      "menuId": "1417754896917671937",
      "meta": {
        "title": "系统管理",
        "icon": "setting",
        "noCache": true,
        "affix": false
      },
      "display": true,
      "children": [
        {
          "url": "/sys/user/list",
          "componentPath": "/sys/user/list",
          "menuId": "866785842351210496",
          "meta": {
            "permissions": [
              "sys:user:update"
            ],
            "title": "用户管理",
            "noCache": false,
            "affix": false
          },
          "display": true,
          "routerName": "SysUserPage",
          "children": []
        },
        {
          "url": "/sys/role/list",
          "componentPath": "/sys/role/list",
          "menuId": "866786488265637888",
          "meta": {
            "permissions": [
              "sys:role:delete"
            ],
            "title": "角色管理",
            "noCache": false,
            "affix": false
          },
          "display": true,
          "routerName": "SysRolePage",
          "children": []
        }
      ]
    }
  ]
}
```

## 权限

- 编程式权限

```ts
import { hasGlobalePermission, hasPermission, hasRole } from '@/utils'

// 检查全局store的权限表
hasGlobalePermission(['xxx'])
hasGlobalePermission('xxx')

// 检查当前路由表mate中的permission是否有权限值
hasPermission('xxx')
hasPermission(['xxx'])

// 检查全局store的角色权限
hasRole('xxx')
hasRole(['xxx'])
```

- 组件式权限

| 参数名称      | 类型            | 说明       | 默认值  |
| ------------- | --------------- | ------------------- | ------- |
| `premissions` | `Array<string>` | 需要的权限集合   | `[]`    |
| `global`      | `Boolean`       | 是否检查全局权限，默认检查当前路由中的权限。`check-role`为真的时候无效 | `false` |
| `check-role`  | `Boolean`       | 是否检查的角色权限    | `false` |


```vue
<template>
  <Auth :premissions="['xxx']">
    我是需要有xxx权限才能见
  </Auth>
</template>
```

- 指令式权限

`v-premissions`检查的是全局的权限，因为自定义指令不能拿到当前路由对象。**不建议使用这种方式**

```vue
<template>
  <div v-premissions="['xxx']">
    我是需要有xxx权限才能见
  </div>
</template>
```

`v-role`检查的是全局的角色权限

```vue
<template>
  <div v-role="['xxx']">
    我是需要有xxx角色才能见
  </div>
</template>
```
