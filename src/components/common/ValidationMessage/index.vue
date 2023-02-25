<!-- 校验错误信息错误提示 -->
<script lang='ts' setup name="ValidationMessage">
import { computed } from 'vue'
import { ElDivider } from 'element-plus'
interface Errors {
  field?: string
  message: string
  type: 'DANGER' | 'WARNING'
  [key: string]: any
}

const props = defineProps({
  errors: {
    type: Array<Errors>,
    required: true,
  },
})

const warningErrors = computed(() => {
  return props.errors.filter(v => v.type === 'WARNING')
})

const dangerErrors = computed(() => {
  return props.errors.filter(v => v.type === 'DANGER')
})

const doStrikethorough = (e: Event) => {
  const el = e.target as HTMLElement
  if (el.classList.contains('strikethrough'))
    el.classList.remove('strikethrough')
  else
    el.classList.add('strikethrough')
}
</script>

<template>
  <div v-if="(dangerErrors.length > 0)" class="danger-container mb-6 block">
    <ElDivider class="mt-0">
      <span class="danger">危险内容</span>
    </ElDivider>
    <ul>
      <li v-for="(item, i) in dangerErrors" :key="i" class="item" :class="{ strikethrough: item.flag === true }" @click="doStrikethorough">
        {{ i + 1 }}: {{ item.message }}
      </li>
    </ul>
  </div>
  <div v-if="(warningErrors.length > 0)" class="mt-3 mb-6 warning-container">
    <ElDivider>
      <span class="warning">警告内容</span>
    </ElDivider>
    <ul>
      <li v-for="(item, i) in warningErrors" :key="i" class="item" :class="{ strikethrough: item.flag === true }" @click="doStrikethorough">
        {{ i + 1 }}: {{ item.message }}
      </li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
.strikethrough {
  color: var(--el-disabled-text-color);
  text-decoration: line-through;
}

.warning {
  color: var(--el-color-warning);
}

.warning-container .el-divider--horizontal {
  margin-top: 0;
  border-color: var(--el-color-warning);
}

.danger-container .el-divider--horizontal {
  margin-top: 0;
  border-color: var(--el-color-danger);
}

.danger {
  color: var(--el-color-danger);
}

.item {
  cursor: pointer;

  &:hover {
    color: var(--el-text-color-primary);
    background-color: var(--el-menu-hover-bg-color);
  }
}
</style>
