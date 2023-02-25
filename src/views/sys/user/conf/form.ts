import { useToggle } from '@vueuse/core'
import type { FormExpose } from 'element-next'
import {
  defineFormFields,
  ruleRequired,
  ruleMaxLength,
  successMessage,
  useOpForm,
  replaceHolder,
} from 'element-next'
import { ref } from 'vue'
import type { SysUser } from './intf'
import { SysUserApiUrl } from '@/api/sys/user'
import { ActionType, SwitchEnabled } from '@/utils'

const fields = defineFormFields<SysUser>([
  {
    prop: 'userId',
    component: 'n-input',
    label: '用户主键',
    rules: [
      ruleRequired(),
    ],
    props: {
      placeholder: '请填写用户主键',
    },
  },
  {
    prop: 'entId',
    component: 'n-input',
    label: '企业主键',
    rules: [
      ruleRequired(),
    ],
    props: {
      placeholder: '请填写企业主键',
    },
  },
  {
    prop: 'username',
    component: 'n-input',
    label: '登入账户',
    rules: [
      ruleRequired(),
      ruleMaxLength(32),
    ],
    props: {
      placeholder: '请填写登入账户',
    },
  },
  {
    prop: 'password',
    component: 'n-input',
    label: '登入密码',
    rules: [
      ruleRequired(),
      ruleMaxLength(80),
    ],
    props: {
      placeholder: '请填写登入密码',
    },
  },
  {
    prop: 'nickName',
    component: 'n-input',
    label: '用户名称',
    rules: [
      ruleRequired(),
      ruleMaxLength(100),
    ],
    props: {
      placeholder: '请填写用户名称',
    },
  },
  {
    prop: 'mobile',
    component: 'n-input',
    label: '电话',
    rules: [
      ruleMaxLength(20),
    ],
    props: {
      placeholder: '请填写电话',
    },
  },
  {
    prop: 'email',
    component: 'n-input',
    label: '邮箱',
    rules: [
      ruleMaxLength(80),
    ],
    props: {
      placeholder: '请填写邮箱',
    },
  },
  {
    prop: 'enabled',
    component: 'el-switch',
    label: '启禁用',
    rules: [ruleRequired()],
    props: SwitchEnabled,
  },
  {
    prop: 'remark',
    component: 'n-input',
    label: '备注',
    rules: [
      ruleMaxLength(100),
    ],
    props: {
      placeholder: '请填写备注',
      type: 'textarea',
    },
  },
  {
    prop: 'adminFlag',
    component: 'n-input',
    label: '是否管理员',
    rules: [
      ruleRequired(),
    ],
    props: {
      placeholder: '请填写是否管理员',
    },
  },
])

export const useForm = (emit) => {
  const [visible, toggle] = useToggle(false)
  const disabled = ref(false)
  const title = ref('')
  const elRef = ref<FormExpose>()

  const refresh = () => {
    toggle()
    emit('refresh')
    successMessage('操作成功')
  }

  const { submit, form, loadForm } = useOpForm<SysUser>('userId', {
    addUrl: SysUserApiUrl.add,
    getUrl: SysUserApiUrl.get,
    updateUrl: SysUserApiUrl.update,
    addAfterCb: (res, done) => {
      if (res)
        refresh()

      done()
    },
    updateAfterCb: (res, done) => {
      if (res)
        refresh()

      done()
    },
  })

  const openWindow = (type: ActionType, userId?: string) => {
    toggle()
    if (type === ActionType.detail) {
      disabled.value = true
      title.value = '用户管理详情'
    }
    else {
      disabled.value = false
      title.value = type === ActionType.edit ? '编辑用户管理' : '新增用户管理'
    }

    if (userId) {
      loadForm({
        urlProcess: url => replaceHolder(url, { userId }),
      }).then(() => {}).catch(() => {})
    }
  }
  return {
    elRef,
    visible,
    title,
    openWindow,
    disabled,
    refresh,
    toggle,
    fields,
    submit,
    form,
    loadForm,
  }
}
