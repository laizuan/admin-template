import type { TinyEmitter } from 'tiny-emitter'
import { inject } from 'vue'
import { emitKey } from '@/layouts'
export default function useEmit() {
  return inject<TinyEmitter>(emitKey)
}
