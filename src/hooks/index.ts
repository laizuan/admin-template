import createScript from './CreateScript'
import Emit from './Emit'

export function useCreateScript(src: string) {
  return createScript(src)
}

export function useEmit() {
  return Emit()
}
