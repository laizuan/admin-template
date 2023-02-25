<!-- 权限 -->
<script lang='ts' setup name="Auth">
import { computed } from 'vue'
import { hasGlobalePermission, hasPermission, hasRole } from '@/utils'
const props = defineProps({
  /**
   * 需要的权限集合
   */
  premissions: {
    type: Array<string>,
    default: [],
  },
  /**
   * 是否检查全局权限
   */
  global: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否检查的角色权限
   */
  checkRole: {
    type: Boolean,
    default: false,
  },
})

const hasPre = computed(() => {
  if (props.premissions.length === 0)
    return false

  if (props.checkRole)
    return hasRole(props.premissions)

  if (props.global)
    return hasGlobalePermission(props.premissions)
  else
    return hasPermission(props.premissions)
})
</script>

<template>
  <div v-if="hasPre">
    <slot />
  </div>
</template>
