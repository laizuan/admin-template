import { createApp } from 'vue'
import { setGlobalConfig } from 'element-next'

import App from './App.vue'
import router from './router'
import './router/router'
import 'virtual:windi.css'
import 'virtual:svg-icons-register'
import pinia from './store'
import { registerGlobalComponents } from './registerGlobalComponents'
import { setupGlobDirectives } from '@/directives'
import LayoutStore from '@/layouts'
import axios from '@/utils/request'
import '@/styles/index.scss'

const app = createApp(App)

setGlobalConfig({
  table: {
    outsideHeight: 144,
    columns: {
      listMethod: 'get',
    },
  },
  dict: {
    url: '/sysDict/getByType',
  },
  axiosInstance: axios,
})
registerGlobalComponents(app)
setupGlobDirectives(app)
app.use(LayoutStore).use(pinia).use(router)
app.mount('#app')
