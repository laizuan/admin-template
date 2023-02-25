import { useToggle } from '@vueuse/core'
import sha256 from 'crypto-js/sha256'

import {
  defineFormFields,
  defineFormMethod,
  replaceHolder,
  ruleEmail,
  ruleLimit,
  ruleMaxLength,
  rulePhone,
  ruleRequired,
  successMessage,
  useOpForm,
} from 'element-next'
import { ref } from 'vue'
import type { SysUser } from '@/api/sys/user'
import { SysUserApiUrl } from '@/api/sys/user'
import { ActionType, idIsNotNull, SwitchYesOrNo } from '@/utils'

const fields = defineFormFields<SysUser>([
  {
    group: {
      title: '基本信息',
      children: [
        {
          prop: 'username',
          component: 'n-input',
          label: '登入账户',
          rules: [
            ruleRequired(),
            ruleMaxLength(32),
            {
              pattern: /^[a-zA-Z]\w{4,32}$/,
              message: '登入账号必须为4-32位字母和数字组合',
              trigger: 'blur',
            },
          ],
          props: {
            ifDisabled: (f) => {
              return idIsNotNull(f.userId)
            },
            placeholder: '请填写登入账户',
          },
        },
        {
          prop: 'password',
          component: 'n-input',
          label: '登入密码',
          showHelper: true,
          helperMessage: '密码不为空的时候重置登入密码',
          rules: [ruleLimit(5, 15)],
          props: {
            'show-password': true,
            'type': 'password',
            'placeholder': '密码不为空的时候重置密码',
          },
        },
        {
          prop: 'nickName',
          component: 'n-input',
          label: '用户名称',
          rules: [ruleRequired(), ruleMaxLength(30)],
          props: {
            placeholder: '请填写用户名称',
          },
        },
        {
          prop: 'mobile',
          component: 'n-input',
          label: '手机号',
          rules: [ruleMaxLength(20), rulePhone()],
          props: {
            placeholder: '请填写手机号',
          },
        },
        {
          prop: 'email',
          component: 'n-input',
          label: '邮箱',
          rules: [ruleMaxLength(80), ruleEmail()],
          props: {
            placeholder: '请填写邮箱',
          },
        },
        {
          showHelper: true,
          helperMessage: '注销后不能再次启用',
          prop: 'enabled',
          defaultValue: 1,
          component: 'n-radio',
          label: '用户状态',
          rules: [ruleRequired()],
          props: {
            data: [
              { desc: '启用', value: 1 },
              { desc: '禁用', value: 0 },
              { desc: '注销', value: 2 },
            ],
          },
        },
        {
          showHelper: true,
          helperMessage: '单个企业只能有一个管理员',
          prop: 'adminFlag',
          defaultValue: false,
          component: 'el-switch',
          label: '是否管理员',
          rules: [ruleRequired()],
          props: {
            ...SwitchYesOrNo,
            disabled: true,
          },
        },
        {
          prop: 'remark',
          component: 'n-input',
          label: '备注',
          rules: [ruleMaxLength(100)],
          props: {
            placeholder: '请填写备注',
            type: 'textarea',
          },
        },
      ],
    },
  },
  {
    group: {
      title: '其它信息',
      children: [
        {
          prop: 'createByName',
          component: 'n-input',
          label: '创建人',
          props: {
            disabled: true,
          },
          md: 12,
          sm: 24,
        },
        {
          prop: 'createTime',
          component: 'n-date-picker',
          label: '创建时间',
          props: {
            type: 'datetime',
            disabled: true,
          },
          md: 12,
          sm: 24,
        },
        {
          prop: 'updateByName',
          component: 'n-input',
          label: '修改人',
          props: {
            disabled: true,
          },
          md: 12,
          sm: 24,
        },
        {
          prop: 'updateTime',
          component: 'n-date-picker',
          label: '修改时间',
          props: {
            type: 'datetime',
            disabled: true,
          },
          md: 12,
          sm: 24,
        },
      ],
    },
  },
])

export const useForm = (emit, entId) => {
  const [visible, toggle] = useToggle(false)
  const disabled = ref(false)
  const title = ref('')
  const formRef = defineFormMethod()
  const refresh = () => {
    toggle()
    emit('refresh')
    successMessage('操作成功')
  }

  const { submit, form, loadForm } = useOpForm<SysUser>('userId', {
    formRef,
    addUrl: SysUserApiUrl.add,
    getUrl: SysUserApiUrl.get,
    updateUrl: SysUserApiUrl.update,
    updateBeforCb: () => {
      if (form.value.password) {
        form.value.entId = entId
        form.value.password = sha256(form.value.password)
      }
      return true
    },
    addBeforCb: () => {
      if (form.value.password) {
        form.value.entId = entId
        form.value.password = sha256(form.value.password)
      }
      return true
    },
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

  const openWindow = (type: ActionType, id?: string) => {
    toggle()
    if (type === ActionType.detail) {
      disabled.value = true
      title.value = '用户管理详情'
    }
    else {
      disabled.value = false
      title.value = type === ActionType.edit ? '编辑用户管理' : '新增用户管理'
    }

    if (id)
      loadForm({ urlProcess: t => replaceHolder(t, { userId: id }) }).then(() => {})
  }
  return {
    visible,
    title,
    openWindow,
    disabled,
    refresh,
    toggle,
    fields: ref(fields),
    submit,
    form,
    loadForm,
    formRef,
  }
}
