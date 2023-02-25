import { ElMessage, ElMessageBox, ElNotification, ElMessageBox as MessageBox } from 'element-plus'
import type { AxiosRequestConfig } from 'axios'
import Axios from 'axios'
import { errorMessage, get, post, request } from 'element-next'
import qs from 'qs'
import type { Action } from 'element-plus'
import { h } from 'vue'
import { getToken, removeToken } from './auth'
import ValidationMessae from '@/components/common/ValidationMessage/index.vue'

const prefix = import.meta.env.VITE_GLOB_API_URL || ''

const defaultConfig: AxiosRequestConfig = {
  baseURL: prefix,
  timeout: 15000,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化
  paramsSerializer: { serialize: params => qs.stringify(params, { indices: false }) },
}

const axios = Axios.create(defaultConfig)

const whiteList = []

// HTTPrequest拦截
axios.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token)
      config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// HTTPresponse拦截
axios.interceptors.response.use(
  async (res) => {
    // if (res.config.loading) {
    //   removeLoading()
    // }

    const status = res.status
    const bgStatus = res.data.status

    const whiteListBol = whiteList.includes(res.config.url)
    // 如果请求为200则放过，否者默认统一处理,或者在website中配置statusWhiteList白名单自行处理
    if ((status !== 200 || bgStatus !== '200') && bgStatus !== undefined) {
      const message = res.data.msg || '服务器异常'
      // 如果是401则跳转到登录页面
      if (status === 401 || bgStatus === '401') {
        MessageBox.confirm('登入过期，请重新登入。点击取消按钮停留在当前页面！', '提示', {
          confirmButtonText: '重新登入',
          cancelButtonText: '取消',
          type: 'warning',
          title: '温馨提示',
        })
          .then(() => {
            removeToken()
            location.reload()
          })
          .catch(() => {})
        return Promise.reject(new Error(res.data.msg))
      }
      else if (bgStatus === '400' && res.data.errors) {
        const errors = res.data.errors

        const node = h(ValidationMessae, {
          errors: errors.errors,
        })
        const title = errors.danger ? '危险提示' : '温馨提示'
        await ElMessageBox({
          title,
          message: node,
          draggable: true,
          closeOnClickModal: false,
          showCancelButton: true,
          showConfirmButton: !errors.danger,
          distinguishCancelAndClose: true,
          confirmButtonText: '已悉知警告内容',
          cancelButtonText: '将错误内容钉在右下角',
        })
          .then(() => {
            return Promise.reject(new Error({ warningConfirm: true, errors } as any))
          }).catch((action: Action) => {
            if (action === 'cancel') {
              ElNotification({
                title: `👋 ${title}`,
                message: node,
                customClass: '!block',
                duration: 0,
                zIndex: 102400,
                position: 'bottom-right',
              })
            }
            return Promise.reject(errors)
          })
      }
      else {
        ElMessage.error({
          message,
          dangerouslyUseHTMLString: true,
        })
        return Promise.reject(new Error(message))
      }
    }

    // 如果是白名单类型放入catch自行处理
    if (status !== 200 || bgStatus !== '200' || whiteListBol)
      return whiteListBol ? res.data : res.data.data

    return res.data.data
  },
  (XHR) => {
    const errorObj = XHR
    const { statusText, status } = errorObj.response || {}
    let errorMsg = statusText || XHR.message
    if (errorMsg.includes('timeout of'))
      errorMsg = '请求超时，请检查网络后重试！'
    else if (errorMsg.includes('Network Error'))
      errorMsg = '网络不可用，请检查您的网络！'
    else if (status === 500)
      errorMsg = '服务暂不可用，请稍后重试！'

    errorMessage(errorMsg, { duration: 5000 })
    return Promise.reject(new Error(XHR))
  },
)

export interface Attachment {
  fieldName: string
  file: File
}

const upload = (url: string, params: Record<string, any>, attachments: Array<Attachment>, jsonField = 'cmd ') => {
  const formData = new FormData()
  formData.append(jsonField, new Blob([JSON.stringify(params)], { type: 'application/json' }))

  for (const att of attachments)
    formData.append(att.fieldName, att.file)
  return post(url, {
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export { post, get, request, upload }
export default axios
