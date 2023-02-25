import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configSvgIconsPlugin } from './svgSprite'
import { configImageminPlugin } from './image'
import { cdn } from './cdn'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    cdn,
    // support name
    vueSetupExtend(),
    // vite-plugin-windicss
    windiCSS(),

    configSvgIconsPlugin(isBuild),
    configImageminPlugin(),
    configHtmlPlugin(viteEnv, isBuild),
  ]

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    )
  }

  return vitePlugins
}
