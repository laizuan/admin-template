<script lang="ts" setup name="App">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElConfigProvider } from 'element-plus'
import { zhCn as nextZhcn } from 'element-next/lib/lang/index'

const locale = {
  ...zhCn,
  ...nextZhcn,
}
</script>

<template>
  <ElConfigProvider :locale="locale">
    <router-view />
  </ElConfigProvider>
</template>
