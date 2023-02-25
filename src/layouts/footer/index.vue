<script lang="ts" setup name="Footer">
import { computed } from 'vue'

const setting = computed(() => {
  return {
    projectName: import.meta.env.VITE_GLOB_APP_TITLE || '',
    year: new Date().getFullYear(),
  }
})
</script>

<template>
  <div class="footer-container">
    Copyright <i class="iconfont" style="margin: 0 5px">©</i> {{ setting.projectName }}
    {{ setting.year }}
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables.scss' as *;

.footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: $footerHeight;
  background-color: var(--el-color-white);
  border-top: 1px dashed var(--el-border-color-light);
}
</style>
