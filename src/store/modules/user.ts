import { defineStore } from 'pinia'
import LayoutStore from '@/layouts'

import Avatar from '@/assets/img_avatar_default.png'
import type { UserInfo } from '@/api/user'
import { fetchGetMenuList, fetchGetUserInfo, fetchLogout } from '@/api/user'
import { removeToken } from '@/utils/auth'
import type { OriginRoute } from '@/router/router'

const defaultAvatar = Avatar

const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {} as UserInfo,
    }
  },
  getters: {
    getNickName(): string {
      return this.userInfo.nickName
    },
    getAvatar(): string {
      return this.userInfo.avatar ?? defaultAvatar
    },
  },
  actions: {
    doGetUserInfo() {
      return new Promise<UserInfo>((resolve, reject) => {
        fetchGetUserInfo()
          .then((res) => {
            this.userInfo = res
            resolve(res)
          })
          .catch(reject)
      })
    },
    doGetMenuList() {
      return new Promise<Array<OriginRoute>>((resolve, reject) => {
        fetchGetMenuList()
          .then((res) => {
            resolve(res)
          })
          .catch(reject)
      })
    },
    doLogout() {
      return new Promise<void>((resolve, reject) => {
        fetchLogout()
          .then(() => {
            this.userInfo = {}
            removeToken()
            LayoutStore.reset()
            resolve()
          })
          .catch(reject)
      })
    },
  },
})

export default useUserStore
