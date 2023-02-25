import type { App, Directive, DirectiveBinding } from 'vue'
import { hasGlobalePermission, hasRole } from '@/utils'

function checkPermission(el: Element, binding: DirectiveBinding<string[]>) {
  const value = binding.value
  if (!value)
    return

  if (!hasGlobalePermission(value))
    el.parentNode?.removeChild(el)
}

function checkRole(el: Element, binding: DirectiveBinding<string[]>) {
  const value = binding.value
  if (!value)
    return

  if (!hasRole(value))
    el.parentNode?.removeChild(el)
}

const permissionDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<string[]>) => {
    checkPermission(el, binding)
  },
}

const roleDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding<any>) => {
    checkRole(el, binding)
  },
}

export function setupPermissionDirective(app: App) {
  app.directive('permission', permissionDirective)
  app.directive('role', roleDirective)
}

export default permissionDirective
