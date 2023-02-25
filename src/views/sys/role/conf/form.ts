import { useToggle } from '@vueuse/core'
import {
  defineFormFields,
  replaceHolder,
  ruleMaxLength,
  ruleRequired,
  successMessage,
  useOpForm,
} from 'element-next'
import { ref, watch } from 'vue'
import type { SysRole } from '@/api/sys/role'
import { SysRoleApiUrl } from '@/api/sys/role'
import { ActionType, SwitchEnabled } from '@/utils'

const fields = defineFormFields<SysRole>([
  {
    prop: 'code',
    component: 'n-input',
    label: '角色代码',
    rules: [
      ruleRequired(),
      ruleMaxLength(15),
    ],
    props: {
      format: 'uppercase',
      trimType: 'all',
      ifDisabled: (form) => {
        return form.roleId != null
      },
      placeholder: '请填写角色代码',
    },
  },
  {
    prop: 'name',
    component: 'n-input',
    label: '角色名称',
    rules: [
      ruleRequired(),
      ruleMaxLength(50),
    ],
    props: {
      placeholder: '请填写角色名称',
    },
  },
  {
    prop: 'enabled',
    component: 'el-switch',
    label: '启禁用',
    defaultValue: 1,
    rules: [ruleRequired()],
    props: SwitchEnabled,
  },
  {
    prop: 'remark',
    component: 'n-input',
    label: '备注',
    rules: [
      ruleMaxLength(100),
      ruleRequired(),
    ],
    props: {
      placeholder: '请填简要角色权限范围、使用人群',
      type: 'textarea',
    },
  },
])

export const useForm = (emit, props) => {
  const [visible, toggle] = useToggle(false)
  const disabled = ref(false)
  const title = ref('')
  const menuTreeRef = ref()
  const refresh = () => {
    toggle()
    emit('refresh')
    successMessage('操作成功')
  }

  const { submit, form, loadForm } = useOpForm<SysRole>('roleId', {
    addUrl: SysRoleApiUrl.add,
    getUrl: SysRoleApiUrl.get,
    updateUrl: SysRoleApiUrl.update,
    addBeforCb: () => {
      form.value.menuIdList = menuTreeRef.value.$getSelectNodeKey()
      return true
    },
    addAfterCb: (res, done) => {
      if (res)
        refresh()

      done()
    },
    updateBeforCb: () => {
      form.value.menuIdList = menuTreeRef.value.$getSelectNodeKey()
      return true
    },
    updateAfterCb: (res, done) => {
      if (res)
        refresh()

      done()
    },
  })

  const openWindow = (type: ActionType, roleId?: string) => {
    toggle()
    if (type === ActionType.detail) {
      disabled.value = true
      title.value = '角色详情'
    }
    else {
      disabled.value = false
      title.value = type === ActionType.edit ? '编辑角色' : '新增角色'
    }

    if (roleId) {
      loadForm({
        urlProcess: url => replaceHolder(url, { roleId }),
      }).then((res) => {
        menuTreeRef.value.$setCheckedKeys(res.menuIdList)
      }).catch(() => {})
    }
    else {
      form.value.systemId = props.systemId
    }
  }

  watch(() => props.systemId, (newSystemId) => {
    form.value.systemId = newSystemId
  })

  return {
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
    menuTreeRef,
  }
}
