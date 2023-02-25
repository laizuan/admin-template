/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { dayjs } from 'element-plus'
import pkg from '../../../package.json'
import { GLOB_CONFIG_FILE_NAME } from '../../constant'

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`
  }

  const consoleTag = (lable1: string, label2: string, color = '#19be6b') => {
    return `console.log('%c ${lable1} %c ${label2} %c', 'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;', 'background: ${color}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;', 'background:transparent');`
  }

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
      // Embed the generated app.config.js file
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc(),
              },
            },
            {
              tag: 'script',
              children: `${consoleTag('当前版本', pkg.version, '#2f54eb')}${consoleTag('构建时间', dayjs().format('YYYY-MM-DD HH:mm:ss'))}`,
            },
          ]
        : [],
    },
  })
  return htmlPlugin
}
/**
 *
 *
 console.log(`%c default %c #19be6b %c`, "background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;", `background: #2d8cf0; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`, "background:transparent")

 */
