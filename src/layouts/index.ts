import { TinyEmitter } from 'tiny-emitter'
import type { App } from 'vue'
import store from './store'

export const emitKey = Symbol('tiny_emit')

function install(Vue: App, options: any) {
  Vue.provide(emitKey, new TinyEmitter())
  store.start(options)
}

export { default as Layout } from './Layout.vue'

export { mapTwoLevelRouter } from './utils'

export default {
  state: store.state,
  initPermissionRoute: store.initPermissionRoute,
  reset: store.reset,
  isEmptyPermissionRoute: store.isEmptyPermissionRoute,
  install,
}
