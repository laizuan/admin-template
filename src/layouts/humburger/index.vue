<script lang="ts" setup name="Humburger">
import store from '../store'
const state = store.state
function toggleFold() {
  store.toggleCollapse(!store.state.isCollapse)
}
</script>

<template>
  <div class="fold-wrapper" @click="toggleFold">
    <n-icon v-show="state.isCollapse" size="18px" name="layout-toggle-right" />
    <n-icon v-show="!state.isCollapse" size="18px" name="layout-toggle-left" />
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;

.fold-open-status {
  transform: rotate(180deg);
}

.fold-close-status {
  transform: rotate(0);
}

.fold-wrapper {
  display: inline-block;
  box-sizing: border-box;
  margin: 0 10px;
  font-size: 20px;
  text-align: center;
  transition: transform $transitionTime;
}

.fold-wrapper:hover {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
