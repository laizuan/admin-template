<script lang="ts" setup name="ActionItems">
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useFullscreen } from '@vueuse/core'
import store from '../store'
import PopoverMessageContent from './PopoverMessageContent.vue'
import useEmit from '@/hooks/Emit'
const { isSupported, toggle, isFullscreen } = useFullscreen()

const state = store.state
const router = useRouter()
const route = useRoute()
const emit = useEmit()

function toggleDark() {
  const isDark = !state.isDark
  store.toggleDark(isDark)
  const body = document.documentElement as HTMLElement
  if (isDark)
    body.setAttribute('class', 'dark')
  else
    body.setAttribute('class', '')
}
function onScreenFull() {
  if (!isSupported) {
    ElMessage.error('当前浏览器不支持全屏操作')
    return false
  }
  toggle()
}
function onRefrehRoute() {
  router.replace({ path: `/redirect${route.path}` })
}
function onShowSetting() {
  emit?.emit('show_setting')
}
</script>

<template>
  <div class="action-items-wrapper">
    <div v-if="state.actionItem.showDark" class="action-item" @click="toggleDark()">
      <n-icon v-show="!state.isDark" size="22px" name="layout-dark-mode" />
      <n-icon v-show="state.isDark" size="22px" name="layout-night-mode" />
    </div>
    <div class="action-item">
      <el-popover
        v-if="state.actionItem.showMessage"
        placement="bottom"
        trigger="click"
        transition="el-zoom-in-top"
        :width="300"
        :persistent="false"
      >
        <template #reference>
          <el-badge :is-dot="true">
            <n-icon size="18px" name="layout-notification" />
          </el-badge>
        </template>
        <template #default>
          <PopoverMessageContent />
        </template>
      </el-popover>
    </div>
    <div v-if="state.actionItem.showRefresh" class="action-item" @click="onRefrehRoute">
      <n-icon size="20px" name="layout-refresh" />
    </div>
    <div
      v-if="state.actionItem.showFullScreen && state.device !== 'mobile'"
      class="action-item"
      @click="onScreenFull"
    >
      <n-icon v-if="isFullscreen" size="18px" name="layout-fullscreen-shrink" />
      <n-icon v-else size="18px" name="layout-fullscreen-expand" />
    </div>
    <div v-if="state.device !== 'mobile'" class="action-item" @click="onShowSetting">
      <n-icon size="18px" name="layout-setting" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes logoAnimation {
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.action-items-wrapper {
  position: relative;
  z-index: 9999;
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 12px;
  color: var(--el-text-color-regular);

  .action-item {
    padding: 0 10px;
    cursor: pointer;

    &:hover .n-svg-icon {
      color: var(--el-color-primary);
      animation: logoAnimation 0.3s ease-in-out;
    }
  }
}
</style>
