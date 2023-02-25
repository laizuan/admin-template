// GlobalComponents for Volar
import type { PropType as VuePropType } from 'vue'

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
    }
    lastBuildTime: string
  }

  // vue
  type PropType<T> = VuePropType<T>

  type Recordable<T = any> = Record<string, T>

  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }

  declare interface ViteEnv {
    VITE_PORT: number
    VITE_HOST: string
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
    VITE_GLOB_APP_TITLE: string
    VITE_GLOB_APP_SHORT_NAME: string
    VITE_DROP_CONSOLE: boolean
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    VITE_START_OPEN_BORWSER: boolean
  }

  interface BaseEnum {
    desc: string
    value: string | number
    tagType?: string
  }

  interface OpenWindowExport {
    openWindow: (type: ActionType, id?: string) => void
  }
}
