<script lang="ts" setup>
import { ElMessageBox, ElTooltip } from 'element-plus'
import useUserStore from '@/store/modules/user'

const useStore = useUserStore()

function doLogout() {
  ElMessageBox({
    title: '提示',
    message: '是否要退出登录？',
    type: 'warning',
    confirmButtonText: '退出',
    cancelButtonText: '取消',
    showCancelButton: true,
  }).then(() => {
    useStore.doLogout()
  })
}
</script>

<template>
  <div class="vaw-avatar-container">
    <div class="action-wrapper">
      <div class="avatar">
        <img :src="useStore.getAvatar">
      </div>
      <span class="nick-name">
        <span class="mr-1">{{ useStore.getNickName }}</span>
      </span>
    </div>
    <div class="ml-2 cursor-pointer" @click="doLogout">
      <ElTooltip content="退出登入">
        <n-icon size="16px" name="layout-logout" />
      </ElTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;

.vaw-avatar-container {
  display: flex;
  align-items: center;

  .logout {
    font-size: 16px;
    line-height: 16px;
  }

  .action-wrapper {
    display: flex;
    align-items: center;

    .avatar {
      display: flex;
      align-items: center;
      width: calc(#{$logoHeight} - 15px);
      height: calc(#{$logoHeight} - 15px);
      border-radius: 50%;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .nick-name {
      margin-left: 10px;

      .tip {
        transform: rotate(0);
        transition: transform $transitionTime;
      }
    }
  }
}
</style>
